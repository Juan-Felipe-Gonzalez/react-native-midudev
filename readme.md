## 1. How to run
npm run android

## 2. To create blank expo project
npx create-expo-app@latest [name] --template blank

## 3. Useful dependencies
npx expo lint

- SafeAreaView updated
npx expo install react-native-safe-area-context

- If we have to develop to Web:
npx expo install react-dom react-native-web @expo/metro-runtime

## Buttons
Button: native, not customizable

Pressable: core, with many functions

TouchableOpacity: basic but customizable

## ScrollView

Uses: Text box multilines

Render evrything at the same time

## SafeAreaView

Just works on iOS and is deprecated

Instead use useSafeAreaInsets() with SafeAreaProvider


