import {
	Clock,
	WebGLRenderer,
	WebGLRenderTarget,
} from 'three';

import { Pass } from 'three';
import { ShaderPass } from 'three';

export class EffectComposer {

	constructor( renderer: WebGLRenderer, renderTarget?: WebGLRenderTarget );
	renderer: WebGLRenderer;
	renderTarget1: WebGLRenderTarget;
	renderTarget2: WebGLRenderTarget;
	writeBuffer: WebGLRenderTarget;
	readBuffer: WebGLRenderTarget;
	passes: Pass[];
	copyPass: ShaderPass;
	clock: Clock;

	swapBuffers(): void;
	addPass( pass: Pass ): void;
	insertPass( pass: Pass, index: number ): void;
	isLastEnabledPass( passIndex: number ): boolean;
	render( deltaTime?: number ): void;
	reset( renderTarget?: WebGLRenderTarget ): void;
	setSize( width: number, height: number ): void;
	setPixelRatio( pixelRatio: number ): void;

}
