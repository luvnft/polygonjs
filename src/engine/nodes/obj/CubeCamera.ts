/**
 * Creates a CubeCamera
 *
 *	@remarks
 *
 * A Cube Camera is rendering the scene 6 times, once for each side of a cube. Those renders are then combined to create a texture which can be used as environment map.
 *
 * See the [OBJ/CubeCamera](https://polygonjs.com/docs/nodes/obj/CubeCamera) on how to use it as a texture.
 */

import {Constructor} from '../../../types/GlobalTypes';
import {Group} from 'three/src/objects/Group';
import {Object3D} from 'three/src/core/Object3D';
import {CubeCamera} from 'three/src/cameras/CubeCamera';
import {sRGBEncoding} from 'three/src/constants';
import {WebGLCubeRenderTarget} from 'three/src/renderers/WebGLCubeRenderTarget';
import {TransformController, TransformedParamConfig} from './utils/TransformController';
import {TypedObjNode} from './_Base';
import {PerspectiveCamera} from 'three/src/cameras/PerspectiveCamera';
import {Poly} from '../../Poly';
import {BaseNodeType} from '../_Base';
import {ObjType} from '../../poly/registers/nodes/types/Obj';
import {AxesHelper} from 'three/src/helpers/AxesHelper';

export function CubeCameraParamConfig<TBase extends Constructor>(Base: TBase) {
	return class Mixin extends Base {
		/** @param render resolution of each of the 6 faces */
		resolution = ParamConfig.INTEGER(256);
		/** @param objects to exclude in the render */
		excludedObjects = ParamConfig.STRING('*`$OS`');
		/** @param object masks to select what will be visible in the scene */
		printResolve = ParamConfig.BUTTON(null, {
			callback: (node: BaseNodeType) => {
				CubeCameraObjNode.PARAM_CALLBACK_printResolve(node as CubeCameraObjNode);
			},
		});
		/** @param camera near */
		near = ParamConfig.FLOAT(1);
		/** @param camera far */
		far = ParamConfig.FLOAT(100);
		/** @param render button */
		render = ParamConfig.BUTTON(null, {
			callback: (node: BaseNodeType) => {
				CubeCameraObjNode.PARAM_CALLBACK_render(node as CubeCameraObjNode);
			},
		});
	};
}

import {NodeParamsConfig, ParamConfig} from '../utils/params/ParamsConfig';
import {HierarchyController} from './utils/HierarchyController';
import {FlagsControllerD} from '../utils/FlagsController';

class CubeCameraObjParamsConfig extends CubeCameraParamConfig(TransformedParamConfig(NodeParamsConfig)) {}
const ParamsConfig = new CubeCameraObjParamsConfig();
export class CubeCameraObjNode extends TypedObjNode<Group, CubeCameraObjParamsConfig> {
	params_config = ParamsConfig;
	static type() {
		return ObjType.CUBE_CAMERA;
	}
	readonly hierarchyController: HierarchyController = new HierarchyController(this);
	readonly transformController: TransformController = new TransformController(this);
	public readonly flags: FlagsControllerD = new FlagsControllerD(this);

	private _excludedObjects: Object3D[] = [];
	private _cubeCamera: CubeCamera | undefined;
	private _previousVisibleStateByUuid: Map<string, boolean> = new Map();
	private _helper = new AxesHelper(1);

	initializeNode() {
		this.hierarchyController.initializeNode();
		this.transformController.initializeNode();
		this._updateHelperHierarchy();
		this._helper.matrixAutoUpdate = false;
		this.flags.display.onUpdate(() => {
			this._updateHelperHierarchy();
		});

		this.io.inputs.setCount(0, 1);
	}

	createObject() {
		const group = new Group();
		group.matrixAutoUpdate = true;
		return group;
	}

	cook() {
		this.transformController.update();

		this._resolveObjects();

		const cameraRecreateRequired = this._setupCubeCamera();
		if (!this._cubeCamera || cameraRecreateRequired) {
			this._createCubeCamera();
		}

		this.cookController.endCook();
	}

	private _updateHelperHierarchy() {
		if (this.flags.display.active()) {
			this.object.add(this._helper);
		} else {
			this.object.remove(this._helper);
		}
	}

	private _setupCubeCamera() {
		let cameraRecreateRequired = false;
		if (this._cubeCamera) {
			const firstCamera = this._cubeCamera.children[0] as PerspectiveCamera;
			const currentNear = firstCamera.near;
			const currentFar = firstCamera.far;
			const currentRes = this._cubeCamera.renderTarget.width;
			if (currentNear != this.pv.near || currentFar != this.pv.far || currentRes != this.pv.resolution) {
				cameraRecreateRequired = true;
			}

			if (cameraRecreateRequired) {
				this.object.remove(this._cubeCamera);
			}
		}
		return cameraRecreateRequired;
	}

	private _createCubeCamera() {
		const renderTarget = new WebGLCubeRenderTarget(this.pv.resolution, {encoding: sRGBEncoding});
		this._cubeCamera = new CubeCamera(this.pv.near, this.pv.far, renderTarget);
		this._cubeCamera.matrixAutoUpdate = true;
		this.object.add(this._cubeCamera);
	}

	renderTarget() {
		if (this._cubeCamera) {
			return this._cubeCamera.renderTarget;
		}
	}

	render() {
		const renderer = Poly.renderersController.firstRenderer();
		if (!renderer) {
			console.warn(`no renderer found for ${this.fullPath()}`);
			return;
		}
		if (!this._cubeCamera) {
			console.warn(`no cubeCamera for ${this.fullPath()}`);
			return;
		}

		for (let object of this._excludedObjects) {
			this._previousVisibleStateByUuid.set(object.uuid, object.visible);
			object.visible = false;
		}

		this._cubeCamera.update(renderer, this.scene().threejsScene());

		// re-add objects back to their original parent
		for (let object of this._excludedObjects) {
			const previousVisibleState = this._previousVisibleStateByUuid.get(object.uuid);
			if (previousVisibleState) {
				object.visible = previousVisibleState;
			}
		}
		this._previousVisibleStateByUuid.clear();
	}

	private _resolveObjects() {
		const objectsMatchingMask = this.scene().objectsByMask(this.pv.excludedObjects);
		const objectsByUuid: Map<string, Object3D> = new Map();
		for (let object of objectsMatchingMask) {
			objectsByUuid.set(object.uuid, object);
		}
		this._excludedObjects = [];
		// only add the object to the list if the parent is not in there
		for (let object of objectsMatchingMask) {
			const parent = object.parent;
			if (parent) {
				if (!objectsByUuid.get(parent.uuid)) {
					this._excludedObjects.push(object);
				}
			}
		}
	}

	static PARAM_CALLBACK_printResolve(node: CubeCameraObjNode) {
		node.param_callback_printResolve();
	}
	private param_callback_printResolve() {
		this._resolveObjects();
		console.log(this._excludedObjects);
	}
	static PARAM_CALLBACK_render(node: CubeCameraObjNode) {
		node.param_callback_render();
	}
	private param_callback_render() {
		this.render();
	}
}
