
import { View } from 'ui/core/view';
import {topmost} from 'ui/frame';
import { Button} from 'ui/button';
import {Color} from 'color';

declare const UIButton, common, interop, UIControlEvents, Selector, AnimatablePlayButton, CGRectMake, UIColor, CGRectGetMidX, CGPointMake, CGRectGetMidY: any;
const playPauseTapEvent = 'playPauseTap';

class PlayPauseTapHandler extends NSObject {
	private _owner: WeakRef<View>;
	private selected = false;

	public static initWithOwner(owner: WeakRef<View>): PlayPauseTapHandler {
		let handler = <PlayPauseTapHandler>PlayPauseTapHandler.new();
		handler._owner = owner;
		return handler;
	}

	public tap(args) {
		let owner = <any>this._owner.get();
		if (args.selected) {
			args.deselect();
			args.selected = false;
		} else {
			args.select();
			args.selected = true;
		}
		if (owner) {
			owner.notify({
				eventName: PlayPauseButton.playPauseTapEvent,
				object: this,
				eventData: {
					state: args.selected
				}
			});
		}
	}

	public static ObjCExposedMethods = {
		'tap': { returns: interop.types.void, params: [interop.types.id] }
	};
}

export class PlayPauseButton extends View {
	public static playPauseTapEvent = playPauseTapEvent;
	private _ios: any;
	private _tapHandler: any;
	private _color: string;
	private _width: number;

	get buttonColor(): string {
		return this._color;
	}

	set buttonColor(value: string) {
		this._color = value;
	}

	get width() {
		return this._width;
	}
	set width(value: number) {
		this._width = value;
	}

	get _nativeView(): any {
		return this._ios;
	}

	get ios(): any {
		return this._ios;
	}

	public constructor() {
		super();
		console.log(this.buttonColor);

		let button = new AnimatablePlayButton(100);

		button.bgColor = new UIColor(1, 0);
		button.color = new UIColor(0, 1);
		this._ios = button;
		this._tapHandler = PlayPauseTapHandler.initWithOwner(new WeakRef(this));
		this._ios.addTargetActionForControlEvents(this._tapHandler, 'tap', UIControlEvents.UIControlEventTouchUpInside);
	}
}