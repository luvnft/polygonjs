export const FUNCTION_NAME_BY_FILE_NAME: Record<string, string[]> = {
	Add: ['addNumber', 'addVector', 'addVectorNumber'],
	Animation: ['playAnimation'],
	AnimationMixer: [
		'getAnimationMixer',
		'animationMixerUpdate',
		'getAnimationAction',
		'animationActionCrossFade',
		'animationActionFadeIn',
		'animationActionFadeOut',
		'animationActionPlay',
		'animationActionStop',
	],
	Array: [
		'arrayLength',
		'elementsToArrayPrimitive',
		'elementsToArrayVector',
		'arrayElementPrimitive',
		'arrayElementVector',
	],
	Audio: ['addAudioStopEventListener', 'playAudioSource', 'pauseAudioSource', 'playInstrumentNote'],
	Box3: ['box3Set', 'getBox3Min', 'getBox3Max'],
	Camera: ['setPerspectiveCameraFov', 'setPerspectiveCameraNearFar', 'getDefaultCamera'],
	Cloth: [
		'clothSolverReset',
		'clothSolverSetSelectedVertexIndex',
		'clothSolverSetSelectedVertexPosition',
		'clothSolverStepSimulation',
		'clothSolverUpdateMaterial',
	],
	Color: ['colorSetRGB'],
	CookNode: ['cookNode'],
	Conversion: [
		'boolToInt',
		'intToBool',
		'floatToInt',
		'intToFloat',
		'colorToVec3',
		'floatToColor',
		'floatToVec2',
		'floatToVec3',
		'floatToVec4',
		'vec2ToVec3',
		'vec3ToColor',
		'vec3ToVec4',
	],
	Curve: ['catmullRomCurve3GetPoint'],
	Debug: ['debug'],
	Divide: ['divideNumber', 'divideVectorNumber'],
	Easing: [
		'easeI2',
		'easeO2',
		'easeIO2',
		'easeI3',
		'easeO3',
		'easeIO3',
		'easeI4',
		'easeO4',
		'easeIO4',
		'easeSinI',
		'easeSinO',
		'easeSinIO',
		'easeElasticI',
		'easeElasticO',
		'easeElasticIO',
	],
	Geometry: ['setGeometryPositions'],
	GetActorNodeParamValue: ['getActorNodeParamValue'],
	GetChildrenAttributes: ['getChildrenAttributes'],
	GetChildrenAttributesRef: ['getChildrenAttributesRef'],
	GetChildrenAttributesPrevious: ['getChildrenAttributesPrevious'],
	GetIntersectionAttribute: [
		'getIntersectionAttributeNumberNearest',
		'getIntersectionAttributeColorNearest',
		'getIntersectionAttributeStringNearest',
		'getIntersectionAttributeVector2Nearest',
		'getIntersectionAttributeVector3Nearest',
		'getIntersectionAttributeVector4Nearest',
		'getIntersectionAttributeNumberInterpolated',
		'getIntersectionAttributeColorInterpolated',
		'getIntersectionAttributeVector2Interpolated',
		'getIntersectionAttributeVector3Interpolated',
		'getIntersectionAttributeVector4Interpolated',
	],
	GetIntersectionProperty: [
		'getIntersectionPropertyDistance',
		'getIntersectionPropertyNormal',
		'getIntersectionPropertyObject',
		'getIntersectionPropertyPoint',
		'getIntersectionPropertyUv',
	],
	GetObject: ['getObject'],
	GetObjectAttribute: ['getObjectAttribute'],
	GetObjectAttributePrevious: ['getObjectAttributePrevious'],
	GetObjectAttributeRef: ['getObjectAttributeRef'],
	GetObjectChild: ['getObjectChild'],
	GetObjectHoveredState: ['getObjectHoveredIntersection', 'getObjectHoveredState'],
	GetObjectProperty: [
		'getObjectProperty',
		'getObjectWorldPosition',
		'object3DLocalToWorld',
		'object3DWorldToLocal',
		'getChildrenPropertiesCastShadow',
		'getChildrenPropertiesFrustumCulled',
		'getChildrenPropertiesMatrixAutoUpdate',
		'getChildrenPropertiesPosition',
		'getChildrenPropertiesQuaternion',
		'getChildrenPropertiesReceiveShadow',
		'getChildrenPropertiesScale',
		'getChildrenPropertiesUp',
		'getChildrenPropertiesVisible',
	],
	GetObjectUserData: ['getObjectUserData'],
	GetParent: ['getParent'],
	GetSceneObject: ['getMaterial', 'getTexture'],
	GetSibbling: ['getSibbling'],
	Globals: ['globalsTime', 'globalsTimeDelta', 'globalsRaycaster', 'globalsRayFromCursor', 'globalsCursor'],
	Instance: [
		'setGeometryInstancePositions',
		'setGeometryInstanceQuaternions',
		'setGeometryInstanceScales',
		'setGeometryInstanceTransforms',
		'setGeometryInstanceAttributeFloat',
		'setGeometryInstanceAttributeVector2',
		'setGeometryInstanceAttributeVector3',
		'setGeometryInstanceAttributeVector4',
		'setGeometryInstanceAttributeQuaternion',
		'setGeometryInstanceAttributeColor',
	],
	KeyboardEventMatchesConfig: ['keyboardEventMatchesConfig'],
	Lerp: ['lerpColor', 'lerpNumber', 'lerpQuaternion', 'lerpVector2', 'lerpVector3', 'lerpVector4'],
	Light: ['setSpotLightIntensity'],
	Logic: ['andArrays', 'andBooleans', 'orArrays', 'orBooleans'],
	Material: [
		'setObjectMaterial',
		'setObjectMaterialColor',
		'setMaterialColor',
		'setMaterialEmissiveColor',
		'setMaterialOpacity',
		'setMaterialUniformNumber',
		'setMaterialUniformVectorColor',
	],
	MathGeneric: [
		'mathColor_1',
		'mathColor_2',
		'mathColor_3',
		'mathColor_3vvf',
		'mathColor_4',
		'mathColor_5',
		'mathFloat_1',
		'mathFloat_2',
		'mathFloat_3',
		'mathFloat_4',
		'mathFloat_5',
		'mathPrimArray_1',
		'mathPrimArray_2',
		'mathPrimArray_3',
		'mathPrimArray_4',
		'mathPrimArray_5',
		'mathVector2_1',
		'mathVector2_2',
		'mathVector2_3',
		'mathVector2_3vvf',
		'mathVector2_4',
		'mathVector2_5',
		'mathVector3_1',
		'mathVector3_2',
		'mathVector3_3',
		'mathVector3_3vvf',
		'mathVector3_4',
		'mathVector3_5',
		'mathVector4_1',
		'mathVector4_2',
		'mathVector4_3',
		'mathVector4_3vvf',
		'mathVector4_4',
		'mathVector4_5',
		'mathVectorArray_1',
		'mathVectorArray_2',
		'mathVectorArray_3',
		'mathVectorArray_4',
		'mathVectorArray_5',
	],
	Math: ['clamp', 'complement', 'fit', 'fitClamp', 'mix', 'mod', 'multAdd', 'negate', 'rand', 'random', 'smoothstep'],
	Mult: ['multNumber', 'multVector', 'multVectorNumber'],
	MultScalar: [
		'multScalarArrayVectorArray',
		'multScalarColor',
		'multScalarVector2',
		'multScalarVector3',
		'multScalarVector4',
		'multScalarVectorArray',
	],
	NearestPosition: ['nearestPosition'],
	ObjectDispatchEvent: ['objectDispatchEvent', 'getObjectLastDispatchedEventName', 'objectAddEventListeners'],
	Param: [
		'setParamBoolean',
		'setParamBooleanToggle',
		'setParamColor',
		'setParamFloat',
		'setParamInteger',
		'setParamString',
		'setParamVector2',
		'setParamVector3',
		'setParamVector4',
		'pressButtonParam',
	],
	ParticlesSystem: ['particlesSystemReset', 'particlesSystemStepSimulation'],
	Performance: ['onPerformanceChange'],
	Plane: ['planeSet', 'getPlaneNormal', 'getPlaneConstant'],
	PreviousValue: [
		'previousValuePrimitive',
		'previousValueColor',
		'previousValueVector2',
		'previousValueVector3',
		'previousValueVector4',
	],
	Ray: [
		'raySet',
		'rayFromCamera',
		'getRayDirection',
		'getRayOrigin',
		'rayIntersectBox3',
		'rayIntersectsBox3',
		'rayIntersectObject3D',
		'rayIntersectsObject3D',
		'rayIntersectPlane',
		'rayIntersectsPlane',
		'rayDistanceToPlane',
		'rayIntersectSphere',
		'rayIntersectsSphere',
	],
	Render: ['cursorToUv', 'renderPixel'],
	Physics: [
		'physicsWorldReset',
		'physicsWorldStepSimulation',
		// get shape
		'getPhysicsRBDCapsuleRadius',
		'getPhysicsRBDCapsuleHeight',
		'getPhysicsRBDConeRadius',
		'getPhysicsRBDConeHeight',
		'getPhysicsRBDCuboidSizes',
		'getPhysicsRBDCylinderRadius',
		'getPhysicsRBDCylinderHeight',
		'getPhysicsRBDSphereRadius',
		// set shape
		'setPhysicsRBDCapsuleProperty',
		'setPhysicsRBDConeProperty',
		'setPhysicsRBDCuboidProperty',
		'setPhysicsRBDCylinderProperty',
		'setPhysicsRBDSphereProperty',
		// get RBD
		'getPhysicsRBDAngularVelocity',
		'getPhysicsRBDLinearVelocity',
		'getPhysicsRBDAngularDamping',
		'getPhysicsRBDLinearDamping',
		'getPhysicsRBDIsSleeping',
		'getPhysicsRBDIsMoving',
		// get Children RBD,
		'getChildrenPhysicsRBDPropertiesAngularDamping',
		'getChildrenPhysicsRBDPropertiesAngularVelocity',
		'getChildrenPhysicsRBDPropertiesIsMoving',
		'getChildrenPhysicsRBDPropertiesIsSleeping',
		'getChildrenPhysicsRBDPropertiesLinearDamping',
		'getChildrenPhysicsRBDPropertiesLinearVelocity',
		// set RBD
		'setPhysicsRBDPosition',
		'setPhysicsRBDRotation',
		'setPhysicsRBDAngularVelocity',
		'setPhysicsRBDLinearVelocity',
		// set world
		'setPhysicsWorldGravity',
		// forces
		'physicsRBDAddForce',
		'physicsRBDAddForceAtPoint',
		'physicsRBDAddTorque',
		'physicsRBDApplyImpulse',
		'physicsRBDApplyImpulseAtPoint',
		'physicsRBDApplyTorqueImpulse',
		'physicsRBDRemove',
		'physicsRBDResetAll',
		'physicsRBDResetForces',
		'physicsRBDResetTorques',
	],
	PlayerPhysics: ['playerPhysicsUpdate'],
	PlayerSimple: ['playerSimpleUpdate', 'getPlayerSimplePropertyOnGround', 'getPlayerSimplePropertyVelocity'],
	Sizzle: ['sizzleVec3XY', 'sizzleVec3XZ', 'sizzleVec3YZ', 'sizzleVec4XYZ', 'sizzleVec4WArray', 'sizzleVec4XYZArray'],
	Subtract: ['subtractNumber', 'subtractVector', 'subtractVectorNumber'],
	SDFOperations: [
		'SDFUnion',
		'SDFSubtract',
		'SDFIntersect',
		'SDFSmoothUnion',
		'SDFSmoothSubtract',
		'SDFSmoothIntersect',
	],
	SDFOperations2D: ['SDFRevolutionX', 'SDFRevolutionY', 'SDFRevolutionZ'],
	SDFPrimitives: ['SDFSphere', 'SDFBox'],
	SDFPrimitives2D: ['SDFRoundedX'],
	SetObjectAttribute: ['setObjectAttribute'],
	SetObjectLookAt: ['setObjectLookAt'],
	SetObjectPolarTransform: ['setObjectPolarTransform'],
	SetObjectPosition: ['setObjectPosition'],
	SetObjectRotation: ['setObjectRotation'],
	SetObjectProperty: [
		'setObjectCastShadow',
		'setObjectFrustumCulled',
		'setObjectMatrix',
		'setObjectMatrixAutoUpdate',
		'setObjectReceiveShadow',
		'setObjectVisible',
		'objectUpdateMatrix',
		'objectUpdateWorldMatrix',
	],
	SetObjectScale: ['setObjectScale'],
	SetPlayerInput: [
		'setPlayerInput',
		'getPlayerInputDataLeft',
		'getPlayerInputDataRight',
		'getPlayerInputDataBackward',
		'getPlayerInputDataForward',
		'getPlayerInputDataJump',
		'getPlayerInputDataRun',
	],
	Sleep: ['sleep'],
	Sphere: ['sphereSet', 'getSphereCenter', 'getSphereRadius'],
	TrackingFace: ['trackFace', 'trackFaceGetLandmarks'],
	TrackingHand: [
		'trackHand',
		'trackHandGetNormalizedLandmarks',
		'trackHandGetWorldLandmarks',
		'getTrackedHandIndexDirection',
		'getTrackedHandMiddleDirection',
		'getTrackedHandPinkyDirection',
		'getTrackedHandRingDirection',
		'getTrackedHandThumbDirection',
	],
	Trigger: ['triggerFilter', 'triggerTwoWaySwitch'],
	Vector: ['vector3AngleTo', 'vector3Project', 'vector3ProjectOnPlane', 'vector3Unproject'],
	VectorCross: ['crossVector2', 'crossVector3'],
	VectorDistance: ['distanceVector2', 'distanceVector3'],
	VectorDot: ['dotVector2', 'dotVector3'],
	VectorLength: ['lengthVector', 'lengthVectorArray'],
	VectorManhattanDistance: ['manhattanDistanceVector2', 'manhattanDistanceVector3'],
	VectorMaxLength: ['maxLengthVector2', 'maxLengthVector3', 'maxLengthVector4'],
	VectorNormalize: ['normalizeVector2', 'normalizeVector3', 'normalizeVector4'],
	Video: [
		'addVideoEventListener',
		'getVideoPropertyCurrentTime',
		'getVideoPropertyDuration',
		'getVideoPropertyMuted',
		'getVideoPropertyPlaying',
	],
	Viewer: ['setViewer'],
	WebXR: [
		'getWebXRARHitDetected',
		'getWebXRARHitMatrix',
		'getWebXRARHitPosition',
		'getWebXRARHitQuaternion',
		'getWebXRControllerObject',
		'getWebXRControllerRay',
		'getWebXRControllerHasLinearVelocity',
		'getWebXRControllerLinearVelocity',
		'getWebXRControllerHasAngularVelocity',
		'getWebXRControllerAngularVelocity',
		'getWebXRTrackedMarkerMatrix',
	],
};
