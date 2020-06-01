import { TypedEventNode } from './_Base';
import { RaycastCPUController } from './utils/raycast/CPUController';
import { RaycastGPUController } from './utils/raycast/GPUController';
import { NodeParamsConfig } from '../utils/params/ParamsConfig';
import { ParamType } from '../../poly/ParamType';
declare class RaycastParamsConfig extends NodeParamsConfig {
    mode: import("../utils/params/ParamsConfig").ParamTemplate<ParamType.INTEGER>;
    mouse: import("../utils/params/ParamsConfig").ParamTemplate<ParamType.VECTOR2>;
    override_camera: import("../utils/params/ParamsConfig").ParamTemplate<ParamType.BOOLEAN>;
    override_ray: import("../utils/params/ParamsConfig").ParamTemplate<ParamType.BOOLEAN>;
    camera: import("../utils/params/ParamsConfig").ParamTemplate<ParamType.OPERATOR_PATH>;
    ray_origin: import("../utils/params/ParamsConfig").ParamTemplate<ParamType.VECTOR3>;
    ray_direction: import("../utils/params/ParamsConfig").ParamTemplate<ParamType.VECTOR3>;
    material: import("../utils/params/ParamsConfig").ParamTemplate<ParamType.OPERATOR_PATH>;
    pixel_value: import("../utils/params/ParamsConfig").ParamTemplate<ParamType.VECTOR4>;
    hit_threshold: import("../utils/params/ParamsConfig").ParamTemplate<ParamType.FLOAT>;
    intersect_with: import("../utils/params/ParamsConfig").ParamTemplate<ParamType.INTEGER>;
    plane_direction: import("../utils/params/ParamsConfig").ParamTemplate<ParamType.VECTOR3>;
    plane_offset: import("../utils/params/ParamsConfig").ParamTemplate<ParamType.FLOAT>;
    target: import("../utils/params/ParamsConfig").ParamTemplate<ParamType.OPERATOR_PATH>;
    traverse_children: import("../utils/params/ParamsConfig").ParamTemplate<ParamType.BOOLEAN>;
    sep: import("../utils/params/ParamsConfig").ParamTemplate<ParamType.SEPARATOR>;
    tposition_target: import("../utils/params/ParamsConfig").ParamTemplate<ParamType.BOOLEAN>;
    position: import("../utils/params/ParamsConfig").ParamTemplate<ParamType.VECTOR3>;
    position_target: import("../utils/params/ParamsConfig").ParamTemplate<ParamType.OPERATOR_PATH>;
    geo_attribute: import("../utils/params/ParamsConfig").ParamTemplate<ParamType.BOOLEAN>;
    geo_attribute_name: import("../utils/params/ParamsConfig").ParamTemplate<ParamType.STRING>;
    geo_attribute_value: import("../utils/params/ParamsConfig").ParamTemplate<ParamType.FLOAT>;
}
export declare class RaycastEventNode extends TypedEventNode<RaycastParamsConfig> {
    params_config: RaycastParamsConfig;
    static type(): string;
    readonly cpu_controller: RaycastCPUController;
    readonly gpu_controller: RaycastGPUController;
    initialize_node(): void;
    trigger_hit(): void;
    trigger_miss(): void;
    private _process_mouse_event;
    private _process_trigger_event;
}
export {};
