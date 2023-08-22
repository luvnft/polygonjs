import {Box3, Matrix4, Vector3} from 'three';
import {QuadPointAttribute} from './QuadPointAttribute';
import {QuadPrimAttribute} from './QuadPrimAttribute';
import {Attribute} from '../Attribute';

const _v3 = new Vector3();

export class QuadGeometry {
	public attributes: Record<string, QuadPointAttribute> = {};
	public primAttributes: Record<string, QuadPrimAttribute> = {};
	public index: number[] = [];

	addPointAttribute(attribName: string, attribute: QuadPointAttribute) {
		this.attributes[attribName] = attribute;
	}
	addPrimAttribute(attribName: string, attribute: QuadPrimAttribute) {
		this.primAttributes[attribName] = attribute;
	}
	setIndex(indices: number[]) {
		this.index = indices;
	}
	quadsCount() {
		return this.index.length / 4;
	}

	applyMatrix(matrix: Matrix4): QuadGeometry {
		const positionAttribute = this.attributes[Attribute.POSITION];
		const positionArray = positionAttribute.array;
		const pointsCount = positionArray.length / 3;
		for (let i = 0; i < pointsCount; i++) {
			_v3.fromArray(positionArray, i * 3);
			_v3.applyMatrix4(matrix);
			_v3.toArray(positionArray, i * 3);
		}

		return this;
	}
	clone() {
		const clonedGeometry = new (this.constructor as typeof QuadGeometry)();
		const pointAttributeNames = Object.keys(this.attributes);
		const primAttributeNames = Object.keys(this.primAttributes);
		for (const pointAttributeName of pointAttributeNames) {
			clonedGeometry.addPointAttribute(pointAttributeName, this.attributes[pointAttributeName].clone());
		}
		for (const primAttributeName of primAttributeNames) {
			clonedGeometry.addPrimAttribute(primAttributeName, this.primAttributes[primAttributeName].clone());
		}
		clonedGeometry.setIndex([...this.index]);
		return clonedGeometry;
	}
	boundingBox() {
		console.warn('boundingBox not implemented');
		return new Box3();
	}
}
