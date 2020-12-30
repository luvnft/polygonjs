import {BaseNodeClass} from './nodes/_Base';
import {PolyScene} from './scene/PolyScene';
import {RenderersController} from './poly/RenderersController';
import {
	NodesRegister,
	RegisterOptions,
	BaseNodeConstructor,
	OperationsRegister,
} from './poly/registers/nodes/NodesRegister';
import {ExpressionRegister} from './poly/registers/expressions/ExpressionRegister';
import {NodeContext} from './poly/NodeContext';
import {DynamicModulesRegister} from './poly/registers/modules/DynamicModulesRegister';
import {AssemblersRegister} from './poly/registers/assemblers/AssemblersRegistry';
import {BaseCoreLogger} from '../core/logger/Base';
import {BaseOperation} from '../core/operations/_Base';
import {PluginsRegister} from './poly/registers/plugins/PluginsRegister';

export class Poly {
	static _instance: Poly | undefined;
	public readonly renderers_controller: RenderersController = new RenderersController();
	public readonly nodesRegister: NodesRegister = new NodesRegister(this);
	public readonly operationsRegister: OperationsRegister = new OperationsRegister(this);
	public readonly expressionsRegister: ExpressionRegister = new ExpressionRegister();
	public readonly modulesRegister: DynamicModulesRegister = new DynamicModulesRegister();
	public readonly assemblersRegister: AssemblersRegister = new AssemblersRegister();
	public readonly pluginsRegister: PluginsRegister = new PluginsRegister(this);
	scenes_by_uuid: Dictionary<PolyScene> = {};
	_env: string | undefined;
	private _player_mode: boolean = true;
	private _logger: BaseCoreLogger | null = null;

	static instance() {
		return (this._instance = this._instance || new Poly());
	}
	private constructor() {}

	set_player_mode(mode: boolean) {
		this._player_mode = mode;
	}
	player_mode() {
		return this._player_mode;
	}

	registerNode(node: BaseNodeConstructor, tab_menu_category?: string, options?: RegisterOptions) {
		this.nodesRegister.register(node, tab_menu_category, options);
	}
	registerOperation(operation: typeof BaseOperation) {
		this.operationsRegister.register(operation);
	}
	registeredNodes(parent_context: NodeContext, type: string): Dictionary<typeof BaseNodeClass> {
		return this.nodesRegister.registeredNodes(parent_context, type);
	}
	registeredOperation(parent_context: NodeContext, operation_type: string): typeof BaseOperation | undefined {
		return this.operationsRegister.registeredOperation(parent_context, operation_type);
	}

	in_worker_thread() {
		return false;
	}
	desktop_controller(): any {}

	//
	//
	// ENV
	//
	//
	set_env(env: string) {
		this._env = env;
	}
	get env() {
		return this._env;
	}

	//
	//
	// LOGGER
	//
	//
	set_logger(logger: BaseCoreLogger | null) {
		this._logger = logger;
	}
	get logger() {
		return this._logger;
	}

	static log(message?: any, ...optionalParams: any[]) {
		this.instance().logger?.log(...[message, ...optionalParams]);
	}
	static warn(message?: any, ...optionalParams: any[]) {
		this.instance().logger?.warn(...[message, ...optionalParams]);
	}
	static error(message?: any, ...optionalParams: any[]) {
		this.instance().logger?.error(...[message, ...optionalParams]);
	}
}
