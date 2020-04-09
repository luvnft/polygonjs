import {TypedPostProcessNode, TypedPostNodeContext} from './_Base';
import {FXAAShader} from '../../../../modules/three/examples/jsm/shaders/FXAAShader';
import {ShaderPass} from '../../../../modules/three/examples/jsm/postprocessing/ShaderPass';
import {IUniformV2} from '../utils/code/gl/Uniforms';

interface FXAAPassWithUniforms extends ShaderPass {
	uniforms: {
		resolution: IUniformV2;
	};
}

import {NodeParamsConfig} from '../utils/params/ParamsConfig';
class FXAAPostParamsConfig extends NodeParamsConfig {}
const ParamsConfig = new FXAAPostParamsConfig();
export class FXAAPostNode extends TypedPostProcessNode<ShaderPass, FXAAPostParamsConfig> {
	params_config = ParamsConfig;
	static type() {
		return 'fxaa';
	}

	protected _create_pass(context: TypedPostNodeContext) {
		const pass = new ShaderPass(FXAAShader) as FXAAPassWithUniforms;
		pass.uniforms.resolution.value.set(1 / context.resolution.x, 1 / context.resolution.y);
		this.update_pass(pass);

		return pass;
	}
	update_pass(pass: FXAAPassWithUniforms) {}
}
