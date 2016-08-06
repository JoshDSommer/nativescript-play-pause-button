
declare module "nativescript-play-pause-button" {
  import { EventData } from "data/observable";
  import { Property } from "ui/core/dependency-observable";
  import { View } from "ui/core/view";


  export class PlayPauseButton extends View {

    public static playPauseTapEvent: string;
    android: any;
    ios: any;

  }

}