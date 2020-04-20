import {BaseNodeGlMathFunctionArg2GlNode} from './_BaseMathFunction';
import {ConnectionPointType} from '../utils/connections/ConnectionPointType';
import {FunctionGLDefinition} from './utils/GLDefinition';

interface MathArg2Options {
	in?: [string, string];
	out?: string;
	default_in_type?: ConnectionPointType;
	allowed_in_types?: ConnectionPointType[];
	out_type?: ConnectionPointType;
	method?: string;
	functions?: string[];
}

export function MathFunctionArg2Factory(type: string, options: MathArg2Options = {}) {
	const gl_method_name = options.method || type;
	const gl_output_name = options.out || 'val';
	const gl_input_names = options.in || ['in0', 'in1'];
	const default_in_type = options.default_in_type;
	const allowed_in_types = options.allowed_in_types;
	const out_type = options.out_type;
	const functions = options.functions || [];
	return class Node extends BaseNodeGlMathFunctionArg2GlNode {
		static type() {
			return type;
		}
		initialize_node() {
			super.initialize_node();
			this.gl_connections_controller.set_input_name_function(this._gl_input_name.bind(this));
			this.gl_connections_controller.set_output_name_function(this._gl_output_name.bind(this));

			this.gl_connections_controller.set_expected_input_types_function(this._expected_input_types.bind(this));

			if (out_type) {
				this.gl_connections_controller.set_expected_output_types_function(() => [out_type]);
			}
		}
		_gl_input_name(index: number): string {
			return gl_input_names[index];
		}
		_gl_output_name(index: number): string {
			return gl_output_name;
		}
		gl_method_name(): string {
			return gl_method_name;
		}
		gl_function_definitions(): FunctionGLDefinition[] {
			if (out_type) {
				return functions.map((f) => new FunctionGLDefinition(this, out_type, f));
			} else {
				return [];
			}
		}
		protected _expected_input_types() {
			let first_input_type = this.gl_connections_controller.first_input_connection_type();
			if (first_input_type && allowed_in_types) {
				if (!allowed_in_types.includes(first_input_type)) {
					// if the first input type is not allowed, either leave the connection point as is,
					// or use the default if there is none
					const first_connection = this.io.inputs.named_input_connection_points[0];
					if (first_connection) {
						first_input_type = first_connection.type;
					} else {
						first_input_type = default_in_type;
					}
				}
			}
			const type = first_input_type || default_in_type || ConnectionPointType.FLOAT;
			return [type, type];
		}
	};
}
export class DistanceGlNode extends MathFunctionArg2Factory('distance', {
	in: ['p0', 'p1'],
	default_in_type: ConnectionPointType.VEC3,
	allowed_in_types: [ConnectionPointType.VEC2, ConnectionPointType.VEC3, ConnectionPointType.VEC4],
	out_type: ConnectionPointType.FLOAT,
}) {}
export class DotGlNode extends MathFunctionArg2Factory('dot', {
	in: ['vec0', 'vec1'],
	default_in_type: ConnectionPointType.VEC3,
	allowed_in_types: [ConnectionPointType.VEC2, ConnectionPointType.VEC3, ConnectionPointType.VEC4],
	out_type: ConnectionPointType.FLOAT,
}) {}
export class MaxGlNode extends MathFunctionArg2Factory('max') {}
export class MinGlNode extends MathFunctionArg2Factory('min') {}
export class ModGlNode extends MathFunctionArg2Factory('mod') {}
export class PowGlNode extends MathFunctionArg2Factory('pow', {in: ['x', 'y']}) {}
export class ReflectGlNode extends MathFunctionArg2Factory('reflect', {
	in: ['I', 'N'],
	default_in_type: ConnectionPointType.VEC3,
}) {}
export class StepGlNode extends MathFunctionArg2Factory('step', {in: ['edge', 'x']}) {}