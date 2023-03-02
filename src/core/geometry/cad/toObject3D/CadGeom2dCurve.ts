import type {OpenCascadeInstance, Geom2d_Curve, TesselationParams, gp_Pnt2d, gp_Vec2d} from '../CadCommon';
import {BufferGeometry, Float32BufferAttribute, Vector2, MathUtils} from 'three';
import {BaseSopOperation} from '../../../../engine/operations/sop/_Base';
import {CAD_MATERIAL} from '../CadConstant';
import {CadLoader} from '../CadLoader';
// import {withCadException} from '../CadExceptionHandler';
import {ObjectType} from '../../Constant';

const STRIDE = 3;
let point: gp_Pnt2d | undefined;
export function cadGeom2dCurveToObject3D(
	oc: OpenCascadeInstance,
	object: Geom2d_Curve,
	tesselationParams: TesselationParams
) {
	const curve = new oc.Handle_Geom2d_Curve_2(object);
	const geom2Dadaptor = new oc.Geom2dAdaptor_Curve_2(curve);

	const uniformAbscissa = new oc.GCPnts_UniformAbscissa_6(
		geom2Dadaptor,
		tesselationParams.curveAbscissa,
		tesselationParams.curveTolerance
	);

	let positions: number[] | undefined;
	let indices: number[] | undefined;
	point = point || new oc.gp_Pnt2d_1();

	if (uniformAbscissa.IsDone()) {
		const pointsCount = uniformAbscissa.NbPoints();

		positions = new Array(pointsCount * 3).fill(0);
		indices = new Array(pointsCount);

		for (let i = 0; i < pointsCount; i++) {
			object.D0(uniformAbscissa.Parameter(i + 1), point);
			const index = i * STRIDE;
			positions[index] = point.X();
			positions[index + 1] = point.Y();
			if (i > 0) {
				indices[(i - 1) * 2] = i - 1;
				indices[(i - 1) * 2 + 1] = i;
			}
		}
	}

	const geometry = new BufferGeometry();
	geometry.setAttribute('position', new Float32BufferAttribute(positions || [], 3));
	geometry.setIndex(indices || []);
	return BaseSopOperation.createObject(
		geometry,
		ObjectType.LINE_SEGMENTS,
		CAD_MATERIAL[ObjectType.LINE_SEGMENTS].plain
	);
}

let _t: gp_Vec2d | undefined;
let _pivot: gp_Pnt2d | undefined;
export function cadGeom2dCurveTransform(curve: Geom2d_Curve, t: Vector2, r: number, s: number) {
	const oc = CadLoader.oc();
	_t = _t || new oc.gp_Vec2d_1();
	_pivot = _pivot || new oc.gp_Pnt2d_1();
	_t.SetCoord_2(t.x, t.y);
	curve.Translate_1(_t);
	curve.Rotate(_pivot, MathUtils.degToRad(r));
	curve.Scale(_pivot, s);
	// point.SetX(point.X() + t.x);
	// point.SetY(point.Y() + t.y);
	// const newPoint = new oc.gp_Pnt2d_3(point.X() + t.x, point.Y() + t.y);
	// return newPoint;
}

export function cadGeom2dCurveClone(src: Geom2d_Curve): Geom2d_Curve {
	// Not great, not terrible
	return src.Reversed().get().Reversed().get();
}
