import {Poly} from '../../../engine/Poly';
import {CoreBaseLoader} from './../_Base';
import {FontLoader} from './FontLoader';
import {Font, FontData} from './Font';
import {BaseNodeType} from '../../../engine/nodes/_Base';
import {SVGLoader} from '../../../modules/three/examples/jsm/loaders/SVGLoader';
import {TTFLoader} from '../../../modules/three/examples/jsm/loaders/TTFLoader';

export class CoreLoaderFont extends CoreBaseLoader {
	private _fontLoader: FontLoader;

	constructor(url: string, _node?: BaseNodeType) {
		super(url, _node);

		this._fontLoader = new FontLoader(this.loadingManager);
	}

	async load() {
		if (this._node) {
			Poly.blobs.clearBlobsForNode(this._node);
		}
		const ext = this.extension();
		const url = await this._urlToLoad();
		switch (ext) {
			case 'ttf': {
				return this._loadTTF(url);
			}
			case 'json': {
				return this._loadJSON(url);
			}
			default: {
				return null;
			}
		}
	}

	private _loadTTF(url: string): Promise<Font> {
		return new Promise(async (resolve, reject) => {
			const loadedModule = await this._loadTTFLoader();
			if (!loadedModule) {
				return;
			}
			loadedModule.load(
				url,
				(fnt: object) => {
					const parsed = this._fontLoader.parse(fnt as FontData);
					resolve(parsed);
				},
				undefined,
				() => {
					reject();
				}
			);
		});
	}
	private _loadJSON(url: string): Promise<Font> {
		return new Promise((resolve, reject) => {
			this._fontLoader.load(
				url,
				(font: Font) => {
					resolve(font);
				},
				undefined,
				() => {
					reject();
				}
			);
		});
	}

	private async _loadTTFLoader() {
		return new TTFLoader(this.loadingManager);
	}
	static async loadSVGLoader() {
		return SVGLoader;
	}
}