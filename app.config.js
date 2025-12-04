export default {
  expo: {
    name: "Flash",
    slug: "flash",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/logo.jpg",
    scheme: "flash",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,

    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.ligogo.flash",
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false
      }
    },

    android: {
      adaptiveIcon: {
        backgroundColor: "#ffffff",
        foregroundImage: "./assets/images/logo.jpg",
        backgroundImage: "./assets/images/logo.jpg",
        monochromeImage: "./assets/images/logo.jpg"
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      package: "com.ligogo.flash",

      config: {
        googleMaps: {
          apiKey: process.env.EXPO_PUBLIC_GOOGLE_API_KEY
        }
      }
    },

    web: {
      output: "static",
      favicon: "./assets/images/logo.jpg"
    },

    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/logo.jpg",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
          dark: {
            backgroundColor: "#ffffff"
          }
        }
      ],
      "expo-web-browser",
      "expo-secure-store"
    ],

    experiments: {
      typedRoutes: true,
      reactCompiler: true
    },

    extra: {
      router: {},
      eas: {
        projectId: "79e02f26-85c5-406e-a6b1-45a13fd5af1e"
      },
      API_URL: process.env.EXPO_PUBLIC_API_URL
    },

    owner: "ligogo",

    runtimeVersion: {
      policy: "appVersion"
    },

    updates: {
      url: "https://u.expo.dev/79e02f26-85c5-406e-a6b1-45a13fd5af1e"
    }
  }
};
