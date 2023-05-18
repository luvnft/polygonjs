import {ObjectNamedFunction2} from './_Base';
import {_matchArrayLength} from './_ArrayUtils';
import {Object3D} from 'three';
import {JsDataType} from '../nodes/utils/io/connections/Js';
import {Ref} from '@vue/reactivity';
import {CoreType} from '../../core/Type';
import {ref} from '../../core/reactivity/CoreReactivity';
import {PolyScene} from '../scene/PolyScene';

export interface ActorEvaluatorDebugOptions {
	object3D: Object3D;
	nodePath: string;
	value: JsDataType;
}
export interface DebugLine {
	objectName: string;
	value: JsDataType;
	displayableValue: string;
}

const options: ActorEvaluatorDebugOptions = {
	object3D: new Object3D(),
	nodePath: '',
	value: 0,
};

interface DebugDataController {
	lastProcessedFrameByNodePath: Map<string, number>;
	debugContentByFrameByNodePath: Ref<Record<string, DebugLine[]>>;
	// arrayByNodePath: Map<string, Array<DebugLine>>;
}
const _debugDataController: DebugDataController = {
	lastProcessedFrameByNodePath: new Map(),
	debugContentByFrameByNodePath: ref({}),
	// arrayByNodePath: new Map(),
};
// function _getarrayByNodePath(nodePath: string, controller: DebugDataController) {
// 	let array = controller.arrayByNodePath.get(nodePath);
// 	if (!array) {
// 		array = [];
// 		controller.arrayByNodePath.set(nodePath, array);
// 	}
// 	return array;
// }

function _displayableValue(value: JsDataType): string {
	try {
		if (CoreType.isBoolean(value) || CoreType.isString(value)) {
			return `${value}`;
		}
		if (CoreType.isNumber(value)) {
			return `${value.toFixed(6)}`;
		}

		if (CoreType.isColor(value)) {
			return value
				.toArray()
				.map((e) => e.toFixed(4))
				.join(', ');
		}
		if (CoreType.isVector(value)) {
			return value
				.toArray()
				.map((e) => e.toFixed(4))
				.join(', ');
		}

		if (CoreType.isArray(value)) {
			const firstElement = value[0];
			const firstElementAsString = _displayableValue(firstElement);
			return `[${firstElementAsString},...] (length: ${value.length})`;
		}

		return 'value not displayabled, see dev console';
	} catch (err) {
		console.warn('error trying to display value:', value);
		return '';
	}
}

export function tableContent(debugLines: DebugLine[]) {
	const entries = debugLines.map((debugLine, i) => {
		return {
			objectName: debugLine.objectName,
			value: debugLine.value,
		};
	});
	return entries;
}
function logBlue(message: string) {
	console.log('%c' + message, 'color:blue; font-weight:bold;');
}
function _flushDebugNode(nodePath: string, debugLines: DebugLine[]) {
	logBlue('------------');
	console.log(`${nodePath}:`);
	console.table(tableContent(debugLines));
	logBlue('------------');
}
function optionsToDebugLines(
	scene: PolyScene,
	options: ActorEvaluatorDebugOptions,
	debugDataController: DebugDataController
) {
	const {object3D, nodePath, value} = options;
	const displayableValue = _displayableValue(value);
	const objectName = object3D.name || 'no name';

	let currentValue = debugDataController.debugContentByFrameByNodePath.value[nodePath];
	if (!currentValue) {
		currentValue = []; //_getarrayByNodePath(nodePath, debugDataController);
		// currentValue.length = 0;
		debugDataController.debugContentByFrameByNodePath.value[nodePath] = currentValue;
	}

	const currentFrame = scene.frame();
	const lastProcessedFrame = debugDataController.lastProcessedFrameByNodePath.get(nodePath) || -1;
	if (!lastProcessedFrame) {
		debugDataController.lastProcessedFrameByNodePath.set(nodePath, lastProcessedFrame);
	}

	if (currentFrame != lastProcessedFrame) {
		// flush for current node
		_flushDebugNode(nodePath, currentValue);
		if (scene.dispatchController.emitAllowed()) {
			scene.dispatchController.actorEvaluatorDebug({nodePath, debugLines: currentValue});
		}
		currentValue.length = 0;

		debugDataController.lastProcessedFrameByNodePath.set(nodePath, currentFrame);
	}

	currentValue.push({
		objectName,
		value,
		displayableValue,
	});

	return currentValue;
}
function _optionsToDebugLines(scene: PolyScene, options: ActorEvaluatorDebugOptions) {
	return optionsToDebugLines(scene, options, _debugDataController);
}

export class debug<T extends JsDataType> extends ObjectNamedFunction2<[string, T]> {
	static override type() {
		return 'debug';
	}
	override func(object3D: Object3D, nodePath: string, input: T): T {
		options.object3D = object3D;
		options.nodePath = nodePath;
		options.value = input;

		_optionsToDebugLines(this.scene, options);
		return input;
	}
}