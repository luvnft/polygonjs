import {CoreSleep} from '../../../../src/core/Sleep';
import {GetIntersectionPropertyActorNodeOutputName} from '../../../../src/engine/nodes/actor/GetIntersectionProperty';
import {SetParamActorNode} from '../../../../src/engine/nodes/actor/SetParam';
import {ActorConnectionPointType} from '../../../../src/engine/nodes/utils/io/connections/Actor';
import {RendererUtils} from '../../../helpers/RendererUtils';
import {triggerPointermove, triggerPointermoveInMiddle, triggerPointermoveAside} from '../../../helpers/EventsHelper';

QUnit.test('actor/OnObjectHover', async (assert) => {
	const scene = window.scene;
	const perspective_camera1 = window.perspective_camera1;

	perspective_camera1.p.t.set([0, 0, 5]);

	const geo1 = window.geo1;
	const box1 = geo1.createNode('box');
	const actor1 = geo1.createNode('actor');
	const geo2 = scene.root().createNode('geo');
	const sphere1 = geo2.createNode('sphere');

	actor1.setInput(0, box1);
	actor1.flags.display.set(true);

	const onObjectHover1 = actor1.createNode('onObjectHover');
	const setObjectPosition1 = actor1.createNode('setObjectPosition');
	const getIntersectionProperty1 = actor1.createNode('getIntersectionProperty');
	const setParam1 = actor1.createNode('setParam');

	setObjectPosition1.setInput(ActorConnectionPointType.TRIGGER, onObjectHover1);
	setObjectPosition1.p.position.set([0, 0, 1]);
	getIntersectionProperty1.setInput(0, onObjectHover1, ActorConnectionPointType.INTERSECTION);
	setParam1.setInput(ActorConnectionPointType.TRIGGER, onObjectHover1);
	setParam1.setInput(
		SetParamActorNode.INPUT_NAME_VAL,
		getIntersectionProperty1,
		GetIntersectionPropertyActorNodeOutputName.distance
	);
	setParam1.setParamType(ActorConnectionPointType.FLOAT);
	setParam1.p.param.setParam(geo2.p.scale);

	const container = await actor1.compute();
	const object = container.coreContent()!.objects()[0];

	// wait to make sure objects are mounted to the scene
	await CoreSleep.sleep(150);

	await RendererUtils.withViewer({cameraNode: perspective_camera1}, async (args) => {
		const {viewer} = args;
		const canvas = viewer.canvas();
		scene.play();
		assert.equal(scene.time(), 0);

		assert.deepEqual(object.position.toArray(), [0, 0, 0]);

		triggerPointermoveInMiddle(canvas);
		await CoreSleep.sleep(200);
		assert.deepEqual(object.position.toArray(), [0, 0, 1]);
		assert.equal(geo2.p.scale.value, 4.5, 'scale');
		object.position.set(0, 0, 0);

		// hover out of the object will also throw an event since it is a state change
		triggerPointermoveAside(canvas);
		await CoreSleep.sleep(200);
		assert.deepEqual(object.position.toArray(), [0, 0, 1]);
		assert.equal(geo2.p.scale.value, 0, 'scale');
		object.position.set(0, 0, 0);

		triggerPointermoveAside(canvas);
		await CoreSleep.sleep(200);
		assert.deepEqual(object.position.toArray(), [0, 0, 0]);
		assert.equal(geo2.p.scale.value, 0, 'scale');

		// test intersection: point
		setParam1.setInput(
			SetParamActorNode.INPUT_NAME_VAL,
			getIntersectionProperty1,
			GetIntersectionPropertyActorNodeOutputName.point
		);
		setParam1.setParamType(ActorConnectionPointType.VECTOR3);
		setParam1.p.param.setParam(geo2.p.s);
		triggerPointermove(canvas, {x: 0.01, y: 0.01});
		await CoreSleep.sleep(200);
		assert.deepEqual(object.position.toArray(), [0, 0, 1]);
		const tmpV3 = geo2.p.s.value.toArray();
		assert.in_delta(tmpV3[0], 0.032641536070849936, 0.001, 's');
		assert.in_delta(tmpV3[1], -0.032641536070849936, 0.001, 's');
		assert.in_delta(tmpV3[2], 1.5, 0.001, 's');
		object.position.set(0, 0, 0);

		// test intersection: uv
		triggerPointermoveAside(canvas);
		await CoreSleep.sleep(200);
		setParam1.setInput(
			SetParamActorNode.INPUT_NAME_VAL,
			getIntersectionProperty1,
			GetIntersectionPropertyActorNodeOutputName.uv
		);
		setParam1.setParamType(ActorConnectionPointType.VECTOR2);
		setParam1.p.param.setParam(sphere1.p.resolution);
		triggerPointermove(canvas, {x: 0.01, y: 0.01});
		await CoreSleep.sleep(200);
		assert.deepEqual(object.position.toArray(), [0, 0, 1]);
		const tmpV2 = sphere1.p.resolution.value.toArray();
		assert.in_delta(tmpV2[0], 0.53264153607085, 0.001, 'uv');
		assert.in_delta(tmpV2[1], 0.46735846392915004, 0.001, 'uv');
		object.position.set(0, 0, 0);
	});
});
