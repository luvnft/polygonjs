import { TypedNumericParam } from './_Numeric';
import { ParamType } from '../poly/ParamType';
import { ParamInitValuesTypeMap } from './types/ParamInitValuesTypeMap';
import { ParamValuesTypeMap } from './types/ParamValuesTypeMap';
export declare class IntegerParam extends TypedNumericParam<ParamType.INTEGER> {
    static type(): ParamType;
    get default_value_serialized(): string | number;
    get raw_input_serialized(): string | number;
    get value_serialized(): number;
    static are_raw_input_equal(raw_input1: ParamInitValuesTypeMap[ParamType.INTEGER], raw_input2: ParamInitValuesTypeMap[ParamType.INTEGER]): boolean;
    static are_values_equal(val1: ParamValuesTypeMap[ParamType.INTEGER], val2: ParamValuesTypeMap[ParamType.INTEGER]): boolean;
    static convert(raw_val: ParamInitValuesTypeMap[ParamType.INTEGER]): number | null;
    convert(raw_val: ParamInitValuesTypeMap[ParamType.INTEGER]): number | null;
}
