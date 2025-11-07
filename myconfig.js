require('dotenv').config();

export default ({ config }) => {
  return {
    ...config,
    "name": "Flash",
    "slug": "flash",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "flash",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "backgroundColor": "#000000",
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundImage": "./assets/images/adaptive-icon.png",
        "monochromeImage": "./assets/images/adaptive-icon.png"
      },
      "config": {
        "googleMaps": {
          "apiKey": 'AIzaSyAYYMFzURt2Z9ruNU3jfrp5ATVCLRykLOw'
        }
      },
      "edgeToEdgeEnabled": true,
      "predictiveBackGestureEnabled": false,
      "package": "com.ligogo.flash"
    },
    "web": {
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/adaptive-icon.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#000000",
          "dark": {
            "backgroundColor": "#000000"
          }
        }
      ]
    ],
      "expo": {
        "extra": {
          "eas": {
            "projectId": "9a619cc4-947f-47dd-ba92-bb1898d36b71"
          }
        }
      },
    "owner": "ligogo",
    "experiments": {
      "typedRoutes": true,
      "reactCompiler": true
    }
  };
};