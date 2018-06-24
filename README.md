This is the first iteration of the ios invoice home app.

There is still a lot of junk to clean up from the framework build(stuff we don't need, like android/blackberry build stuff, and cordova-plugins to uninstall that we won't use). 

Best way to experience this version:

### Install

Make sure you have PhoneGap installed: `npm install -g phonegap`.

Download this repo, then in project directory run this in terminal: `npm install`

----------------------

### Run in iOS simulator

Make sure you have XCode installed and run this:

```shell
$ phonegap platform add ios
$ phonegap run ios
```

----------------------

### Run in browser

`$ phonegap serve`

Open in your browser `localhost:3000`

----------------------

### Screenshot

![Screenshot](https://raw.githubusercontent.com/valnub/Framework7-v2-PhoneGap-Kitchen-Sink/master/f7-v2-pg-kitchen-sink-screenshot.jpg)
