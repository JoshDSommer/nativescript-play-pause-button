
import { View } from 'ui/core/view';
import {Color} from 'color';

//declare const jp, com: any;
declare const jp, android, com: any;



export class PlayPauseButton extends View {
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


	public _createUI() {
		let PlayPauseButton = jp.co.recruit_lifestyle.android.widget.PlayPauseButton;
		this._android = new PlayPauseButton(this._context);
		if (!this._androidViewId) {
			this._androidViewId = android.view.View.generateViewId();
		}
		this._android.setId(this._androidViewId);
		// console.log(JSON.stringify(this._android));
		// try {
			this._android.setColor(new Color(this.buttonColor).android);

		var that = new WeakRef(this);
		// 	this._android.setOnControlStateChangeListener(new PlayPauseButton.OnControlStatusChangeListener({
		// 		onStatusChange: (view: View, state: boolean) => {
		// 			console.log(`play pause button state:${state}`);
		// 		}
		// 	}));

		// } catch (err) {
		// 	console.log('btn eeee' + err);
		// }

		this._android.setOnClickListener(new android.view.View.OnClickListener({
			get owner() {
				return that.get();
			},

			onClick: function (v) {
				if (this.owner) {
					this.owner._emit("tap");
				}
			}

		}));
	}
}