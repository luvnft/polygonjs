import {PolyScene} from './scene/PolyScene';
import {SceneJsonImporter} from './io/json/import/Scene';
import {SceneDataManifestImporter, mountScene} from './io/manifest/import/SceneData';
import {ScenePlayerImporter} from './io/player/Scene';
ScenePlayerImporter;
import {Poly} from './Poly';
import {AllRegister} from './poly/registers/All';
AllRegister.run();

export {PolyScene, Poly, SceneJsonImporter, SceneDataManifestImporter, mountScene, ScenePlayerImporter};
