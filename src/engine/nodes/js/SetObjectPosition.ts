/**
 * Update the object position
 *
 *
 */

import {TRIGGER_CONNECTION_NAME, TypedJsNode} from './_Base';
import {NodeParamsConfig, ParamConfig} from '../utils/params/ParamsConfig';
import {JsConnectionPoint, JsConnectionPointType, JS_CONNECTION_POINT_IN_NODE_DEF} from '../utils/io/connections/Js';
import {ShadersCollectionController} from './code/utils/ShadersCollectionController';
import {setObjectPosition} from './js/action';
import {JsType} from '../../poly/registers/nodes/types/Js';

const CONNECTION_OPTIONS = JS_CONNECTION_POINT_IN_NODE_DEF;

class SetObjectPositionJsParamsConfig extends NodeParamsConfig {
	/** @param target position */
	position = ParamConfig.VECTOR3([0, 0, 0]);
	/** @param lerp factor */
	lerp = ParamConfig.FLOAT(1);
	/** @param sets if the matrix should be updated as the animation progresses */
	updateMatrix = ParamConfig.BOOLEAN(1);
}
const ParamsConfig = new SetObjectPositionJsParamsConfig();

export class SetObjectPositionJsNode extends TypedJsNode<SetObjectPositionJsParamsConfig> {
	override readonly paramsConfig = ParamsConfig;
	static override type() {
		return JsType.SET_OBJECT_POSITION;
	}

	override initializeNode() {
		this.io.inputs.setNamedInputConnectionPoints([
			new JsConnectionPoint(TRIGGER_CONNECTION_NAME, JsConnectionPointType.TRIGGER, CONNECTION_OPTIONS),
			new JsConnectionPoint(JsConnectionPointType.OBJECT_3D, JsConnectionPointType.OBJECT_3D, CONNECTION_OPTIONS),
		]);

		this.io.outputs.setNamedOutputConnectionPoints([
			new JsConnectionPoint(TRIGGER_CONNECTION_NAME, JsConnectionPointType.TRIGGER),
			new JsConnectionPoint(
				JsConnectionPointType.OBJECT_3D,
				JsConnectionPointType.OBJECT_3D,
			),
		]);
	}
	override setLines(shadersCollectionController: ShadersCollectionController) {
		const position = this.variableForInputParam(shadersCollectionController, this.p.position);
		const lerp = this.variableForInputParam(shadersCollectionController, this.p.lerp);
		const updateMatrix = this.variableForInputParam(shadersCollectionController, this.p.updateMatrix);

		const func = new setObjectPosition(this, shadersCollectionController);
		const bodyLine = func.asString(position, lerp, updateMatrix);
		shadersCollectionController.addBodyLines(this, [bodyLine]);
	}
}
