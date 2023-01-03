interface EventPos {
	x: number;
	y: number;
}
type PointerEventName = 'pointermove' | 'pointerdown' | 'pointerup';
function triggerPointerEvent(eventName: PointerEventName, canvas: HTMLCanvasElement, options?: EventPos) {
	const offsetX = options?.x != null ? options.x : 0;
	const offsetY = options?.y != null ? options.y : 0;
	const rect = canvas.getBoundingClientRect();
	const x = rect.left + rect.width * (0.5 + offsetX);
	const y = rect.top + rect.height * (0.5 + offsetY);
	canvas.dispatchEvent(new PointerEvent(eventName, {clientX: x, clientY: y}));
}
function triggerPointerEventInMiddle(eventName: PointerEventName, canvas: HTMLCanvasElement) {
	const rect = canvas.getBoundingClientRect();
	canvas.dispatchEvent(
		new PointerEvent(eventName, {clientX: rect.left + rect.width * 0.5, clientY: rect.top + rect.height * 0.5})
	);
}
function triggerPointerEventAside(eventName: PointerEventName, canvas: HTMLCanvasElement) {
	canvas.dispatchEvent(new PointerEvent(eventName, {clientX: 0, clientY: 0}));
}

// pointermove
export function triggerPointermove(canvas: HTMLCanvasElement, options?: EventPos) {
	triggerPointerEvent('pointermove', canvas, options);
}
export function triggerPointermoveInMiddle(canvas: HTMLCanvasElement) {
	triggerPointerEventInMiddle('pointermove', canvas);
}
export function triggerPointermoveAside(canvas: HTMLCanvasElement) {
	triggerPointerEventAside('pointermove', canvas);
}
// pointerdown
export function triggerPointerdown(canvas: HTMLCanvasElement, options?: EventPos) {
	triggerPointerEvent('pointerdown', canvas, options);
}
export function triggerPointerdownInMiddle(canvas: HTMLCanvasElement) {
	triggerPointerEventInMiddle('pointerdown', canvas);
}
export function triggerPointerdownAside(canvas: HTMLCanvasElement) {
	triggerPointerEventAside('pointerdown', canvas);
}
// pointerup
export function triggerPointerup(canvas: HTMLCanvasElement, options?: EventPos) {
	triggerPointerEvent('pointerup', canvas, options);
}
export function triggerPointerupInMiddle(canvas: HTMLCanvasElement) {
	triggerPointerEventInMiddle('pointerup', canvas);
}
export function triggerPointerupAside(canvas: HTMLCanvasElement) {
	triggerPointerEventAside('pointerup', canvas);
}

interface KeyEventOptions {
	code?: 'keyA' | 'keyE';
	ctrlKey?: boolean;
}
export function triggerKeydown(canvas: HTMLCanvasElement, options: KeyEventOptions = {}) {
	options.code = options.code || 'keyE';
	if (options.ctrlKey == null) {
		options.ctrlKey = false;
	}
	canvas.focus();
	canvas.dispatchEvent(new KeyboardEvent('keydown', options));
}

export function triggerKeypress(canvas: HTMLCanvasElement, options: KeyEventOptions = {}) {
	options.code = options.code || 'keyE';
	if (options.ctrlKey == null) {
		options.ctrlKey = false;
	}
	canvas.focus();
	canvas.dispatchEvent(new KeyboardEvent('keypress', options));
}
export function triggerKeyup(canvas: HTMLCanvasElement, options: KeyEventOptions = {}) {
	options.code = options.code || 'keyE';
	if (options.ctrlKey == null) {
		options.ctrlKey = false;
	}
	canvas.focus();
	canvas.dispatchEvent(new KeyboardEvent('keyup', options));
}
