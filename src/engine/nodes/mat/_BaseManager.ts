import {NodeContext} from '../../poly/NodeContext';
import {NodeParamsConfig} from '../utils/params/ParamsConfig';
import {TypedNode} from '../_Base';

class ParamLessNetworkMatParamsConfig extends NodeParamsConfig {}
export class BaseNetworkMatNode<K extends NodeParamsConfig> extends TypedNode<NodeContext.MAT, K> {
	static nodeContext(): NodeContext {
		return NodeContext.MAT;
	}
	cook() {
		this.cookController.endCook();
	}
}
export class ParamLessBaseNetworkMatNode extends BaseNetworkMatNode<ParamLessNetworkMatParamsConfig> {}
