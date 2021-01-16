import {NodeContext} from '../../poly/NodeContext';
import {NodeParamsConfig} from '../utils/params/ParamsConfig';
import {TypedNode} from '../_Base';

class ParamLessNetworkRopParamsConfig extends NodeParamsConfig {}
export class BaseNetworkRopNode<K extends NodeParamsConfig> extends TypedNode<NodeContext.ROP, K> {
	static nodeContext(): NodeContext {
		return NodeContext.ROP;
	}
	cook() {
		this.cookController.end_cook();
	}
}
export class ParamLessBaseNetworkRopNode extends BaseNetworkRopNode<ParamLessNetworkRopParamsConfig> {}