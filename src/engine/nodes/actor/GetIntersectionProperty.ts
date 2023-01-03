/**
 * get an intersection property
 *
 *
 */

import {ActorNodeTriggerContext, ParamlessTypedActorNode} from './_Base';
import {
	ActorConnectionPoint,
	ActorConnectionPointType,
	ACTOR_CONNECTION_POINT_IN_NODE_DEF,
	ReturnValueTypeByActorConnectionPointType,
} from '../utils/io/connections/Actor';
import {Vector2, Vector3} from 'three';
import {TypeAssert} from '../../poly/Assert';

const CONNECTION_OPTIONS = ACTOR_CONNECTION_POINT_IN_NODE_DEF;

export enum GetIntersectionPropertyActorNodeOutputName {
	distance = 'distance',
	object = 'object',
	point = 'point',
	uv = 'uv',
	// uv2 = 'uv2',
}
const INTERSECTION_PROPERTIES: GetIntersectionPropertyActorNodeOutputName[] = [
	GetIntersectionPropertyActorNodeOutputName.distance,
	GetIntersectionPropertyActorNodeOutputName.object,
	GetIntersectionPropertyActorNodeOutputName.point,
	GetIntersectionPropertyActorNodeOutputName.uv,
	// GetIntersectionPropertyActorNodeInputName.uv2,
];

const tmpV2 = new Vector2();
const tmpV3 = new Vector3();
export class GetIntersectionPropertyActorNode extends ParamlessTypedActorNode {
	static override type() {
		return 'getIntersectionProperty';
	}

	override initializeNode() {
		this.io.inputs.setNamedInputConnectionPoints([
			new ActorConnectionPoint(
				ActorConnectionPointType.INTERSECTION,
				ActorConnectionPointType.INTERSECTION,
				CONNECTION_OPTIONS
			),
		]);

		this.io.outputs.setNamedOutputConnectionPoints([
			new ActorConnectionPoint(
				GetIntersectionPropertyActorNodeOutputName.distance,
				ActorConnectionPointType.FLOAT
			),
			new ActorConnectionPoint(
				GetIntersectionPropertyActorNodeOutputName.object,
				ActorConnectionPointType.OBJECT_3D
			),
			new ActorConnectionPoint(
				GetIntersectionPropertyActorNodeOutputName.point,
				ActorConnectionPointType.VECTOR3
			),
			new ActorConnectionPoint(GetIntersectionPropertyActorNodeOutputName.uv, ActorConnectionPointType.VECTOR2),
		]);
	}

	public override outputValue(
		context: ActorNodeTriggerContext,
		outputName: GetIntersectionPropertyActorNodeOutputName | string
	): ReturnValueTypeByActorConnectionPointType[ActorConnectionPointType] | undefined {
		const intersection = this._inputValue<ActorConnectionPointType.INTERSECTION>(
			ActorConnectionPointType.INTERSECTION,
			context
		);
		if (
			intersection &&
			INTERSECTION_PROPERTIES.includes(outputName as GetIntersectionPropertyActorNodeOutputName)
		) {
			const propValue = intersection[outputName as GetIntersectionPropertyActorNodeOutputName];
			if (propValue instanceof Vector2) {
				return tmpV2.copy(propValue);
			}
			if (propValue instanceof Vector3) {
				return tmpV3.copy(propValue);
			}
			return propValue;
		} else {
			const propName: GetIntersectionPropertyActorNodeOutputName =
				outputName as GetIntersectionPropertyActorNodeOutputName;
			switch (propName) {
				case GetIntersectionPropertyActorNodeOutputName.distance: {
					return 0;
				}
				case GetIntersectionPropertyActorNodeOutputName.object: {
					return context.Object3D;
				}
				case GetIntersectionPropertyActorNodeOutputName.point: {
					return tmpV3;
				}
				case GetIntersectionPropertyActorNodeOutputName.uv: {
					return tmpV2;
				}
			}
			TypeAssert.unreachable(propName);
		}
	}
}
