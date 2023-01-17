/**
 * Create a physics world
 *
 *
 */
import {Group, Object3D} from 'three';
import {
	initCorePhysicsWorld,
	physicsWorldNodeIdFromObject,
	PHYSICS_GRAVITY_DEFAULT,
} from './../../../core/physics/PhysicsWorld';
import {TypedSopNode} from './_Base';
import {CoreGroup} from '../../../core/geometry/Group';
import {NodeParamsConfig, ParamConfig} from '../utils/params/ParamsConfig';
import {NodeContext} from '../../poly/NodeContext';
import {InputCloneMode} from '../../poly/InputCloneMode';
import {ActorNodeChildrenMap} from '../../poly/registers/nodes/Actor';
import {NodeCreateOptions} from '../utils/hierarchy/ChildrenController';
import {Constructor, valueof} from '../../../types/GlobalTypes';
import {BaseActorNodeType} from '../actor/_Base';
import {createOrFindPhysicsWorld} from '../../../core/physics/PhysicsWorld';
import {SopType} from '../../poly/registers/nodes/types/Sop';
import {PolyScene} from '../../index_all';
import {CoreType} from '../../../core/Type';
import {BaseNodeType} from '../_Base';
class PhysicsWorldSopParamsConfig extends NodeParamsConfig {
	/** @param gravity */
	gravity = ParamConfig.VECTOR3(PHYSICS_GRAVITY_DEFAULT);
	/** @param actor node */
	// node = ParamConfig.NODE_PATH('', {
	// 	visibleIf: {useThisNode: 0},
	// 	// nodeSelection: {
	// 	// 	// context: NodeContext.ACTOR,
	// 	// },
	// 	dependentOnFoundNode: false,
	// });
}
const ParamsConfig = new PhysicsWorldSopParamsConfig();

export class PhysicsWorldSopNode extends TypedSopNode<PhysicsWorldSopParamsConfig> {
	override readonly paramsConfig = ParamsConfig;
	static override type() {
		return SopType.PHYSICS_WORLD;
	}

	protected override initializeNode() {
		this.io.inputs.setCount(1);
		// set to always clone, so that the
		this.io.inputs.initInputsClonedState(InputCloneMode.ALWAYS);
	}

	override async cook(inputCoreGroups: CoreGroup[]) {
		const coreGroup = inputCoreGroups[0];

		const group = new Group();
		group.matrixAutoUpdate = false;

		const actorNode = this._findActorNode();
		// if (actorNode) {
		this.scene().actorsManager.assignActorBuilder(group, actorNode);
		// }

		const objects = coreGroup.objects();
		for (let object of objects) {
			group.add(object);
		}

		await createOrFindPhysicsWorld(this, group, this.pv.gravity);
		// assignPhysicsWorldNodeToWorldObject(group, this);
		await initCorePhysicsWorld(group);

		this.setObject(group);
	}

	private _findActorNode() {
		// if (isBooleanTrue(this.pv.useThisNode)) {
		return this;
		// } else {
		// 	return this.pv.node.node() as ActorBuilderNode | undefined;
		// }
	}

	//
	// CHILDREN
	//
	protected override _childrenControllerContext = NodeContext.ACTOR;
	override createNode<S extends keyof ActorNodeChildrenMap>(
		node_class: S,
		options?: NodeCreateOptions
	): ActorNodeChildrenMap[S];
	override createNode<K extends valueof<ActorNodeChildrenMap>>(
		node_class: Constructor<K>,
		options?: NodeCreateOptions
	): K;
	override createNode<K extends valueof<ActorNodeChildrenMap>>(
		node_class: Constructor<K>,
		options?: NodeCreateOptions
	): K {
		return super.createNode(node_class, options) as K;
	}
	override children() {
		return super.children() as BaseActorNodeType[];
	}
	override nodesByType<K extends keyof ActorNodeChildrenMap>(type: K): ActorNodeChildrenMap[K][] {
		return super.nodesByType(type) as ActorNodeChildrenMap[K][];
	}
	override childrenAllowed() {
		return true;
	}
}

export function getPhysicsWorldNodeFromWorldObject(
	worldObject: Object3D,
	scene: PolyScene
): PhysicsWorldSopNode | undefined {
	const nodeId = physicsWorldNodeIdFromObject(worldObject);
	if (nodeId == null) {
		return;
	}
	const graphNode = scene.graph.nodeFromId(nodeId);
	if (!graphNode) {
		return;
	}
	const node: BaseNodeType | null = CoreType.isFunction((graphNode as BaseNodeType).context)
		? (graphNode as BaseNodeType)
		: null;
	if (!node) {
		return;
	}
	if (node.context() != NodeContext.SOP) {
		return;
	}
	if (node.type() != SopType.PHYSICS_WORLD) {
		return;
	}
	return node as PhysicsWorldSopNode;
}
