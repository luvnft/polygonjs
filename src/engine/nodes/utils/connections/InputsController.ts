import {BaseNodeType} from '../../_Base';
import {BaseContainer} from '../../../containers/_Base';
// import lodash_includes from 'lodash/includes'
// import lodash_filter from 'lodash/filter'
import lodash_each from 'lodash/each';
import lodash_isString from 'lodash/isString';
// import lodash_compact from 'lodash/compact'
import {BaseNamedConnectionPointType} from './NamedConnectionPoint';
import {NodeConnection} from './NodeConnection';

import {CoreGraphNode} from '../../../../core/graph/CoreGraphNode';
import {NodeEvent} from '../../../poly/NodeEvent';
import {InputCloneMode} from '../../../poly/InputCloneMode';
import {TypeAssert} from '../../../poly/Assert';

// export class InputGraphNode extends NodeSimple {
// 	constructor(name: string) {
// 		super(name);
// 	}
// }

// export interface InputsControllerOptions {
// 	min_inputs?: number;
// 	max_inputs?: number;
// 	depends_on_inputs?: boolean;
// }
type OnUpdateHook = () => void;

// TODO: remove the "throw" statements, which seem less necessary now with typescript
export class InputsController<T extends BaseNodeType> {
	private _graph_node_inputs: CoreGraphNode[] = [];
	private _inputs: Array<T | null> = [];
	private _has_named_inputs: boolean = false;
	// _input_connections: NodeConnection[] = []
	private _named_input_connection_points: BaseNamedConnectionPointType[] | undefined;
	private _min_inputs_count: number = 0;
	private _max_inputs_count: number = 0;
	private _depends_on_inputs: boolean = true;

	// hooks
	private _on_update_hooks: OnUpdateHook[] | undefined;
	private _on_update_hook_names: string[] | undefined;

	// clonable
	private _user_inputs_clonable_states: InputCloneMode[] | undefined;
	private _inputs_clonable_states: InputCloneMode[] | undefined;
	private _override_clonable_state: boolean = false;

	constructor(protected node: T) {
		//, options: InputsControllerOptions = {}) {
		// this.set_options(options);
	}

	// set_options(options: InputsControllerOptions) {
	// 	if (options['min_inputs']) {
	// 		this.set_min_inputs_count(options['min_inputs']);
	// 	}
	// 	if (options['max_inputs']) {
	// 		this.set_max_inputs_count(options['max_inputs']);
	// 	}
	// 	if (options['depends_on_inputs']) {
	// 		this.set_depends_on_inputs(options['depends_on_inputs']);
	// 	}
	// }

	// _init_inputs() {
	// 	this._inputs = [];
	// }
	set_depends_on_inputs(depends_on_inputs: boolean) {
		this._depends_on_inputs = depends_on_inputs;
	}
	private set_min_inputs_count(min_inputs_count: number) {
		this._min_inputs_count = min_inputs_count;
	}
	// min_inputs_count() {
	// 	return this._min_inputs_count || 0;
	// }
	private set_max_inputs_count(max_inputs_count: number) {
		this._max_inputs_count = max_inputs_count;
		this.init_graph_node_inputs();
	}

	named_input_connection_points_by_name(name: string): BaseNamedConnectionPointType | undefined {
		if (this._named_input_connection_points) {
			for (let connection_point of this._named_input_connection_points) {
				if (connection_point.name == name) {
					return connection_point;
				}
			}
		}
	}
	set_named_input_connection_points(connection_points: BaseNamedConnectionPointType[]) {
		this._has_named_inputs = true;
		this._named_input_connection_points = connection_points;
		this.set_min_inputs_count(0);
		this.set_max_inputs_count(connection_points.length);
		this.init_graph_node_inputs();
		this.node.emit(NodeEvent.NAMED_INPUTS_UPDATED);
	}
	get has_named_inputs() {
		return this._has_named_inputs;
	}
	get named_input_connection_points(): BaseNamedConnectionPointType[] {
		return this._named_input_connection_points || [];
	}
	private init_graph_node_inputs() {
		for (let i = 0; i < this._max_inputs_count; i++) {
			this._graph_node_inputs[i] = this._graph_node_inputs[i] || this._create_graph_node_input(i);
		}
	}
	private _create_graph_node_input(index: number): CoreGraphNode {
		const graph_input_node = new CoreGraphNode(this.node.scene, `input_${index}`);
		// graph_input_node.set_scene(this.node.scene);
		this.node.add_graph_input(graph_input_node);
		return graph_input_node;
	}

