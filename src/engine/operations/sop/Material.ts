import {BaseSopOperation} from './_Base';
import {CoreGroup} from '../../../core/geometry/Group';
import {TypedNodePathParamValue} from '../../../core/Walker';
import {NodeContext} from '../../../engine/poly/NodeContext';
import {BaseBuilderMatNodeType} from '../../../engine/nodes/mat/_BaseBuilder';
import {CoreMaterial} from '../../../core/geometry/Material';
import {Group, Material, Object3D, Mesh, Texture, ShaderMaterial} from 'three';
import {GlobalsGeometryHandler} from '../../../engine/nodes/gl/code/globals/Geometry';
import {InputCloneMode} from '../../../engine/poly/InputCloneMode';
import {isBooleanTrue} from '../../../core/BooleanValue';
import {DefaultOperationParams} from '../../../core/operations/_Base';
import {CoreMask} from '../../../core/geometry/Mask';

interface MaterialSopParams extends DefaultOperationParams {
	group: string;
	applyToChildren: boolean;
	assignMat: boolean;
	material: TypedNodePathParamValue;
	cloneMat: boolean;
	shareCustomUniforms: boolean;
	swapCurrentTex: boolean;
	texSrc0: string;
	texDest0: string;
}
// type TraverseCallback = (coreObject: CoreObject) => void;
export class MaterialSopOperation extends BaseSopOperation {
	static override readonly DEFAULT_PARAMS: MaterialSopParams = {
		group: '',
		applyToChildren: true,
		assignMat: true,
		material: new TypedNodePathParamValue(''),
		cloneMat: false,
		shareCustomUniforms: true,
		swapCurrentTex: false,
		texSrc0: 'emissiveMap',
		texDest0: 'map',
	};
	static override readonly INPUT_CLONED_STATE = InputCloneMode.FROM_NODE;
	static override type(): Readonly<'material'> {
		return 'material';
	}

	private _globalsHandler: GlobalsGeometryHandler = new GlobalsGeometryHandler();

	override async cook(inputCoreGroups: CoreGroup[], params: MaterialSopParams) {
		const coreGroup = inputCoreGroups[0];

		this._oldMatByOldNewId.clear();
		await this._applyMaterials(coreGroup, params);
		this._swapTextures(coreGroup, params);
		return coreGroup;
	}

	private async _getMaterial(params: MaterialSopParams) {
		const materialNode = params.material.nodeWithContext(NodeContext.MAT, this.states?.error);
		if (materialNode) {
			const material = await materialNode.material();
			const baseBuilderMatNode = materialNode as BaseBuilderMatNodeType;
			if (baseBuilderMatNode.assemblerController) {
				baseBuilderMatNode.assemblerController()?.setAssemblerGlobalsHandler(this._globalsHandler);
			}

			if (!material) {
				this.states?.error.set(`material invalid. (error: '${materialNode.states.error.message()}')`);
			}

			return material;
		} else {
			this.states?.error.set(`no material node found`);
		}
	}

	private async _applyMaterials(coreGroup: CoreGroup, params: MaterialSopParams) {
		if (!isBooleanTrue(params.assignMat)) {
			return;
		}

		const material = await this._getMaterial(params);
		if (!material) {
			return;
		}

		const selectedObjects = CoreMask.filterObjects(coreGroup, params);

		for (let selectedObject of selectedObjects) {
			this._applyMaterial(selectedObject, material, params);
		}

		return coreGroup;
	}

	private _oldMatByOldNewId: Map<string, Material> = new Map();
	private _materialByUuid: Map<string, Material> = new Map();
	private _swapTextures(coreGroup: CoreGroup, params: MaterialSopParams) {
		if (!isBooleanTrue(params.swapCurrentTex)) {
			return;
		}

		this._materialByUuid.clear();

		const objects = CoreMask.filterCoreObjects(params.group, coreGroup.allCoreObjects()).map((co) =>
			co.object()
		) as Object3D[];
		for (let object of objects) {
			if (params.applyToChildren) {
				object.traverse((child) => {
					const mat = (object as Mesh).material as Material;
					this._materialByUuid.set(mat.uuid, mat);
				});
			} else {
				const mat = (object as Mesh).material as Material;
				this._materialByUuid.set(mat.uuid, mat);
			}
		}

		this._materialByUuid.forEach((mat, mat_uuid) => {
			this._swapTexture(mat, params);
		});
	}

	private _applyMaterial(object: Object3D, srcMaterial: Material, params: MaterialSopParams) {
		const usedMaterial = isBooleanTrue(params.cloneMat)
			? CoreMaterial.clone(this.scene(), srcMaterial, {shareCustomUniforms: params.shareCustomUniforms})
			: srcMaterial;

		if (srcMaterial instanceof ShaderMaterial && usedMaterial instanceof ShaderMaterial) {
			for (let uniform_name in srcMaterial.uniforms) {
				usedMaterial.uniforms[uniform_name] = srcMaterial.uniforms[uniform_name];
			}
		}

		if ((object as Group).isGroup) {
			// do not assign material to a group, as this could cause render errors
			return;
		}

		const object_with_material = object as Mesh;
		// const current_mat = object_with_material.material as Material | undefined;
		// if (current_mat && params.swapCurrentTex) {
		// 	this._swap_texture(used_material, current_mat, params);
		// }
		this._oldMatByOldNewId.set(usedMaterial.uuid, object_with_material.material as Material);
		object_with_material.material = usedMaterial;

		CoreMaterial.applyRenderHook(object, usedMaterial);
		CoreMaterial.applyCustomMaterials(object, usedMaterial);
	}

	private _swapTexture(target_mat: Material, params: MaterialSopParams) {
		if (params.texSrc0 == '' || params.texDest0 == '') {
			return;
		}
		let src_mat = this._oldMatByOldNewId.get(target_mat.uuid);
		src_mat = src_mat || target_mat;

		const src_tex: Texture | null = (src_mat as any)[params.texSrc0];
		if (src_tex) {
			// swap mat param
			(target_mat as any)[params.texDest0] = src_tex;
			// (src_mat as any)[params.texSrc0] = null;
			// swap uniforms
			const uniforms = (target_mat as any).uniforms;
			if (uniforms) {
				const uniforms_map = uniforms[params.texDest0];
				if (uniforms_map) {
					uniforms[params.texDest0] = {value: src_tex};
					// uniforms[params.texSrc0] = {value: null};
				}
			}
		}
	}
}
