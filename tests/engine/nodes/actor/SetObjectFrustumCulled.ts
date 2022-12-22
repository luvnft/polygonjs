import {Mesh} from 'three';
import {CoreSleep} from '../../../../src/core/Sleep';
import {ActorConnectionPointType} from '../../../../src/engine/nodes/utils/io/connections/Actor';
import {RendererUtils} from '../../../helpers/RendererUtils';

QUnit.test('actor/setObjectFrustumCulled', async (assert) => {
	const scene = window.scene;
	const perspective_camera1 = window.perspective_camera1;

	const geo1 = scene.createNode('geo');
	const box1 = geo1.createNode('box');
	const actor1 = geo1.createNode('actor');

	actor1.setInput(0, box1);
	actor1.flags.display.set(true);

	const onManualTrigger1 = actor1.createNode('onManualTrigger');
	const negate1 = actor1.createNode('negate');
	const getObjectProperty1 = actor1.createNode('getObjectProperty');
	const setObjectFrustumCulled1 = actor1.createNode('setObjectFrustumCulled');

	setObjectFrustumCulled1.setInput(ActorConnectionPointType.TRIGGER, onManualTrigger1);
	setObjectFrustumCulled1.setInput('frustumCulled', negate1);
	negate1.setInput(0, getObjectProperty1, 'frustumCulled');

	await CoreSleep.sleep(50);

	const container = await actor1.compute();
	const object = container.coreContent()!.objects()[0] as Mesh;
	object.frustumCulled = true;

	await RendererUtils.withViewer({cameraNode: perspective_camera1}, async (args) => {
		scene.play();
		assert.equal(scene.time(), 0);
		assert.equal(object.position.y, 0);
		await CoreSleep.sleep(500);
		assert.in_delta(scene.time(), 0.5, 0.25, 'time is 0.5 sec');
		assert.ok(object.frustumCulled, 'object frustumCulled 1');

		onManualTrigger1.p.trigger.pressButton();
		await CoreSleep.sleep(100);
		assert.notOk(object.frustumCulled, 'object hidden 2');

		onManualTrigger1.p.trigger.pressButton();
		await CoreSleep.sleep(100);
		assert.ok(object.frustumCulled, 'object frustumCulled 3');

		onManualTrigger1.p.trigger.pressButton();
		await CoreSleep.sleep(100);
		assert.notOk(object.frustumCulled, 'object hidden 4');

		onManualTrigger1.p.trigger.pressButton();
		await CoreSleep.sleep(100);
		assert.ok(object.frustumCulled, 'object frustumCulled 5');
	});
});