	get max_inputs_count(): number {
		return this._max_inputs_count || 0;
	}
	input_graph_node(input_index: number): CoreGraphNode {
		return this._graph_node_inputs[input_index];
	}

	// set_count_to_zero() {
	// 	this.set_min_inputs_count(0);
	// 	this.set_max_inputs_count(0);

	// 	this.init_inputs_clonable_state();
	// }
	// set_count_to_one_max() {
	// 	this.set_min_inputs_count(0);
	// 	this.set_max_inputs_count(1);

	// 	this.init_inputs_clonable_state();
	// }
	set_count(min: number, max?: number) {
		if (max == null) {
			max = min;
		}
		this.set_min_inputs_count(min);
		this.set_max_inputs_count(max);

		this.init_inputs_clonable_state();
		this.init_connections_controller_inputs();
	}
	private init_connections_controller_inputs() {
		this.node.io.connections.init_inputs();
	}
	// requires_two_inputs: ->
	// 	this.set_min_inputs_count(2)
	// 	this.set_max_inputs_count(2)

	// requires_one_input() {
	// 	return this._min_inputs_count > 0;
	// }

	// eval_required_inputs(callback){
	// 	const containers = [];
	// 	if (this._max_inputs_count === 0) {
	// 		return callback(containers);
	// 	} else {
	// 		const existing_inputs = lodash_compact(this.inputs());
	// 		if (existing_inputs.length < this._min_inputs_count) {
	// 			return this.self.set_error("inputs are missing");
	// 		} else {
	// 			// const frame = this.self.context().frame();
	// 			// const full_path = this.self.full_path();

	// 			switch (existing_inputs.length) {
	// 				case 0:
	// 					return callback(containers);
	// 				case 1:
	// 					return this.eval_required_input(0, container=> {
	// 						containers.push(container);
	// 						return callback(containers);
	// 					});
	// 				case 2:
	// 					return this.eval_required_input(0, container0=> {
	// 						return this.eval_required_input(1, container1=> {
	// 							containers.push(container0);
	// 							containers.push(container1);
	// 							return callback(containers);
	// 						});
	// 					});
	// 					// TODO: I could also here check if the inputs are dirty
	// 					// instead of going through the callback chain
	// 					// input_node0 = this.input(0)
	// 					// input_node0.context().set_frame(frame, full_path)
	// 					// input_node0.request_container (container0)=>
	// 					// 	input_node1 = this.input(1)
	// 					// 	input_node1.context().set_frame(frame, full_path)
	// 					// 	input_node1.request_container (container1)=>
	// 					// 		containers.push(container0)
	// 					// 		containers.push(container1)
	// 					// 		callback([container0, container1])
	// 				default:
	// 					console.warn(`${this.self.full_path()} inputs not evaluated`);
	// 					return callback();
	// 			}
	// 		}
	// 	}
	// }
	async eval_required_inputs() {
		let containers: Array<BaseContainer | null> = [];
		if (this._max_inputs_count > 0) {
			const existing_input_indices: number[] = [];
			const inputs = this.inputs();
			for (let i = 0; i < inputs.length; i++) {
				if (inputs[i]) {
					existing_input_indices.push(i);
				}
			}
			// const existing_inputs = lodash_compact(this.inputs());
			if (existing_input_indices.length < this._min_inputs_count) {
				this.node.states.error.set('inputs are missing');
			} else {
				if (existing_input_indices.length > 0) {
					const promises = inputs.map((input, input_index) => {
						if (input) {
							return this.node.io.inputs.eval_required_input(input_index);
						}
					});
					containers = await Promise.all(promises);
				}
			}
		}
		return containers;
	}
	// eval_required_input(input_index: number, callback){
	// 	return this.self.request_input_container(input_index, container=> {
	// 		// we do not clone here, as we just check if a group is present
	// 		let group;
	// 		if ((container != null) && ((group = container.object({clone: false})) != null)) {
	// 			return callback(container);
	// 		} else {
	// 			const input_node = this.input(input_index);
	// 			if (input_node != null) {
	// 				const input_error_message = input_node.error_message();
	// 				return this.self.set_error(`input ${input_index} is invalid (error: ${input_error_message})`);
	// 			}
	// 		}
	// 	});
	// }
	async eval_required_input(input_index: number) {
		const container = await this.node.container_controller.request_input_container(input_index);
		// we do not clone here, as we just check if a group is present
		if (container && container.core_content()) {
			// return container;
		} else {
			const input_node = this.input(input_index);
			if (input_node) {
				const input_error_message = input_node.states.error.message;
				if (input_error_message) {
					this.node.states.error.set(`input ${input_index} is invalid (error: ${input_error_message})`);
				}
			}
		}
		return container;
	}
	// protected _get_named_input_index_without_error(name: string): number {
	// 	const connections = this.named_input_connections;
	// 	let index = -1;
	// 	for (let i = 0; i < connections.length; i++) {
	// 		const connection = connections[i];
	// 		if (connection.name == name) {
	// 			return i;
	// 		}
	// 	}
	// 	return index;
	// }
	get_named_input_index(name: string): number {
		if (this._named_input_connection_points) {
			for (let i = 0; i < this._named_input_connection_points.length; i++) {
				if (this._named_input_connection_points[i].name == name) {
					return i;
				}
			}
		}
		return -1;
		// const index = this._get_named_input_index_without_error(name);
		// if (index == null) {
		// 	const connections = this.named_input_connections;
		// 	const available_names = connections.map((o) => o.name).join(', ');
		// 	console.log('named_input_connections', connections);
		// 	throw new Error(
		// 		`${this.node.full_path()}: no inputs named '${name}'. available names are '${available_names}' (${
		// 			connections.length
		// 		} inputs)`
		// 	);
		// }
		// return index;
	}
	get_input_index(input_index_or_name: number | string): number {
		if (lodash_isString(input_index_or_name)) {
			if (this.has_named_inputs) {
				return this.get_named_input_index(input_index_or_name);
			} else {
				throw new Error(`node ${this.node.full_path()} has no named inputs`);
			}
		} else {
			return input_index_or_name;
		}
	}

