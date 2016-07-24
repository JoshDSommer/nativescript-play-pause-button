### NativeScript Play Pause Button

#Android
![Nativescript Play Pause Button](sample-android.gif)

#iOS
![Nativescript Play Pause Button](sample-ios.gif)

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

### iOS only

backgound color must be set with `buttonBgColor` or else the background will be black

Android based on: https://github.com/recruit-lifestyle/PlayPauseButton

iOS(Coming soon) based on: https://github.com/suzuki-0000/AnimatablePlayButton

