import {CATEGORY_OBJ} from "./Category";
import {AmbientLightObjNode} from "../../../nodes/obj/AmbientLight";
import {AreaLightObjNode} from "../../../nodes/obj/AreaLight";
import {DirectionalLightObjNode} from "../../../nodes/obj/DirectionalLight";
import {HemisphereLightObjNode} from "../../../nodes/obj/HemisphereLight";
import {PointLightObjNode} from "../../../nodes/obj/PointLight";
import {SpotLightObjNode} from "../../../nodes/obj/SpotLight";
import {AnimationsObjNode} from "../../../nodes/obj/Animations";
import {CopObjNode} from "../../../nodes/obj/Cop";
import {EventsObjNode} from "../../../nodes/obj/Events";
import {MaterialsObjNode} from "../../../nodes/obj/Materials";
import {PostProcessObjNode} from "../../../nodes/obj/PostProcess";
import {RenderersObjNode} from "../../../nodes/obj/Renderers";
import {BlendObjNode} from "../../../nodes/obj/Blend";
import {GeoObjNode} from "../../../nodes/obj/Geo";
import {NullObjNode} from "../../../nodes/obj/Null";
import {PolyObjNode} from "../../../nodes/obj/Poly";
import {RivetObjNode} from "../../../nodes/obj/Rivet";
import {SceneObjNode} from "../../../nodes/obj/Scene";
import {OrthographicCameraObjNode} from "../../../nodes/obj/OrthographicCamera";
import {PerspectiveCameraObjNode} from "../../../nodes/obj/PerspectiveCamera";
import {MapboxCameraObjNode} from "../../../nodes/obj/MapboxCamera";
export class ObjRegister {
  static run(poly) {
    poly.registerNode(AmbientLightObjNode, CATEGORY_OBJ.LIGHT);
    poly.registerNode(AreaLightObjNode, CATEGORY_OBJ.LIGHT);
    poly.registerNode(DirectionalLightObjNode, CATEGORY_OBJ.LIGHT);
    poly.registerNode(HemisphereLightObjNode, CATEGORY_OBJ.LIGHT);
    poly.registerNode(PointLightObjNode, CATEGORY_OBJ.LIGHT);
    poly.registerNode(SpotLightObjNode, CATEGORY_OBJ.LIGHT);
    poly.registerNode(AnimationsObjNode, CATEGORY_OBJ.NETWORK);
    poly.registerNode(CopObjNode, CATEGORY_OBJ.NETWORK);
    poly.registerNode(EventsObjNode, CATEGORY_OBJ.NETWORK);
    poly.registerNode(MaterialsObjNode, CATEGORY_OBJ.NETWORK);
    poly.registerNode(PostProcessObjNode, CATEGORY_OBJ.NETWORK);
    poly.registerNode(RenderersObjNode, CATEGORY_OBJ.NETWORK);
    poly.registerNode(BlendObjNode, CATEGORY_OBJ.TRANSFORM);
    poly.registerNode(GeoObjNode, CATEGORY_OBJ.GEOMETRY);
    poly.registerNode(NullObjNode, CATEGORY_OBJ.TRANSFORM);
    poly.registerNode(PolyObjNode, CATEGORY_OBJ.ADVANCED);
    poly.registerNode(RivetObjNode, CATEGORY_OBJ.TRANSFORM);
    poly.registerNode(SceneObjNode, CATEGORY_OBJ.ADVANCED);
    poly.registerNode(MapboxCameraObjNode, CATEGORY_OBJ.CAMERA);
    poly.registerNode(OrthographicCameraObjNode, CATEGORY_OBJ.CAMERA);
    poly.registerNode(PerspectiveCameraObjNode, CATEGORY_OBJ.CAMERA);
  }
}