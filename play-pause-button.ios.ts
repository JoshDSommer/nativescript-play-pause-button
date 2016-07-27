import {ContentView} from "ui/content-view";
import {Color} from 'color';

declare const UIButton, common, interop, UIControlEvents, Selector, AnimatablePlayButton, CGRectMake, UIColor;
const playPauseTapEvent = 'playPauseTap';

class PlayPauseTapHandler extends NSObject {
	private _owner: WeakRef<ContentView>;
	private selected = false;

	public static initWithOwner(owner: WeakRef<ContentView>): PlayPauseTapHandler {
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

export class PlayPauseButton extends ContentView {
	public static playPauseTapEvent = playPauseTapEvent;

	private _ios: any;
  private _tapHandler: any;
  
  constructor() {
		super();
 
    let button = new AnimatablePlayButton();
		button.bgColor = UIColor.blackColor();
    button.color = UIColor.whiteColor();

		this._ios = button;
		this._tapHandler = PlayPauseTapHandler.initWithOwner(new WeakRef(<any>this));
		this._ios.addTargetActionForControlEvents(this._tapHandler, 'tap', UIControlEvents.UIControlEventTouchUpInside);
	}

  set buttonColor(value: string) {
    // console.log(`set buttonColor: ${value}`);
		this._ios.color = new Color(value).ios;
	}

  set buttonBgColor(value: string) {
    // console.log(`set buttonBgColor: ${value}`);
		this._ios.bgColor = new Color(value).ios;
  }

	get _nativeView(): any {
		return this._ios;
	}

	get ios(): any {
		return this._ios;
  }

  onLoaded() {
    this._ios.createLayers(CGRectMake(0, 0, this.width, this.height));
	}
}