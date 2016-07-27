### NativeScript Play Pause Button
[![npm](https://img.shields.io/npm/v/nativescript-play-pause-button.svg)](https://www.npmjs.com/package/nativescript-play-pause-button)
[![npm](https://img.shields.io/npm/dt/nativescript-play-pause-button.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-play-pause-button)


# Android

![Nativescript Play Pause Button](https://raw.githubusercontent.com/TheOriginalJosh/nativescript-play-pause-button/master/sample-android.gif)


# iOS

![Nativescript Play Pause Button](https://raw.githubusercontent.com/TheOriginalJosh/nativescript-play-pause-button/master/sample-ios.gif)

Example:

```xml
<Page xmlns="http://schemas.nativescript.org/tns.xsd"
	xmlns:PlayPause="nativescript-play-pause-button"
	loaded="pageLoaded">
	<StackLayout backgroundColor="#ececec">
		<PlayPause:PlayPauseButton width="100" height="100" playPauseTap="PPTapped"  buttonColor="#e11a60" buttonBgColor="#ececec" marginTop="100"></PlayPause:PlayPauseButton>
	</StackLayout>
</Page>
```

The `playPauseTap` event contains event data with the state `true` is play and `false` is paused.

###Example
```typescript
export function PPTapped(args) {
    console.log(' Play Pause tapped : ' + args.eventData.state);
}
```

### iOS only

backgound color must be set with `buttonBgColor` or else the background will be black



### Libraries used:

Android based on: https://github.com/recruit-lifestyle/PlayPauseButton

iOS based on: https://github.com/suzuki-0000/AnimatablePlayButton

