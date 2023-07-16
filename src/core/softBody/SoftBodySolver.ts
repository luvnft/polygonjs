import {Object3D, Vector3} from 'three';
import {softBodyControllerFromObject, softBodyFromObject} from './SoftBodyControllerRegister';

export function softBodySolverStepSimulation(
	softBodyObject: Object3D,
	stepsCount: number,
	edgeCompliance: number,
	volumeCompliance: number,
	preciseCollisions: boolean
) {
	const controller = softBodyControllerFromObject(softBodyObject);
	if (!controller) {
		console.log('no controller for', softBodyObject.uuid, softBodyObject);
		return;
	}

	controller.step(stepsCount, edgeCompliance, volumeCompliance, preciseCollisions);
}

export function setSoftBodySolverGravity(softBodyObject: Object3D, gravity: Vector3, lerp: number) {
	const controller = softBodyControllerFromObject(softBodyObject);
	if (!controller) {
		console.log('no controller for', softBodyObject.uuid);
		return;
	}
	console.warn('setGravity not implemented');
}

export function softBodyConstraintCreate(softBodyObject: Object3D, index: number) {
	const softBody = softBodyFromObject(softBodyObject);
	if (!softBody) {
		console.log('no softBody for', softBodyObject.uuid);
		return;
	}
	return softBody.createConstraint(index);
}
export function softBodyConstraintSetPosition(
	softBodyObject: Object3D,
	constraintId: number,
	pos: Vector3,
	lerp: number,
	delta: number
) {
	const softBody = softBodyFromObject(softBodyObject);
	if (!softBody) {
		console.log('no softBody for', softBodyObject.uuid);
		return;
	}
	const constraint = softBody.getConstraint(constraintId);
	if (!constraint) {
		// console.log('no softBody constraint with id', constraintId);
		return;
	}
	constraint.setPosition(pos, lerp, delta);
}

export function softBodyConstraintDelete(softBodyObject: Object3D, constraintId: number) {
	const softBody = softBodyFromObject(softBodyObject);
	if (!softBody) {
		console.log('no softBody for', softBodyObject.uuid);
		return;
	}
	softBody.deleteConstraint(constraintId);
}