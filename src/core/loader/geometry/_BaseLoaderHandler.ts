import {BufferGeometry, Object3D} from 'three';
import {BaseNodeType} from '../../../engine/nodes/_Base';
import type {GLTF} from '../../../modules/three/examples/jsm/loaders/GLTFLoader';
import type {PDB} from '../../../modules/three/examples/jsm/loaders/PDBLoader';
import {CoreLoaderGeometry} from '../Geometry';
import {CoreBaseLoader} from '../_Base';

export type BaseGeoLoaderOutput = Object3D | BufferGeometry | PDB | GLTF;

type OnSuccess<O extends BaseGeoLoaderOutput> = (o: O) => void;
type OnProgress = (n: ProgressEvent<EventTarget>) => void;
type OnError = (event: any) => void;

export abstract class BaseGeoLoader<O extends BaseGeoLoaderOutput> {
	abstract load: (url: string, onSuccess: OnSuccess<O>, onProgress?: OnProgress, onError?: OnError) => void;
}

export interface BaseLoaderLoadOptions {
	node: BaseNodeType;
}

export abstract class BaseGeoLoaderHandler<O extends BaseGeoLoaderOutput> extends CoreBaseLoader {
	protected _loader: BaseGeoLoader<O> | undefined;

	reset() {
		this._loader = undefined;
	}

	async load(options: BaseLoaderLoadOptions): Promise<Object3D[] | undefined> {
		const loader = await this._getLoader(options);
		if (!loader) {
			console.warn('no loader', this);
			return;
		}

		const url = await this._urlToLoad();

		return new Promise(async (resolve) => {
			CoreLoaderGeometry.incrementInProgressLoadsCount();
			await CoreLoaderGeometry.waitForMaxConcurrentLoadsQueueFreed();

			loader.load(
				url,
				(object: O) => {
					CoreLoaderGeometry.decrementInProgressLoadsCount();
					const newObjects = this._onLoadSuccessGLTF(object);
					resolve(newObjects);
				},
				(progress) => {},
				(event: ErrorEvent) => {
					CoreLoaderGeometry.decrementInProgressLoadsCount();
					const message = `could not load geometry from ${url} (Error: ${event.message})`;
					options.node?.states.error.set(message);
				}
			);
		});
	}
	protected abstract _getLoader(options: BaseLoaderLoadOptions): Promise<BaseGeoLoader<O>>;
	protected _onLoadSuccessGLTF(o: O): Object3D[] {
		if (o instanceof Object3D) {
			return [o];
		} else {
			return [];
		}
	}
}