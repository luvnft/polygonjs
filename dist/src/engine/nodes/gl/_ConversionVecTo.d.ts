import { TypedGlNode } from './_Base';
import { ParamType } from '../../poly/ParamType';
import { NodeParamsConfig } from '../utils/params/ParamsConfig';
import { ShadersCollectionController } from './code/utils/ShadersCollectionController';
declare class VecToParamsConfig extends NodeParamsConfig {
}
declare class BaseVecToGlNode extends TypedGlNode<VecToParamsConfig> {
    params_config: VecToParamsConfig;
}
declare const Vec2ToFloatGlNode_base: {
    new (scene: import("../..").PolyScene, name?: string): {
        initialize_node(): void;
        create_params(): void;
        set_lines(shaders_collection_controller: ShadersCollectionController): void;
        params_config: VecToParamsConfig;
        _param_configs_controller: import("../utils/code/controllers/ParamConfigsController").ParamConfigsController<import("./code/utils/ParamConfig").GlParamConfig<ParamType>> | undefined;
        _assembler: import("./code/assemblers/_Base").BaseGlShaderAssembler | undefined;
        initialize_base_node(): void;
        cook(): void;
        _set_mat_to_recompile(): void;
        readonly material_node: import("./code/Controller").AssemblerControllerNode | undefined;
        gl_var_name(name: string): string;
        variable_for_input(name: string): string;
        reset_code(): void;
        set_param_configs(): void;
        param_configs(): readonly import("./code/utils/ParamConfig").GlParamConfig<ParamType>[] | undefined;
        param_default_value(name: string): string | number | boolean | StringOrNumber3 | import("../../params/ramp/RampValue").RampValueJson | StringOrNumber2 | StringOrNumber4 | null;
        container_controller: import("../utils/ContainerController").TypedContainerController<import("../../poly/NodeContext").NodeContext.GL>;
        _parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController | undefined;
        _ui_data: import("../utils/UIData").UIData | undefined;
        _states: import("../utils/StatesController").StatesController | undefined;
        _lifecycle: import("../utils/LifeCycleController").LifeCycleController | undefined;
        _serializer: import("../utils/Serializer").NodeSerializer | undefined;
        _cook_controller: import("../utils/CookController").NodeCookController<import("../../poly/NodeContext").NodeContext.GL> | undefined;
        readonly flags: import("../utils/FlagsController").FlagsController | undefined;
        readonly display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        readonly persisted_config: import("../utils/PersistedConfig").BasePersistedConfig | undefined;
        _params_controller: import("../utils/params/ParamsController").ParamsController | undefined;
        readonly pv: import("../utils/params/ParamsValueAccessor").ParamsValueAccessorType<VecToParamsConfig>;
        readonly p: import("../utils/params/ParamsAccessor").ParamsAccessorType<VecToParamsConfig>;
        _name_controller: import("../utils/NameController").NameController | undefined;
        readonly parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController;
        _children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        _children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        readonly children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        _create_children_controller(): import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        readonly children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        children_allowed(): boolean;
        readonly ui_data: import("../utils/UIData").UIData;
        readonly states: import("../utils/StatesController").StatesController;
        readonly lifecycle: import("../utils/LifeCycleController").LifeCycleController;
        readonly serializer: import("../utils/Serializer").NodeSerializer;
        readonly cook_controller: import("../utils/CookController").NodeCookController<import("../../poly/NodeContext").NodeContext.GL>;
        _io: import("../utils/io/IOController").IOController<import("../../poly/NodeContext").NodeContext.GL> | undefined;
        readonly io: import("../utils/io/IOController").IOController<import("../../poly/NodeContext").NodeContext.GL>;
        readonly name_controller: import("../utils/NameController").NameController;
        set_name(name: string): void;
        _set_core_name(name: string): void;
        readonly params: import("../utils/params/ParamsController").ParamsController;
        _initialized: boolean;
        initialize_base_and_node(): void;
        readonly type: string;
        node_context(): import("../../poly/NodeContext").NodeContext;
        require_webgl2(): boolean;
        set_parent(parent: import("../_Base").BaseNodeType | null): void;
        readonly parent: import("../_Base").BaseNodeType | null;
        readonly root: import("../manager/ObjectsManager").ObjectsManagerNode;
        full_path(): string;
        add_param<T extends ParamType>(type: T, name: string, default_value: import("../../params/types/ParamInitValuesTypeMap").ParamInitValuesTypeMap[T], options?: import("../../params/utils/OptionsController").ParamOptions | undefined): import("../../params/types/ParamConstructorMap").ParamConstructorMap[T] | undefined;
        request_container(): Promise<import("../../containers/Gl").GlContainer>;
        set_container(content: string, message?: string | null): void;
        create_node(type: string): import("../_Base").BaseNodeType | undefined;
        remove_node(node: import("../_Base").BaseNodeType): void;
        children(): import("../_Base").BaseNodeType[];
        node(path: string): import("../_Base").BaseNodeType | null;
        node_sibbling(name: string): import("./_Base").BaseGlNodeType | null;
        nodes_by_type(type: string): import("../_Base").BaseNodeType[];
        set_input(input_index_or_name: string | number, node: import("./_Base").BaseGlNodeType | null, output_index_or_name?: string | number): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.CREATED, data: import("../_Base").NodeCreatedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.DELETED, data: import("../_Base").NodeDeletedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAME_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.OVERRIDE_CLONABLE_STATE_UPDATE): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_OUTPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.PARAMS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_POSITION_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_COMMENT_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.ERROR_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_BYPASS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_DISPLAY_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.SELECTION_UPDATED): void;
        to_json(include_param_components?: boolean): import("../utils/Serializer").NodeSerializerData;
        required_modules(): void | import("../../poly/registers/modules/_BaseRegister").ModuleName[];
        used_assembler(): void | import("../../poly/registers/assemblers/_BaseRegister").AssemblerName;
        integration_data(): void | import("../_Base").IntegrationData;
        _graph: import("../../../core/graph/CoreGraph").CoreGraph;
        _graph_node_id: string;
        _dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        _scene: import("../..").PolyScene;
        _name: string;
        readonly name: string;
        readonly scene: import("../..").PolyScene;
        readonly graph: import("../../../core/graph/CoreGraph").CoreGraph;
        readonly graph_node_id: string;
        readonly dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        set_dirty(trigger?: import("../../../core/graph/CoreGraphNode").CoreGraphNode | null | undefined): void;
        set_successors_dirty(trigger?: import("../../../core/graph/CoreGraphNode").CoreGraphNode | undefined): void;
        remove_dirty_state(): void;
        readonly is_dirty: boolean;
        add_post_dirty_hook(name: string, callback: import("../../../core/graph/DirtyController").PostDirtyHook): void;
        graph_remove(): void;
        add_graph_input(src: import("../../../core/graph/CoreGraphNode").CoreGraphNode, check_if_graph_has_cycle?: boolean): boolean;
        remove_graph_input(src: import("../../../core/graph/CoreGraphNode").CoreGraphNode): void;
        graph_disconnect_predecessors(): void;
        graph_disconnect_successors(): void;
        graph_predecessor_ids(): string[];
        graph_predecessors(): import("../../../core/graph/CoreGraphNode").CoreGraphNode[];
        graph_successors(): import("../../../core/graph/CoreGraphNode").CoreGraphNode[];
        graph_all_predecessors(): import("../../../core/graph/CoreGraphNode").CoreGraphNode[];
        graph_all_successors(): import("../../../core/graph/CoreGraphNode").CoreGraphNode[];
    };
    type(): string;
    node_context(): import("../../poly/NodeContext").NodeContext;
    displayed_input_names(): string[];
    require_webgl2(): boolean;
};
export declare class Vec2ToFloatGlNode extends Vec2ToFloatGlNode_base {
}
declare const Vec3ToFloatGlNode_base: {
    new (scene: import("../..").PolyScene, name?: string): {
        initialize_node(): void;
        create_params(): void;
        set_lines(shaders_collection_controller: ShadersCollectionController): void;
        params_config: VecToParamsConfig;
        _param_configs_controller: import("../utils/code/controllers/ParamConfigsController").ParamConfigsController<import("./code/utils/ParamConfig").GlParamConfig<ParamType>> | undefined;
        _assembler: import("./code/assemblers/_Base").BaseGlShaderAssembler | undefined;
        initialize_base_node(): void;
        cook(): void;
        _set_mat_to_recompile(): void;
        readonly material_node: import("./code/Controller").AssemblerControllerNode | undefined;
        gl_var_name(name: string): string;
        variable_for_input(name: string): string;
        reset_code(): void;
        set_param_configs(): void;
        param_configs(): readonly import("./code/utils/ParamConfig").GlParamConfig<ParamType>[] | undefined;
        param_default_value(name: string): string | number | boolean | StringOrNumber3 | import("../../params/ramp/RampValue").RampValueJson | StringOrNumber2 | StringOrNumber4 | null;
        container_controller: import("../utils/ContainerController").TypedContainerController<import("../../poly/NodeContext").NodeContext.GL>;
        _parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController | undefined;
        _ui_data: import("../utils/UIData").UIData | undefined;
        _states: import("../utils/StatesController").StatesController | undefined;
        _lifecycle: import("../utils/LifeCycleController").LifeCycleController | undefined;
        _serializer: import("../utils/Serializer").NodeSerializer | undefined;
        _cook_controller: import("../utils/CookController").NodeCookController<import("../../poly/NodeContext").NodeContext.GL> | undefined;
        readonly flags: import("../utils/FlagsController").FlagsController | undefined;
        readonly display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        readonly persisted_config: import("../utils/PersistedConfig").BasePersistedConfig | undefined;
        _params_controller: import("../utils/params/ParamsController").ParamsController | undefined;
        readonly pv: import("../utils/params/ParamsValueAccessor").ParamsValueAccessorType<VecToParamsConfig>;
        readonly p: import("../utils/params/ParamsAccessor").ParamsAccessorType<VecToParamsConfig>;
        _name_controller: import("../utils/NameController").NameController | undefined;
        readonly parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController;
        _children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        _children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        readonly children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        _create_children_controller(): import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        readonly children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        children_allowed(): boolean;
        readonly ui_data: import("../utils/UIData").UIData;
        readonly states: import("../utils/StatesController").StatesController;
        readonly lifecycle: import("../utils/LifeCycleController").LifeCycleController;
        readonly serializer: import("../utils/Serializer").NodeSerializer;
        readonly cook_controller: import("../utils/CookController").NodeCookController<import("../../poly/NodeContext").NodeContext.GL>;
        _io: import("../utils/io/IOController").IOController<import("../../poly/NodeContext").NodeContext.GL> | undefined;
        readonly io: import("../utils/io/IOController").IOController<import("../../poly/NodeContext").NodeContext.GL>;
        readonly name_controller: import("../utils/NameController").NameController;
        set_name(name: string): void;
        _set_core_name(name: string): void;
        readonly params: import("../utils/params/ParamsController").ParamsController;
        _initialized: boolean;
        initialize_base_and_node(): void;
        readonly type: string;
        node_context(): import("../../poly/NodeContext").NodeContext;
        require_webgl2(): boolean;
        set_parent(parent: import("../_Base").BaseNodeType | null): void;
        readonly parent: import("../_Base").BaseNodeType | null;
        readonly root: import("../manager/ObjectsManager").ObjectsManagerNode;
        full_path(): string;
        add_param<T extends ParamType>(type: T, name: string, default_value: import("../../params/types/ParamInitValuesTypeMap").ParamInitValuesTypeMap[T], options?: import("../../params/utils/OptionsController").ParamOptions | undefined): import("../../params/types/ParamConstructorMap").ParamConstructorMap[T] | undefined;
        request_container(): Promise<import("../../containers/Gl").GlContainer>;
        set_container(content: string, message?: string | null): void;
        create_node(type: string): import("../_Base").BaseNodeType | undefined;
        remove_node(node: import("../_Base").BaseNodeType): void;
        children(): import("../_Base").BaseNodeType[];
        node(path: string): import("../_Base").BaseNodeType | null;
        node_sibbling(name: string): import("./_Base").BaseGlNodeType | null;
        nodes_by_type(type: string): import("../_Base").BaseNodeType[];
        set_input(input_index_or_name: string | number, node: import("./_Base").BaseGlNodeType | null, output_index_or_name?: string | number): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.CREATED, data: import("../_Base").NodeCreatedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.DELETED, data: import("../_Base").NodeDeletedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAME_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.OVERRIDE_CLONABLE_STATE_UPDATE): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_OUTPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.PARAMS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_POSITION_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_COMMENT_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.ERROR_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_BYPASS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_DISPLAY_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.SELECTION_UPDATED): void;
        to_json(include_param_components?: boolean): import("../utils/Serializer").NodeSerializerData;
        required_modules(): void | import("../../poly/registers/modules/_BaseRegister").ModuleName[];
        used_assembler(): void | import("../../poly/registers/assemblers/_BaseRegister").AssemblerName;
        integration_data(): void | import("../_Base").IntegrationData;
        _graph: import("../../../core/graph/CoreGraph").CoreGraph;
        _graph_node_id: string;
        _dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        _scene: import("../..").PolyScene;
        _name: string;
        readonly name: string;
        readonly scene: import("../..").PolyScene;
        readonly graph: import("../../../core/graph/CoreGraph").CoreGraph;
        readonly graph_node_id: string;
        readonly dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        set_dirty(trigger?: import("../../../core/graph/CoreGraphNode").CoreGraphNode | null | undefined): void;
        set_successors_dirty(trigger?: import("../../../core/graph/CoreGraphNode").CoreGraphNode | undefined): void;
        remove_dirty_state(): void;
        readonly is_dirty: boolean;
        add_post_dirty_hook(name: string, callback: import("../../../core/graph/DirtyController").PostDirtyHook): void;
        graph_remove(): void;
        add_graph_input(src: import("../../../core/graph/CoreGraphNode").CoreGraphNode, check_if_graph_has_cycle?: boolean): boolean;
        remove_graph_input(src: import("../../../core/graph/CoreGraphNode").CoreGraphNode): void;
        graph_disconnect_predecessors(): void;
        graph_disconnect_successors(): void;
        graph_predecessor_ids(): string[];
        graph_predecessors(): import("../../../core/graph/CoreGraphNode").CoreGraphNode[];
        graph_successors(): import("../../../core/graph/CoreGraphNode").CoreGraphNode[];
        graph_all_predecessors(): import("../../../core/graph/CoreGraphNode").CoreGraphNode[];
        graph_all_successors(): import("../../../core/graph/CoreGraphNode").CoreGraphNode[];
    };
    type(): string;
    node_context(): import("../../poly/NodeContext").NodeContext;
    displayed_input_names(): string[];
    require_webgl2(): boolean;
};
export declare class Vec3ToFloatGlNode extends Vec3ToFloatGlNode_base {
}
declare const Vec4ToFloatGlNode_base: {
    new (scene: import("../..").PolyScene, name?: string): {
        initialize_node(): void;
        create_params(): void;
        set_lines(shaders_collection_controller: ShadersCollectionController): void;
        params_config: VecToParamsConfig;
        _param_configs_controller: import("../utils/code/controllers/ParamConfigsController").ParamConfigsController<import("./code/utils/ParamConfig").GlParamConfig<ParamType>> | undefined;
        _assembler: import("./code/assemblers/_Base").BaseGlShaderAssembler | undefined;
        initialize_base_node(): void;
        cook(): void;
        _set_mat_to_recompile(): void;
        readonly material_node: import("./code/Controller").AssemblerControllerNode | undefined;
        gl_var_name(name: string): string;
        variable_for_input(name: string): string;
        reset_code(): void;
        set_param_configs(): void;
        param_configs(): readonly import("./code/utils/ParamConfig").GlParamConfig<ParamType>[] | undefined;
        param_default_value(name: string): string | number | boolean | StringOrNumber3 | import("../../params/ramp/RampValue").RampValueJson | StringOrNumber2 | StringOrNumber4 | null;
        container_controller: import("../utils/ContainerController").TypedContainerController<import("../../poly/NodeContext").NodeContext.GL>;
        _parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController | undefined;
        _ui_data: import("../utils/UIData").UIData | undefined;
        _states: import("../utils/StatesController").StatesController | undefined;
        _lifecycle: import("../utils/LifeCycleController").LifeCycleController | undefined;
        _serializer: import("../utils/Serializer").NodeSerializer | undefined;
        _cook_controller: import("../utils/CookController").NodeCookController<import("../../poly/NodeContext").NodeContext.GL> | undefined;
        readonly flags: import("../utils/FlagsController").FlagsController | undefined;
        readonly display_node_controller: import("../utils/DisplayNodeController").DisplayNodeController | undefined;
        readonly persisted_config: import("../utils/PersistedConfig").BasePersistedConfig | undefined;
        _params_controller: import("../utils/params/ParamsController").ParamsController | undefined;
        readonly pv: import("../utils/params/ParamsValueAccessor").ParamsValueAccessorType<VecToParamsConfig>;
        readonly p: import("../utils/params/ParamsAccessor").ParamsAccessorType<VecToParamsConfig>;
        _name_controller: import("../utils/NameController").NameController | undefined;
        readonly parent_controller: import("../utils/hierarchy/ParentController").HierarchyParentController;
        _children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        _children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        readonly children_controller_context: import("../../poly/NodeContext").NodeContext | undefined;
        _create_children_controller(): import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        readonly children_controller: import("../utils/hierarchy/ChildrenController").HierarchyChildrenController | undefined;
        children_allowed(): boolean;
        readonly ui_data: import("../utils/UIData").UIData;
        readonly states: import("../utils/StatesController").StatesController;
        readonly lifecycle: import("../utils/LifeCycleController").LifeCycleController;
        readonly serializer: import("../utils/Serializer").NodeSerializer;
        readonly cook_controller: import("../utils/CookController").NodeCookController<import("../../poly/NodeContext").NodeContext.GL>;
        _io: import("../utils/io/IOController").IOController<import("../../poly/NodeContext").NodeContext.GL> | undefined;
        readonly io: import("../utils/io/IOController").IOController<import("../../poly/NodeContext").NodeContext.GL>;
        readonly name_controller: import("../utils/NameController").NameController;
        set_name(name: string): void;
        _set_core_name(name: string): void;
        readonly params: import("../utils/params/ParamsController").ParamsController;
        _initialized: boolean;
        initialize_base_and_node(): void;
        readonly type: string;
        node_context(): import("../../poly/NodeContext").NodeContext;
        require_webgl2(): boolean;
        set_parent(parent: import("../_Base").BaseNodeType | null): void;
        readonly parent: import("../_Base").BaseNodeType | null;
        readonly root: import("../manager/ObjectsManager").ObjectsManagerNode;
        full_path(): string;
        add_param<T extends ParamType>(type: T, name: string, default_value: import("../../params/types/ParamInitValuesTypeMap").ParamInitValuesTypeMap[T], options?: import("../../params/utils/OptionsController").ParamOptions | undefined): import("../../params/types/ParamConstructorMap").ParamConstructorMap[T] | undefined;
        request_container(): Promise<import("../../containers/Gl").GlContainer>;
        set_container(content: string, message?: string | null): void;
        create_node(type: string): import("../_Base").BaseNodeType | undefined;
        remove_node(node: import("../_Base").BaseNodeType): void;
        children(): import("../_Base").BaseNodeType[];
        node(path: string): import("../_Base").BaseNodeType | null;
        node_sibbling(name: string): import("./_Base").BaseGlNodeType | null;
        nodes_by_type(type: string): import("../_Base").BaseNodeType[];
        set_input(input_index_or_name: string | number, node: import("./_Base").BaseGlNodeType | null, output_index_or_name?: string | number): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.CREATED, data: import("../_Base").NodeCreatedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.DELETED, data: import("../_Base").NodeDeletedEmitData): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAME_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.OVERRIDE_CLONABLE_STATE_UPDATE): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.NAMED_OUTPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.INPUTS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.PARAMS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_POSITION_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.UI_DATA_COMMENT_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.ERROR_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_BYPASS_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.FLAG_DISPLAY_UPDATED): void;
        emit(event_name: import("../../poly/NodeEvent").NodeEvent.SELECTION_UPDATED): void;
        to_json(include_param_components?: boolean): import("../utils/Serializer").NodeSerializerData;
        required_modules(): void | import("../../poly/registers/modules/_BaseRegister").ModuleName[];
        used_assembler(): void | import("../../poly/registers/assemblers/_BaseRegister").AssemblerName;
        integration_data(): void | import("../_Base").IntegrationData;
        _graph: import("../../../core/graph/CoreGraph").CoreGraph;
        _graph_node_id: string;
        _dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        _scene: import("../..").PolyScene;
        _name: string;
        readonly name: string;
        readonly scene: import("../..").PolyScene;
        readonly graph: import("../../../core/graph/CoreGraph").CoreGraph;
        readonly graph_node_id: string;
        readonly dirty_controller: import("../../../core/graph/DirtyController").DirtyController;
        set_dirty(trigger?: import("../../../core/graph/CoreGraphNode").CoreGraphNode | null | undefined): void;
        set_successors_dirty(trigger?: import("../../../core/graph/CoreGraphNode").CoreGraphNode | undefined): void;
        remove_dirty_state(): void;
        readonly is_dirty: boolean;
        add_post_dirty_hook(name: string, callback: import("../../../core/graph/DirtyController").PostDirtyHook): void;
        graph_remove(): void;
        add_graph_input(src: import("../../../core/graph/CoreGraphNode").CoreGraphNode, check_if_graph_has_cycle?: boolean): boolean;
        remove_graph_input(src: import("../../../core/graph/CoreGraphNode").CoreGraphNode): void;
        graph_disconnect_predecessors(): void;
        graph_disconnect_successors(): void;
        graph_predecessor_ids(): string[];
        graph_predecessors(): import("../../../core/graph/CoreGraphNode").CoreGraphNode[];
        graph_successors(): import("../../../core/graph/CoreGraphNode").CoreGraphNode[];
        graph_all_predecessors(): import("../../../core/graph/CoreGraphNode").CoreGraphNode[];
        graph_all_successors(): import("../../../core/graph/CoreGraphNode").CoreGraphNode[];
    };
    type(): string;
    node_context(): import("../../poly/NodeContext").NodeContext;
    displayed_input_names(): string[];
    require_webgl2(): boolean;
};
export declare class Vec4ToFloatGlNode extends Vec4ToFloatGlNode_base {
}
export declare class Vec4ToVectorGlNode extends BaseVecToGlNode {
    static type(): string;
    static readonly INPUT_NAME_VEC4 = "vec4";
    static readonly OUTPUT_NAME_VEC3 = "vec3";
    static readonly OUTPUT_NAME_W = "w";
    initialize_node(): void;
    create_params(): void;
    set_lines(shaders_collection_controller: ShadersCollectionController): void;
}
export {};