	set_input(input_index_or_name: number | string, node: T | null, output_index_or_name: number | string = 0) {
		const input_index = this.get_input_index(input_index_or_name) || 0;
		if (input_index < 0) {
			const message = `invalid input (${input_index_or_name}) for node ${this.node.full_path()}`;
			console.warn(message);
			throw new Error(message);
		}

		let output_index = 0;
		if (node) {
			if (node.io.outputs.has_named_outputs) {
				// if(node.has_named_output(output_index_or_name)){
				output_index = node.io.outputs.get_output_index(output_index_or_name);
				if (output_index == null || output_index < 0) {
					console.warn(`node ${node.full_path()} does not have an output named ${output_index_or_name}`);
					return;
				}
				// this seems to prevent connecting output 1 from a vec to float to something else
				// } else {
				// 	console.warn(`${node.full_path()} has no output '${output_index_or_name}'`)
				// }
			}
		}

		const graph_input_node = this._graph_node_inputs[input_index];
		if (graph_input_node == null) {
			const message = `graph_input_node not found at index ${input_index}`;
			console.warn(message);
			throw new Error(message);
		}

		if (node && this.node.parent != node.parent) {
			return;
		}
		// use the name if the node is either not defined or in another parent
		// const parent = this.self.parent()
		// if ((node == null) || (node.parent().graph_node_id !== parent.graph_node_id)) {
		// 	if (node_name != null) {
		// 		node = parent.node(node_name);
		// 	}
		// }

		const old_input_node = this._inputs[input_index];
		let old_output_index: number | null = null;
		let old_connection: NodeConnection | undefined = undefined;
		if (this.node.io.connections) {
			old_connection = this.node.io.connections.input_connection(input_index);
		}
		if (old_connection) {
			old_output_index = old_connection.output_index;
		}

		if (node !== old_input_node || output_index != old_output_index) {
			// TODO: test: add test to make sure this is necessary
			if (old_input_node != null) {
				if (this._depends_on_inputs) {
					graph_input_node.remove_graph_input(old_input_node);
				}
			}

			if (node != null) {
				if (graph_input_node.add_graph_input(node)) {
					// we do test if we can create the graph connection
					// to ensure we are not in a cyclical graph,
					// but we delete it right after
					if (!this._depends_on_inputs) {
						graph_input_node.remove_graph_input(node);
					}

					//this._input_connections[input_index] = new NodeConnection(node, this.self, output_index, input_index);
					if (old_connection) {
						old_connection.disconnect({set_input: false});
					}
					this._inputs[input_index] = node;
					new NodeConnection(node, this.node, output_index, input_index);
				} else {
					console.warn(`cannot connect ${node.full_path()} to ${this.node.full_path()}`);
				}
			} else {
				this._inputs[input_index] = null;
				if (old_connection) {
					old_connection.disconnect({set_input: false});
				}
				// this._input_connections[input_index] = null;
			}

			this._run_on_set_input_hooks();
			graph_input_node.set_successors_dirty();
			// this.node.set_dirty(node);
			this.node.emit(NodeEvent.INPUTS_UPDATED);
		}
	}

