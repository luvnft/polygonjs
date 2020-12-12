import { BaseNodeType } from '../../_Base';
import { BaseParamType } from '../../../params/_Base';
import { ParamOptions } from '../../../params/utils/OptionsController';
import { CoreGraphNode } from '../../../../core/graph/CoreGraphNode';
import { FloatParam } from '../../../params/Float';
import { OperatorPathParam } from '../../../params/OperatorPath';
import { ParamType } from '../../../poly/ParamType';
import { ParamConstructorMap } from '../../../params/types/ParamConstructorMap';
import { ParamInitValuesTypeMap } from '../../../params/types/ParamInitValuesTypeMap';
import { ParamValuesTypeMap } from '../../../params/types/ParamValuesTypeMap';
import { ParamInitValueSerializedTypeMap } from '../../../params/types/ParamInitValueSerializedTypeMap';
import { ParamsLabelController } from './ParamsLabelController';
import { ParamInitData } from '../io/IOController';
export declare type OnSceneLoadHook = () => void;
declare type PostCreateParamsHook = () => void;
export interface ParamOptionToAdd<T extends ParamType> {
    name: string;
    type: T;
    init_value: ParamInitValueSerializedTypeMap[T];
    raw_input: ParamInitValueSerializedTypeMap[T];
    options?: ParamOptions;
}
export interface ParamsUpdateOptions {
    names_to_delete?: string[];
    to_add?: ParamOptionToAdd<ParamType>[];
}
export declare class ParamsController {
    readonly node: BaseNodeType;
    private _param_create_mode;
    private _params_created;
    private _params_by_name;
    private _params_list;
    private _param_names;
    private _non_spare_params;
    private _spare_params;
    private _non_spare_param_names;
    private _spare_param_names;
    private _params_node;
    private _params_added_since_last_params_eval;
    private _post_create_params_hook_names;
    private _post_create_params_hooks;
    private _on_scene_load_hooks;
    private _on_scene_load_hook_names;
    private _label_controller;
    get label(): ParamsLabelController;
    has_label_controller(): boolean;
    constructor(node: BaseNodeType);
    private init_dependency_node;
    init(): void;
    private _post_create_params;
    post_create_spare_params(): void;
    update_params(options: ParamsUpdateOptions): void;
    private init_from_params_config;
    private init_param_accessors;
    private _remove_unneeded_accessors;
    get params_node(): CoreGraphNode | undefined;
    get all(): BaseParamType[];
    get non_spare(): BaseParamType[];
    get spare(): BaseParamType[];
    get names(): string[];
    get non_spare_names(): string[];
    get spare_names(): string[];
    private set_with_type;
    set_float(param_name: string, value: ParamInitValuesTypeMap[ParamType.FLOAT]): void;
    set_vector3(param_name: string, value: ParamInitValuesTypeMap[ParamType.VECTOR3]): void;
    has_param(param_name: string): boolean;
    has(param_name: string): boolean;
    get(param_name: string): BaseParamType | null;
    param_with_type<T extends ParamType>(param_name: string, type: T): ParamConstructorMap[T] | undefined;
    get_float(param_name: string): FloatParam;
    get_operator_path(param_name: string): OperatorPathParam;
    value(param_name: string): string | number | boolean | import("three").Vector4 | import("three").Color | import("three").Vector3 | import("three").Vector2 | import("../../../../core/Walker").TypedPathParamValue | import("../../../params/ramp/RampValue").RampValue | null | undefined;
    value_with_type<T extends ParamType>(param_name: string, type: T): ParamValuesTypeMap[T];
    boolean(param_name: string): boolean;
    float(param_name: string): number;
    integer(param_name: string): number;
    string(param_name: string): string;
    vector2(param_name: string): import("three").Vector2;
    vector3(param_name: string): import("three").Vector3;
    color(param_name: string): import("three").Color;
    param(param_name: string): BaseParamType | null;
    private delete_param;
    add_param<T extends ParamType>(type: T, param_name: string, default_value: ParamInitValuesTypeMap[T], options?: ParamOptions, init_data?: ParamInitData<T>): ParamConstructorMap[T] | undefined;
    private _update_caches;
    _eval_param(param: BaseParamType): Promise<void>;
    eval_params(params: BaseParamType[]): Promise<void>;
    params_eval_required(): boolean | undefined;
    eval_all(): Promise<void>;
    on_params_created(hook_name: string, hook: PostCreateParamsHook): void;
    add_on_scene_load_hook(param_name: string, method: OnSceneLoadHook): void;
    private run_post_create_params_hooks;
    run_on_scene_load_hooks(): void;
}
export {};