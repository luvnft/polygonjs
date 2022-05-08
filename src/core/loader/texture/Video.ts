import {VideoTexture} from 'three';
import {BaseNodeType} from '../../../engine/nodes/_Base';
import {CoreLoaderTexture} from '../Texture';
import {CoreBaseLoader} from './../_Base';
import {BaseTextureLoader} from './_BaseTextureLoader';
interface VideoSourceTypeByExt {
	ogg: string;
	ogv: string;
	mp4: string;
}

export class VideoTextureLoader extends BaseTextureLoader {
	static VIDEO_SOURCE_TYPE_BY_EXT: VideoSourceTypeByExt = {
		ogg: 'video/ogg; codecs="theora, vorbis"',
		ogv: 'video/ogg; codecs="theora, vorbis"',
		mp4: 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
	};

	constructor(protected override _url: string, protected override _node: BaseNodeType) {
		super(_url, _node);
	}

	loadVideo(): Promise<VideoTexture> {
		return new Promise(async (resolve, reject) => {
			const url = await this._urlToLoad();
			CoreLoaderTexture.incrementInProgressLoadsCount();
			await CoreLoaderTexture.waitForMaxConcurrentLoadsQueueFreed();

			const video = document.createElement('video');
			video.setAttribute('crossOrigin', 'anonymous');
			video.setAttribute('autoplay', `${true}`); // to ensure it loads
			video.setAttribute('loop', `${true}`);
			// wait for onloadedmetadata to ensure that we have a duration
			video.onloadedmetadata = function () {
				video.pause();
				const texture = new VideoTexture(video);
				// video.setAttribute('controls', true)
				// video.style="display:none"
				CoreLoaderTexture.decrementInProgressLoadsCount();
				const callback = CoreLoaderTexture._onTextureLoadedCallback;
				if (callback) {
					callback(url, texture);
				}
				resolve(texture);
			};

			// add source as is
			const original_source = document.createElement('source');
			const original_ext = CoreBaseLoader.extension(url) as keyof VideoSourceTypeByExt;
			let type: string = VideoTextureLoader.VIDEO_SOURCE_TYPE_BY_EXT[original_ext];
			type = type || VideoTextureLoader._default_video_source_type(url);
			original_source.setAttribute('type', type);
			original_source.setAttribute('src', url);
			video.appendChild(original_source);

			// add secondary source, either mp4 or ogv depending on the first url
			let secondary_url: string | undefined;
			if (original_ext == 'mp4') {
				// add ogv
				secondary_url = CoreLoaderTexture.replaceExtension(url, 'ogv');
			} else {
				// add mp4
				secondary_url = CoreLoaderTexture.replaceExtension(url, 'mp4');
			}
			const secondary_source = document.createElement('source');
			const secondary_ext = CoreBaseLoader.extension(secondary_url) as keyof VideoSourceTypeByExt;
			type = VideoTextureLoader.VIDEO_SOURCE_TYPE_BY_EXT[secondary_ext];
			type = type || VideoTextureLoader._default_video_source_type(url);
			secondary_source.setAttribute('type', type);
			secondary_source.setAttribute('src', url);
			video.appendChild(secondary_source);
		});
	}

	static _default_video_source_type(url: string) {
		const ext = CoreBaseLoader.extension(url);
		return `video/${ext}`;
	}
}