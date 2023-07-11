import {Object3D} from 'three';
import {NamedFunction2, ObjectNamedFunction0, ObjectNamedFunction1} from './_Base';
import {removeFromParent, addToParent} from '../poly/PolyOnObjectsAddRemoveHooksController';
import {dummyReadRefVal} from './_Param';
import {getOrCreateNodeRef} from '../../core/reactivity/NodeReactivity';
import {NodeContext} from '../poly/NodeContext';
import {BaseSopNodeType} from '../nodes/sop/_Base';

export class getGeometryNodeObjects extends NamedFunction2<[string, Object3D[]]> {
	static override type() {
		return 'getGeometryNodeObjects';
	}
	protected override async = true;
	async func(nodePath: string, objects: Object3D[]): Promise<void> {
		dummyReadRefVal(getOrCreateNodeRef(nodePath).value);

		const node = this.scene.node(nodePath);
		if (node && node.context() == NodeContext.SOP) {
			const geometryNode = node as BaseSopNodeType;
			const container = await geometryNode.compute();
			const nodeObjects = container.coreContent()?.threejsObjects() || [];
			objects.length = 0;
			for (let object of nodeObjects) {
				objects.push(object);
			}
			// console.log('set', objects);
			// geometryNode.compute().then((container) => {
			// 	objectsRef.value = container.coreContent()?.threejsObjects() || [];
			// 	callback();
			// });
		}
		// return objectsRef;
	}
}

export class createObject extends ObjectNamedFunction1<[Object3D | undefined]> {
	static override type() {
		return 'createObject';
	}
	func(parent: Object3D, child: Object3D | undefined): void {
		if (child) {
			addToParent(this.scene, parent, child);
		}
	}
}
export class createObjects extends ObjectNamedFunction1<[Object3D[]]> {
	static override type() {
		return 'createObjects';
	}
	func(parent: Object3D, children: Object3D[]): void {
		for (let child of children) {
			if (child) {
				addToParent(this.scene, parent, child);
			}
		}
	}
}

//
//
//
//
//
export class objectDelete extends ObjectNamedFunction0 {
	static override type() {
		return 'objectDelete';
	}
	func(object3D: Object3D): void {
		removeFromParent(this.scene, object3D);
	}
}
