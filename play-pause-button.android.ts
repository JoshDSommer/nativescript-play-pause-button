
import { View } from 'ui/core/view';
import { Button } from 'ui/button';
import {Color} from 'color';

declare const jp, android, com: any;


export class PlayPauseButton extends View {
	public static playPauseTapEvent = 'playPauseTap';
	private _androidViewId: number;
	private _android: any; //<- jp.co.recruit_lifestyle.android.widget.PlayPauseButton;
	private _color: string;

	get buttonColor(): string {
		return this._color;
	}

	set buttonColor(value: string) {
		this._color = value;
	}

	get android(): any {
		return this._android;
	}

	get _nativeView(): any {
		return this._android;
	}

	set buttonWidth(value: number) {
		this.width = value;
	}



	public _createUI() {
		let jpPlayPauseButton = jp.co.recruit_lifestyle.android.widget.PlayPauseButton;
		this._android = new jpPlayPauseButton(this._context);
		if (!this._androidViewId) {
			this._androidViewId = android.view.View.generateViewId();
		}
		this._android.setId(this._androidViewId);

		this._android.setColor(new Color(this.buttonColor).android);

		let that = new WeakRef(this);

		this._android.setOnControlStatusChangeListener(new jp.co.recruit_lifestyle.android.widget.PlayPauseButton.OnControlStatusChangeListener({
			get owner() {
				return that.get();
			},

			onStatusChange: function (view, state) {
				if (this.owner) {
					//this.owner._emit(PlayPauseButton.playPauseTapEvent);
					this.owner.notify({
						eventName: PlayPauseButton.playPauseTapEvent,
						object: this,
						eventData: {
							state: state
						}
					});
				}
			}

		}));
	}
}