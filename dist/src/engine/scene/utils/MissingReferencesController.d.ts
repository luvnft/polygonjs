import { BaseNodeType } from '../../nodes/_Base';
import { BaseParamType } from '../../params/_Base';
import { MissingExpressionReference } from '../../expressions/MissingReference';
import jsep from 'jsep';
export declare class MissingReferencesController {
    private references;
    register(param: BaseParamType, jsep_node: jsep.Expression, path_argument: string): MissingExpressionReference;
    deregister_param(param: BaseParamType): void;
    check_for_missing_references(node: BaseNodeType): void;
    private _check_for_missing_references_for_node;
    private _check_for_missing_references_for_param;
}
