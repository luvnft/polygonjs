/**
 * get a property from an AR session
 *
 *
 */

import {TypedJsNode} from './_Base';
import {JsConnectionPoint, JsConnectionPointType} from '../utils/io/connections/Js';
import {NodeParamsConfig} from '../utils/params/ParamsConfig';
import {Matrix4, Quaternion, Vector3} from 'three';
import {ShadersCollectionController} from './code/utils/ShadersCollectionController';
import {Poly} from '../../Poly';

export enum GetARSessionPropertyJsNodeOutputName {
	hitDetected = 'hitDetected',
	hitMatrix = 'hitMatrix',
	hitPosition = 'hitPosition',
	hitQuaternion = 'hitQuaternion',
}

class GetWebXRARSessionPropertyJsParamsConfig extends NodeParamsConfig {}
const ParamsConfig = new GetWebXRARSessionPropertyJsParamsConfig();

export class GetWebXRARSessionPropertyJsNode extends TypedJsNode<GetWebXRARSessionPropertyJsParamsConfig> {
	override paramsConfig = ParamsConfig;
	static override type() {
		return 'getWebXRARSessionProperty';
	}

	override initializeNode() {
		this.io.inputs.setNamedInputConnectionPoints([]);

		this.io.outputs.setNamedOutputConnectionPoints([
			new JsConnectionPoint(GetARSessionPropertyJsNodeOutputName.hitDetected, JsConnectionPointType.BOOLEAN),
			new JsConnectionPoint(GetARSessionPropertyJsNodeOutputName.hitMatrix, JsConnectionPointType.MATRIX4),
			new JsConnectionPoint(GetARSessionPropertyJsNodeOutputName.hitPosition, JsConnectionPointType.VECTOR3),
			new JsConnectionPoint(GetARSessionPropertyJsNodeOutputName.hitQuaternion, JsConnectionPointType.QUATERNION),
		]);
	}
	override setLines(shadersCollectionController: ShadersCollectionController) {
		const usedOutputNames = this.io.outputs.used_output_names();

		const _b = (
			propertyName: GetARSessionPropertyJsNodeOutputName,
			functionName: 'getWebXRARHitDetected',
			type: JsConnectionPointType
		) => {
			if (!usedOutputNames.includes(propertyName)) {
				return;
			}
			const varName = this.jsVarName(propertyName);
			const func = Poly.namedFunctionsRegister.getFunction(functionName, this, shadersCollectionController);
			shadersCollectionController.addBodyOrComputed(this, [
				{
					dataType: type,
					varName,
					value: func.asString(),
				},
			]);
		};
		const _v3 = (
			propertyName: GetARSessionPropertyJsNodeOutputName,
			functionName: 'getWebXRARHitPosition',
			type: JsConnectionPointType
		) => {
			if (!usedOutputNames.includes(propertyName)) {
				return;
			}
			const varName = this.jsVarName(propertyName);
			shadersCollectionController.addVariable(this, varName, new Vector3());
			const func = Poly.namedFunctionsRegister.getFunction(functionName, this, shadersCollectionController);
			shadersCollectionController.addBodyOrComputed(this, [
				{
					dataType: type,
					varName,
					value: func.asString(varName),
				},
			]);
		};
		const _m4 = (
			propertyName: GetARSessionPropertyJsNodeOutputName,
			functionName: 'getWebXRARHitMatrix',
			type: JsConnectionPointType
		) => {
			if (!usedOutputNames.includes(propertyName)) {
				return;
			}
			const varName = this.jsVarName(propertyName);
			shadersCollectionController.addVariable(this, varName, new Matrix4());
			const func = Poly.namedFunctionsRegister.getFunction(functionName, this, shadersCollectionController);
			shadersCollectionController.addBodyOrComputed(this, [
				{
					dataType: type,
					varName,
					value: func.asString(varName),
				},
			]);
		};
		const _q = (
			propertyName: GetARSessionPropertyJsNodeOutputName,
			functionName: 'getWebXRARHitQuaternion',
			type: JsConnectionPointType
		) => {
			if (!usedOutputNames.includes(propertyName)) {
				return;
			}
			const varName = this.jsVarName(propertyName);
			shadersCollectionController.addVariable(this, varName, new Quaternion());
			const func = Poly.namedFunctionsRegister.getFunction(functionName, this, shadersCollectionController);
			shadersCollectionController.addBodyOrComputed(this, [
				{
					dataType: type,
					varName,
					value: func.asString(varName),
				},
			]);
		};

		_b(GetARSessionPropertyJsNodeOutputName.hitDetected, 'getWebXRARHitDetected', JsConnectionPointType.BOOLEAN);
		_m4(GetARSessionPropertyJsNodeOutputName.hitMatrix, 'getWebXRARHitMatrix', JsConnectionPointType.MATRIX4);
		_v3(GetARSessionPropertyJsNodeOutputName.hitPosition, 'getWebXRARHitPosition', JsConnectionPointType.VECTOR3);
		_q(
			GetARSessionPropertyJsNodeOutputName.hitQuaternion,
			'getWebXRARHitQuaternion',
			JsConnectionPointType.QUATERNION
		);
	}
}
