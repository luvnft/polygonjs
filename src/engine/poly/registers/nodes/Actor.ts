import {CATEGORY_ACTOR} from './Category';

import {AddActorNode} from '../../../nodes/actor/Add';
import {AnimationActionActorNode} from '../../../nodes/actor/AnimationAction';
import {AnimationActionCrossFadeActorNode} from '../../../nodes/actor/AnimationActionCrossFade';
import {AnimationActionFadeOutActorNode} from '../../../nodes/actor/AnimationActionFadeOut';
import {AnimationActionFadeInActorNode} from '../../../nodes/actor/AnimationActionFadeIn';
import {AnimationActionPlayActorNode} from '../../../nodes/actor/AnimationActionPlay';
import {AnimationActionStopActorNode} from '../../../nodes/actor/AnimationActionStop';
import {AnimationMixerActorNode} from '../../../nodes/actor/AnimationMixer';
import {AnimationMixerUpdateActorNode} from '../../../nodes/actor/AnimationMixerUpdate';
import {BoolToIntActorNode} from '../../../nodes/actor/BoolToInt';
import {CodeActorNode} from '../../../nodes/actor/Code';
import {CompareActorNode} from '../../../nodes/actor/Compare';
import {ConstantActorNode} from '../../../nodes/actor/Constant';
import {DebugActorNode} from '../../../nodes/actor/Debug';
import {DivideActorNode} from '../../../nodes/actor/Divide';
import {FloatToIntActorNode} from '../../../nodes/actor/FloatToInt';
import {FloatToVec2ActorNode} from '../../../nodes/actor/FloatToVec2';
import {FloatToVec3ActorNode} from '../../../nodes/actor/FloatToVec3';
import {FloatToVec4ActorNode} from '../../../nodes/actor/FloatToVec4';
import {GetChildrenAttributesActorNode} from '../../../nodes/actor/GetChildrenAttributes';
import {GetMaterialActorNode} from '../../../nodes/actor/GetMaterial';
import {GetObjectActorNode} from '../../../nodes/actor/GetObject';
import {GetObjectAttributeActorNode} from '../../../nodes/actor/GetObjectAttribute';
import {GetObjectPropertyActorNode} from '../../../nodes/actor/GetObjectProperty';
import {IntToFloatActorNode} from '../../../nodes/actor/IntToFloat';
import {IntToBoolActorNode} from '../../../nodes/actor/IntToBool';
import {MultActorNode} from '../../../nodes/actor/Mult';
import {MultScalarActorNode} from '../../../nodes/actor/MultScalar';
import {NullActorNode} from '../../../nodes/actor/Null';
import {OnEventChildAttributeUpdatedActorNode} from '../../../nodes/actor/OnEventChildAttributeUpdated';
import {OnEventManualTriggerActorNode} from '../../../nodes/actor/OnEventManualTrigger';
import {OnEventObjectAttributeUpdatedActorNode} from '../../../nodes/actor/OnEventObjectAttributeUpdated';
import {OnEventObjectClickedActorNode} from '../../../nodes/actor/OnEventObjectClicked';
import {OnEventObjectHoveredActorNode} from '../../../nodes/actor/OnEventObjectHovered';
import {OnEventScenePlayStateActorNode} from '../../../nodes/actor/OnEventScenePlayState';
import {OnEventSceneResetActorNode} from '../../../nodes/actor/OnEventSceneReset';
import {OnEventTickActorNode} from '../../../nodes/actor/OnEventTick';
import {OrActorNode} from '../../../nodes/actor/Or';
import {SetMaterialColorActorNode} from '../../../nodes/actor/SetMaterialColor';
import {SetObjectAttributeActorNode} from '../../../nodes/actor/SetObjectAttribute';
import {SetObjectLookAtActorNode} from '../../../nodes/actor/SetObjectLookAt';
import {SetObjectMaterialActorNode} from '../../../nodes/actor/SetObjectMaterial';
// import {SetObjectHoveredStateActorNode} from '../../../nodes/actor/SetObjectHoveredState';
import {SetObjectPositionActorNode} from '../../../nodes/actor/SetObjectPosition';
import {SetObjectRotationActorNode} from '../../../nodes/actor/SetObjectRotation';
import {SetObjectScaleActorNode} from '../../../nodes/actor/SetObjectScale';
import {SetViewerActorNode} from '../../../nodes/actor/SetViewer';
import {SubtractActorNode} from '../../../nodes/actor/Subtract';
import {PlayAnimationActorNode} from '../../../nodes/actor/PlayAnimation';
import {PlayInstrumentNoteActorNode} from '../../../nodes/actor/PlayInstrumentNote';
import {SwitchActorNode} from '../../../nodes/actor/Switch';
import {TriggerFilterActorNode} from '../../../nodes/actor/TriggerFilter';
import {TriggerTwoWaySwitchActorNode} from '../../../nodes/actor/TriggerTwoWaySwitch';
import {TwoWaySwitchActorNode} from '../../../nodes/actor/TwoWaySwitch';
import {Vec2ToFloatActorNode} from '../../../nodes/actor/Vec2ToFloat';
import {Vec2ToVec3ActorNode} from '../../../nodes/actor/Vec2ToVec3';
import {Vec3ToFloatActorNode} from '../../../nodes/actor/Vec3ToFloat';
import {Vec3ToVec4ActorNode} from '../../../nodes/actor/Vec3ToVec4';
import {Vec3ToVec2ActorNode} from '../../../nodes/actor/Vec3ToVec2';
import {Vec4ToFloatActorNode} from '../../../nodes/actor/Vec4ToFloat';
import {Vec4ToVec3ActorNode} from '../../../nodes/actor/Vec4ToVec3';
// networks
import {ActorsNetworkActorNode} from '../../../nodes/actor/ActorsNetwork';
import {AnimationsNetworkActorNode} from '../../../nodes/actor/AnimationsNetwork';
import {AudioNetworkActorNode} from '../../../nodes/actor/AudioNetwork';
import {CopNetworkActorNode} from '../../../nodes/actor/CopNetwork';
import {EventsNetworkActorNode} from '../../../nodes/actor/EventsNetwork';
import {MaterialsNetworkActorNode} from '../../../nodes/actor/MaterialsNetwork';
import {PostProcessNetworkActorNode} from '../../../nodes/actor/PostProcessNetwork';
import {RenderersNetworkActorNode} from '../../../nodes/actor/RenderersNetwork';
export interface ActorNodeChildrenMap {
	add: AddActorNode;
	animationAction: AnimationActionActorNode;
	animationActionCrossFade: AnimationActionCrossFadeActorNode;
	animationActionFadeOut: AnimationActionFadeOutActorNode;
	animationActionFadeIn: AnimationActionFadeInActorNode;
	animationActionPlay: AnimationActionPlayActorNode;
	animationActionStop: AnimationActionStopActorNode;
	animationMixer: AnimationMixerActorNode;
	animationMixerUpdate: AnimationMixerUpdateActorNode;
	boolToInt: BoolToIntActorNode;
	code: CodeActorNode;
	compare: CompareActorNode;
	constant: ConstantActorNode;
	debug: DebugActorNode;
	divide: DivideActorNode;
	floatToInt: FloatToIntActorNode;
	floatToVec2: FloatToVec2ActorNode;
	floatToVec3: FloatToVec3ActorNode;
	floatToVec4: FloatToVec4ActorNode;
	getChildrenAttributes: GetChildrenAttributesActorNode;
	getMaterial: GetMaterialActorNode;
	getObject: GetObjectActorNode;
	getObjectAttribute: GetObjectAttributeActorNode;
	getObjectProperty: GetObjectPropertyActorNode;
	intToBool: IntToBoolActorNode;
	intToFloat: IntToFloatActorNode;
	mult: MultActorNode;
	multScalar: MultScalarActorNode;
	null: NullActorNode;
	onEventChildAttributeUpdated: OnEventChildAttributeUpdatedActorNode;
	onEventManualTrigger: OnEventManualTriggerActorNode;
	onEventObjectAttributeUpdated: OnEventObjectAttributeUpdatedActorNode;
	onEventObjectClicked: OnEventObjectClickedActorNode;
	onEventObjectHovered: OnEventObjectHoveredActorNode;
	onEventScenePlayState: OnEventScenePlayStateActorNode;
	onEventSceneReset: OnEventSceneResetActorNode;
	onEventTick: OnEventTickActorNode;
	or: OrActorNode;
	setMaterialColor: SetMaterialColorActorNode;
	// setObjectHoveredState: SetObjectHoveredStateActorNode;
	setObjectAttribute: SetObjectAttributeActorNode;
	setObjectLookAt: SetObjectLookAtActorNode;
	setObjectMaterial: SetObjectMaterialActorNode;
	setObjectPosition: SetObjectPositionActorNode;
	setObjectRotation: SetObjectRotationActorNode;
	setObjectScale: SetObjectScaleActorNode;
	playAnimation: PlayAnimationActorNode;
	playInstrumentNote: PlayInstrumentNoteActorNode;
	setViewer: SetViewerActorNode;
	subtract: SubtractActorNode;
	switch: SwitchActorNode;
	triggerFilter: TriggerFilterActorNode;
	triggerTwoWaySwitch: TriggerTwoWaySwitchActorNode;
	twoWaySwitch: TwoWaySwitchActorNode;
	vec2ToFloat: Vec2ToFloatActorNode;
	vec2ToVec3: Vec2ToVec3ActorNode;
	vec3ToFloat: Vec3ToFloatActorNode;
	vec3ToVec2: Vec3ToVec2ActorNode;
	vec3ToVec4: Vec3ToVec4ActorNode;
	vec4ToFloat: Vec4ToFloatActorNode;
	vec4ToVec3: Vec4ToVec3ActorNode;
	// networks
	actorsNetwork: ActorsNetworkActorNode;
	animationsNetwork: AnimationsNetworkActorNode;
	audioNetwork: AudioNetworkActorNode;
	copNetwork: CopNetworkActorNode;
	eventsNetwork: EventsNetworkActorNode;
	materialsNetwork: MaterialsNetworkActorNode;
	postProcessNetwork: PostProcessNetworkActorNode;
	renderersNetwork: RenderersNetworkActorNode;
}