	remove_input(node: T) {
		lodash_each(this.inputs(), (input, index) => {
			if (input != null && node != null) {
				if (input.graph_node_id === node.graph_node_id) {
					this.set_input(index, null);
				}
			}
		});
	}

	input(input_index: number): T | null {
		return this._inputs[input_index];
	}
	// TODO: the named_input and named_output API really needs to change
	named_input(input_name: string): T | null {
		if (this.has_named_inputs) {
			const input_index = this.get_input_index(input_name);
			return this._inputs[input_index];
		} else {
			return null;
		}
	}
	named_input_connection_point(input_name: string): BaseNamedConnectionPointType | undefined {
		if (this.has_named_inputs && this._named_input_connection_points) {
			const input_index = this.get_input_index(input_name);
			return this._named_input_connection_points[input_index];
		}
	}
	has_named_input(name: string): boolean {
		return this.get_named_input_index(name) >= 0;
	}
	has_input(input_index: number): boolean {
		return this._inputs[input_index] != null;
	}
	inputs() {
		return this._inputs;
	}

	// outputs(): BaseNode[] {
	// 	return lodash_filter(this.self.graph_successors(), successor=> {
	// 		if (successor.is_a(Node)) {
	// 			return lodash_includes(successor.inputs(), this.self);
	// 		}
	// 	});
	// }

	// clonable states
	override_clonable_state_allowed() {
		let value = false;
		for (let state of this.inputs_clonable_state()) {
			if (state == InputCloneMode.FROM_NODE) {
				value = true;
			}
		}
		return value;
	}

	inputs_clonable_state(): InputCloneMode[] {
		return (this._inputs_clonable_states = this._inputs_clonable_states || this.init_inputs_clonable_state());
	}
	input_cloned(index: number): boolean {
		return this.input_clonable_state_with_override(index);
	}
	inputs_clonable_state_with_override(): boolean[] {
		const list = [];
		const states = this.inputs_clonable_state();
		for (let i = 0; i < states.length; i++) {
			list.push(this.input_clonable_state_with_override(i));
		}
		return list;
	}
	input_clonable_state_with_override(index: number): boolean {
		const states = this.inputs_clonable_state();
		// for (let i = 0; i < states.length; i++) {
		// TODO: typescript: not sure if this loop was justified
		const state = states[index];
		switch (state) {
			case InputCloneMode.ALWAYS:
				return true;
			case InputCloneMode.NEVER:
				return false;
			case InputCloneMode.FROM_NODE:
				return !this._override_clonable_state;
			// default:
			// 	throw new Error('unsupported type');
		}
		return TypeAssert.unreachable(state);
		// }
	}

	init_inputs_clonable_state(values: InputCloneMode[] | null = null) {
		if (values) {
			this._user_inputs_clonable_states = values;
		}
		this._inputs_clonable_states = this._user_inputs_clonable_states || this._default_inputs_clonale_state_values();

		return this._inputs_clonable_states;
	}
	private _default_inputs_clonale_state_values() {
		const list = [];
		for (let i = 0; i < this._max_inputs_count; i++) {
			// lodash_times(this.self._max_inputs_count, (i)=>{
			list.push(InputCloneMode.ALWAYS);
		}
		return list;
	}

	set_override_clonable_state(state: boolean) {
		this._override_clonable_state = state;
		this.node.emit(NodeEvent.OVERRIDE_CLONABLE_STATE_UPDATE);
	}
	override_clonable_state() {
		return this._override_clonable_state;
	}

	//
	//
	// HOOKS
	//
	//
	add_on_set_input_hook(name: string, hook: OnUpdateHook) {
		this._on_update_hooks = this._on_update_hooks || [];
		this._on_update_hook_names = this._on_update_hook_names || [];

		if (!this._on_update_hook_names.includes(name)) {
			this._on_update_hooks.push(hook);
			this._on_update_hook_names.push(name);
		} else {
			console.warn(`hook with name ${name} already exists`, this.node);
		}
	}
	private _run_on_set_input_hooks() {
		if (this._on_update_hooks) {
			for (let hook of this._on_update_hooks) {
				hook();
			}
		}
	}
}
