import {DataType, DATA_TYPES} from '../../../../src/engine/nodes/sop/DataUrl';

QUnit.test('data_url json', async (assert) => {
	const geo1 = window.geo1;

	const data_url1 = geo1.create_node('data_url');

	let container;
	container = await data_url1.request_container();
	assert.ok(!data_url1.is_dirty);
	assert.equal(container.points_count(), 2);

	await window.scene.root.process_queue();

	data_url1.p.url.set('/examples/sop/data_url/default.json');
	container = await data_url1.request_container();

	assert.ok(!data_url1.is_dirty);
	assert.equal(container.points_count(), 8);

	data_url1.p.url.set('/examples/sop/data_url/basic.json');
	container = await data_url1.request_container();

	assert.ok(!data_url1.is_dirty);
	assert.equal(container.points_count(), 2);

	// and a non existing
	data_url1.p.url.set('/dataurl_doesnotexist.json');
	container = await data_url1.request_container();

	assert.ok(!data_url1.is_dirty);
	assert.equal(container.points_count(), 0);
	assert.equal(
		data_url1.states.error.message,
		'could not load geometry from /dataurl_doesnotexist.json (SyntaxError: Unexpected token < in JSON at position 0)'
	);

	// restore it with a good url
	data_url1.p.url.set('/examples/sop/data_url/default.json');
	container = await data_url1.request_container();
	assert.equal(container.points_count(), 8);
});

QUnit.test('data_url csv without reading names from file', async (assert) => {
	const geo1 = window.geo1;

	const data_url1 = geo1.create_node('data_url');
	data_url1.p.url.set('/examples/sop/data_url/without_attrib_names.csv');
	data_url1.p.data_type.set(DATA_TYPES.indexOf(DataType.CSV));
	data_url1.p.read_attrib_names_from_file.set(0);
	data_url1.p.attrib_names.set('attr1 attr2 attr3');

	let container;
	container = await data_url1.request_container();
	assert.ok(!data_url1.is_dirty);
	assert.equal(container.points_count(), 2);
	const core_group = container.core_content()!;
	const point = core_group.points()[0];
	assert.equal(point.attrib_value('attr1'), 1);
	assert.equal(point.attrib_value('attr2'), 2);
	assert.equal(point.attrib_value('attr3'), 3);
});
QUnit.test('data_url csv with reading names from file', async (assert) => {
	const geo1 = window.geo1;

	const data_url1 = geo1.create_node('data_url');
	data_url1.p.url.set('/examples/sop/data_url/with_attrib_names.csv');
	data_url1.p.data_type.set(DATA_TYPES.indexOf(DataType.CSV));
	data_url1.p.read_attrib_names_from_file.set(1);

	let container = await data_url1.request_container();
	assert.ok(!data_url1.is_dirty);
	assert.equal(container.points_count(), 2);
	const core_group = container.core_content()!;
	const point = core_group.points()[0];
	assert.equal(point.attrib_value('rot'), 1);
	assert.equal(point.attrib_value('scale'), 2);
	assert.equal(point.attrib_value('mult'), 3);
	assert.equal(point.attrib_value('add'), 4);
});
