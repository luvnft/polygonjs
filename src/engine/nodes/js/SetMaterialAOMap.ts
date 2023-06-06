/**
 * Update the material aoMap
 *
 *
 */

import {BaseSetMaterialTextureJsNode} from './_BaseSetMaterialTexture';

export class SetMaterialAOMapJsNode extends BaseSetMaterialTextureJsNode {
	static override type() {
		return 'setMaterialAOMapJsNode';
	}
	_functionName(): 'setMaterialAOMap' {
		return 'setMaterialAOMap';
	}
}
