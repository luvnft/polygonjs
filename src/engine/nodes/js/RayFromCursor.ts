/**
 * gets the ray from the cursor
 *
 * @remarks
 *
 *
 */

import {NodeParamsConfig, ParamConfig} from '../utils/params/ParamsConfig';
import {JsConnectionPoint, JsConnectionPointType} from '../utils/io/connections/Js';
import {JsType} from '../../poly/registers/nodes/types/Js';
import {BaseUserInputJsNode} from './_BaseUserInput';
import {CoreEventEmitter, EVENT_EMITTERS, EVENT_EMITTER_PARAM_MENU_OPTIONS} from '../../../core/event/CoreEventEmitter';
import {ShadersCollectionController} from './code/utils/ShadersCollectionController';
import {globalsRayFromCursor} from './js/globals';
import {ComputedValueJsDefinition} from './utils/JsDefinition';
import {EvaluatorEventData} from './code/assemblers/actor/Evaluator';

const OUTPUT_NAME = JsConnectionPointType.RAY;
class RayFromCursorJsParamsConfig extends NodeParamsConfig {
	/** @param set which element triggers the event */
	element = ParamConfig.INTEGER(EVENT_EMITTERS.indexOf(CoreEventEmitter.CANVAS), {
		...EVENT_EMITTER_PARAM_MENU_OPTIONS,
	});
}
const ParamsConfig = new RayFromCursorJsParamsConfig();
export class RayFromCursorJsNode extends BaseUserInputJsNode<RayFromCursorJsParamsConfig> {
	override paramsConfig = ParamsConfig;
	static override type() {
		return JsType.RAY_FROM_CURSOR;
	}
	// userInputEventNames() {
	// 	return ['pointermove'];
	// }
	override eventData(): EvaluatorEventData | undefined {
		return {
			type: 'pointermove',
			emitter: this.eventEmitter(),
			jsType: JsType.RAY_FROM_CURSOR,
		};
	}
	override eventEmitter() {
		return EVENT_EMITTERS[this.pv.element];
	}
	override initializeNode() {
		this.io.connection_points.spare_params.setInputlessParamNames(['element']);
		this.io.outputs.setNamedOutputConnectionPoints([new JsConnectionPoint(OUTPUT_NAME, JsConnectionPointType.RAY)]);
	}
	override setLines(shadersCollectionController: ShadersCollectionController) {
		const out = this.jsVarName(OUTPUT_NAME);

		const _ray = new globalsRayFromCursor(this, shadersCollectionController);
		shadersCollectionController.addDefinitions(this, [
			new ComputedValueJsDefinition(
				this,
				shadersCollectionController,
				JsConnectionPointType.RAY,
				out,
				_ray.asString()
			),
		]);
	}
}
