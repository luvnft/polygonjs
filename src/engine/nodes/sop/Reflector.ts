/**
 * Uses a flat mesh and renders a mirror on it.
 *
 *
 */

import {TypedSopNode} from './_Base';
import {CoreGroup} from '../../../core/geometry/Group';
import {ReflectorSopOperation} from '../../operations/sop/Reflector';

import {NodeParamsConfig, ParamConfig} from '../utils/params/ParamsConfig';
import {Number3} from '../../../types/GlobalTypes';
const DEFAULT = ReflectorSopOperation.DEFAULT_PARAMS;

class ReflectorSopParamsConfig extends NodeParamsConfig {
	/** @param when active is off, the mirror is not rendered */
	active = ParamConfig.BOOLEAN(DEFAULT.active);
	/** @param bias to ensure the mirror does not reflect itself */
	clipBias = ParamConfig.FLOAT(DEFAULT.clipBias);
	/** @param center of the geometry */
	color = ParamConfig.COLOR(DEFAULT.color.toArray() as Number3);
	/** @param toggle to activate blur */
	tblur = ParamConfig.BOOLEAN(DEFAULT.tblur);
	/** @param blur */
	blur = ParamConfig.FLOAT(DEFAULT.blur, {
		visibleIf: {tblur: 1},
	});
}
const ParamsConfig = new ReflectorSopParamsConfig();

export class ReflectorSopNode extends TypedSopNode<ReflectorSopParamsConfig> {
	params_config = ParamsConfig;
	static type() {
		return 'reflector';
	}

	static displayedInputNames(): string[] {
		return ['geometry to create a reflector from'];
	}

	initializeNode() {
		this.io.inputs.setCount(0, 1);
		this.io.inputs.initInputsClonedState(ReflectorSopOperation.INPUT_CLONED_STATE);
	}

	private _operation: ReflectorSopOperation | undefined;
	async cook(input_contents: CoreGroup[]) {
		this._operation = this._operation || new ReflectorSopOperation(this._scene, this.states);
		const core_group = await this._operation.cook(input_contents, this.pv);
		this.setCoreGroup(core_group);
	}
}