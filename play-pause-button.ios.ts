
import { View } from 'ui/core/view';
import {topmost} from 'ui/frame';
import {Placeholder} from 'ui/placeholder';
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
	public static btnwidth;

	private _ios: any;
	private _tapHandler: any;
	private _buttonColor: string;
	private _buttonBgColor: string;
	private _width: number;

	get buttonColor(): string {
		return this._buttonColor;
	}

	set buttonColor(value: string) {
		//	this._ios.color = new Color(value).ios;
		this._buttonColor = value;
	}

	set buttonBgColor(value: string) {
		//	this._ios.bgColor = new Color(value).ios;
		this._buttonBgColor = value;
	}

	get _nativeView(): any {
		return this._ios;
	}

	get ios(): any {
		return this._ios;
	}


	public constructor() {
		super();

		let button = new AnimatablePlayButton(100);

		button.bgColor = UIColor.blackColor();
		button.color = UIColor.whiteColor();

		this._ios = button;
		this._tapHandler = PlayPauseTapHandler.initWithOwner(new WeakRef(<any>this));
		this._ios.addTargetActionForControlEvents(this._tapHandler, 'tap', UIControlEvents.UIControlEventTouchUpInside);
	}

	onLoaded() {

		this._ios.color = new Color(this._buttonColor).ios;
		this._ios.bgColor = new Color(this._buttonBgColor).ios;
	}
}