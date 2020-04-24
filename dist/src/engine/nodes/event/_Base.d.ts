import { TypedNode } from '../_Base';
import { EventContainer } from '../../containers/Event';
import { NodeContext } from '../../poly/NodeContext';
import { TypedContainerController } from '../utils/ContainerController';
import { NodeParamsConfig } from '../utils/params/ParamsConfig';
import { EventContext } from '../../scene/utils/events/_BaseEventsController';
export declare class TypedEventNode<K extends NodeParamsConfig> extends TypedNode<'EVENT', BaseEventNodeType, K> {
    container_controller: TypedContainerController<EventContainer>;
    static node_context(): NodeContext;
    private _eval_all_params_on_dirty_bound;
    initialize_base_node(): void;
    node_sibbling(name: string): BaseEventNodeType | null;
    _eval_all_params_on_dirty(): void;
    process_event(event_context: EventContext<Event>): void;
}
export declare type BaseEventNodeType = TypedEventNode<any>;
export declare class BaseEventNodeClass extends TypedEventNode<any> {
}