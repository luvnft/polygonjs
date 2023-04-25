import {Box3, Object3D, Vector3} from 'three';
import {NamedFunction2, NamedFunction3, ObjectNamedFunction2} from './_Base';

export class box3Set extends NamedFunction3<[Vector3, Vector3, Box3]> {
	static override type() {
		return 'box3Set';
	}
	func(min: Vector3, max: Vector3, target: Box3): Box3 {
		target.min.copy(min);
		target.max.copy(max);
		return target;
	}
}
export class box3SetFromObject extends ObjectNamedFunction2<[boolean, Box3]> {
	static override type() {
		return 'box3SetFromObject';
	}
	func(object: Object3D, precise: boolean, target: Box3): Box3 {
		object.updateMatrix();
		target.setFromObject(object, precise);
		return target;
	}
}

export class getBox3Min extends NamedFunction2<[Box3, Vector3]> {
	static override type() {
		return 'getBox3Min';
	}
	func(box3: Box3, target: Vector3): Vector3 {
		return target.copy(box3.min);
	}
}
export class getBox3Max extends NamedFunction2<[Box3, Vector3]> {
	static override type() {
		return 'getBox3Max';
	}
	func(box3: Box3, target: Vector3): Vector3 {
		return target.copy(box3.max);
	}
}