import {PolyEngine} from '../../../Poly';
export class ActorRegister {
	static run(poly: PolyEngine) {
		poly.registerNode(AddActorNode, CATEGORY_ACTOR.MATH);
		poly.registerNode(AnimationActionActorNode, CATEGORY_ACTOR.ANIMATION);
		poly.registerNode(AnimationActionCrossFadeActorNode, CATEGORY_ACTOR.ANIMATION);
		poly.registerNode(AnimationActionFadeOutActorNode, CATEGORY_ACTOR.ANIMATION);
		poly.registerNode(AnimationActionFadeInActorNode, CATEGORY_ACTOR.ANIMATION);
		poly.registerNode(AnimationActionPlayActorNode, CATEGORY_ACTOR.ANIMATION);
		poly.registerNode(AnimationActionStopActorNode, CATEGORY_ACTOR.ANIMATION);
		poly.registerNode(AnimationMixerActorNode, CATEGORY_ACTOR.ANIMATION);
		poly.registerNode(AnimationMixerUpdateActorNode, CATEGORY_ACTOR.ANIMATION);
		poly.registerNode(BoolToIntActorNode, CATEGORY_ACTOR.ADVANCED);
		poly.registerNode(CodeActorNode, CATEGORY_ACTOR.ADVANCED);
		poly.registerNode(CompareActorNode, CATEGORY_ACTOR.LOGIC);
		poly.registerNode(ConstantActorNode, CATEGORY_ACTOR.MISC);
		poly.registerNode(DebugActorNode, CATEGORY_ACTOR.MISC);
		poly.registerNode(DivideActorNode, CATEGORY_ACTOR.MATH);
		poly.registerNode(FloatToIntActorNode, CATEGORY_ACTOR.MATH);
		poly.registerNode(FloatToVec2ActorNode, CATEGORY_ACTOR.CONVERSION);
		poly.registerNode(FloatToVec3ActorNode, CATEGORY_ACTOR.CONVERSION);
		poly.registerNode(FloatToVec4ActorNode, CATEGORY_ACTOR.CONVERSION);
		poly.registerNode(GetChildrenAttributesActorNode, CATEGORY_ACTOR.GET);
		poly.registerNode(GetMaterialActorNode, CATEGORY_ACTOR.GET);
		poly.registerNode(GetObjectActorNode, CATEGORY_ACTOR.GET);
		poly.registerNode(GetObjectAttributeActorNode, CATEGORY_ACTOR.GET);
		poly.registerNode(GetObjectPropertyActorNode, CATEGORY_ACTOR.GET);
		poly.registerNode(IntToBoolActorNode, CATEGORY_ACTOR.GET);
		poly.registerNode(IntToFloatActorNode, CATEGORY_ACTOR.GET);
		poly.registerNode(OnEventManualTriggerActorNode, CATEGORY_ACTOR.EVENTS);
		poly.registerNode(MultActorNode, CATEGORY_ACTOR.MATH);
		poly.registerNode(MultScalarActorNode, CATEGORY_ACTOR.MATH);
		poly.registerNode(NullActorNode, CATEGORY_ACTOR.MISC);
		poly.registerNode(OnEventChildAttributeUpdatedActorNode, CATEGORY_ACTOR.EVENTS);
		poly.registerNode(OnEventObjectAttributeUpdatedActorNode, CATEGORY_ACTOR.EVENTS);
		poly.registerNode(OnEventObjectClickedActorNode, CATEGORY_ACTOR.EVENTS);
		poly.registerNode(OnEventObjectHoveredActorNode, CATEGORY_ACTOR.EVENTS);
		poly.registerNode(OnEventScenePlayStateActorNode, CATEGORY_ACTOR.EVENTS);
		poly.registerNode(OnEventSceneResetActorNode, CATEGORY_ACTOR.EVENTS);
		poly.registerNode(OnEventTickActorNode, CATEGORY_ACTOR.EVENTS);
		poly.registerNode(OrActorNode, CATEGORY_ACTOR.LOGIC);
		poly.registerNode(PlayAnimationActorNode, CATEGORY_ACTOR.ANIMATION);
		poly.registerNode(PlayInstrumentNoteActorNode, CATEGORY_ACTOR.AUDIO);
		poly.registerNode(SetMaterialColorActorNode, CATEGORY_ACTOR.AUDIO);
		// poly.registerNode(SetObjectHoveredStateActorNode, CATEGORY_ACTOR.SET);
		poly.registerNode(SetObjectAttributeActorNode, CATEGORY_ACTOR.SET);
		poly.registerNode(SetObjectLookAtActorNode, CATEGORY_ACTOR.SET);
		poly.registerNode(SetObjectMaterialActorNode, CATEGORY_ACTOR.SET);
		poly.registerNode(SetObjectPositionActorNode, CATEGORY_ACTOR.SET);
		poly.registerNode(SetObjectRotationActorNode, CATEGORY_ACTOR.SET);
		poly.registerNode(SetObjectScaleActorNode, CATEGORY_ACTOR.SET);
		poly.registerNode(SubtractActorNode, CATEGORY_ACTOR.MATH);
		poly.registerNode(SwitchActorNode, CATEGORY_ACTOR.LOGIC);
		poly.registerNode(SetViewerActorNode, CATEGORY_ACTOR.MISC);
		poly.registerNode(TriggerFilterActorNode, CATEGORY_ACTOR.LOGIC);
		poly.registerNode(TriggerTwoWaySwitchActorNode, CATEGORY_ACTOR.LOGIC);
		poly.registerNode(TwoWaySwitchActorNode, CATEGORY_ACTOR.LOGIC);
		poly.registerNode(Vec2ToFloatActorNode, CATEGORY_ACTOR.CONVERSION);
		poly.registerNode(Vec2ToVec3ActorNode, CATEGORY_ACTOR.CONVERSION);
		poly.registerNode(Vec3ToFloatActorNode, CATEGORY_ACTOR.CONVERSION);
		poly.registerNode(Vec3ToVec2ActorNode, CATEGORY_ACTOR.CONVERSION);
		poly.registerNode(Vec3ToVec4ActorNode, CATEGORY_ACTOR.CONVERSION);
		poly.registerNode(Vec4ToFloatActorNode, CATEGORY_ACTOR.CONVERSION);
		poly.registerNode(Vec4ToVec3ActorNode, CATEGORY_ACTOR.CONVERSION);

		// networks
		poly.registerNode(ActorsNetworkActorNode, CATEGORY_ACTOR.NETWORK);
		poly.registerNode(AnimationsNetworkActorNode, CATEGORY_ACTOR.NETWORK);
		poly.registerNode(AudioNetworkActorNode, CATEGORY_ACTOR.NETWORK);
		poly.registerNode(CopNetworkActorNode, CATEGORY_ACTOR.NETWORK);
		poly.registerNode(EventsNetworkActorNode, CATEGORY_ACTOR.NETWORK);
		poly.registerNode(MaterialsNetworkActorNode, CATEGORY_ACTOR.NETWORK);
		poly.registerNode(PostProcessNetworkActorNode, CATEGORY_ACTOR.NETWORK);
		poly.registerNode(RenderersNetworkActorNode, CATEGORY_ACTOR.NETWORK);
	}
}
