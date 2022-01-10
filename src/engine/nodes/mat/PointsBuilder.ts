/**
 * Creates a Points Material, which can be extended with GL nodes.
 *
 * @remarks
 * This node can create children, which will be GL nodes. The GLSL code generated by the nodes will extend the Material.
 *
 */
import {NodeParamsConfig} from '../utils/params/ParamsConfig';
import {UniformsTransparencyParamConfig, UniformsTransparencyController} from './utils/UniformsTransparencyController';
import {AdvancedCommonController, AdvancedCommonParamConfig} from './utils/AdvancedCommonController';
import {ShaderAssemblerPoints} from '../gl/code/assemblers/materials/Points';
import {TypedBuilderMatNode, BaseBuilderParamConfig} from './_BaseBuilder';
import {AssemblerName} from '../../poly/registers/assemblers/_BaseRegister';
import {Poly} from '../../Poly';
import {FogParamConfig, FogController} from './utils/UniformsFogController';
import {DefaultFolderParamConfig} from './utils/DefaultFolder';
import {AdvancedFolderParamConfig} from './utils/AdvancedFolder';

interface Controllers {
	advancedCommon: AdvancedCommonController;
}
class PointsMatParamsConfig extends FogParamConfig(
	AdvancedCommonParamConfig(
		BaseBuilderParamConfig(
			/* advanced */ AdvancedFolderParamConfig(
				UniformsTransparencyParamConfig(DefaultFolderParamConfig(NodeParamsConfig))
			)
		)
	)
) {}
const ParamsConfig = new PointsMatParamsConfig();

export class PointsBuilderMatNode extends TypedBuilderMatNode<ShaderAssemblerPoints, PointsMatParamsConfig> {
	paramsConfig = ParamsConfig;
	static type() {
		return 'pointsBuilder';
	}
	public usedAssembler(): Readonly<AssemblerName.GL_POINTS> {
		return AssemblerName.GL_POINTS;
	}
	protected _create_assembler_controller() {
		return Poly.assemblersRegister.assembler(this, this.usedAssembler());
	}
	readonly controllers: Controllers = {
		advancedCommon: new AdvancedCommonController(this),
	};
	private controllerNames = Object.keys(this.controllers) as Array<keyof Controllers>;

	initializeNode() {
		this.params.onParamsCreated('init controllers', () => {
			for (let controllerName of this.controllerNames) {
				this.controllers[controllerName].initializeNode();
			}
		});
	}
	async cook() {
		for (let controllerName of this.controllerNames) {
			this.controllers[controllerName].update();
		}

		UniformsTransparencyController.update(this);
		FogController.update(this);

		this.compileIfRequired();

		this.setMaterial(this.material);
	}
}
