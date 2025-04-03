import { useEffect } from 'react';
import { View } from "react-native";
import { DarkTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import EStyleSheet from 'react-native-extended-stylesheet';
import RootNavigator from '@/navigators/RootNavigator';
import * as SplashScreen from 'expo-splash-screen';
import styleGuide from './styles/styleGuide';
import { useFonts } from "expo-font";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

EStyleSheet.build(styleGuide);

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false
});

export default function App() {

  const [loaded] = useFonts({
    "Inter": require("@/assets/fonts/Inter-Black.otf"),
  });

  useEffect(() => {
    if (loaded) {
      // Hide the splash screen
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  };

  return (
    <View style={{ flex: 1 }}>
      <ThemeProvider value={DarkTheme}>
            <NavigationContainer>
              <GestureHandlerRootView style={{ flex: 1 }}>
                {/* <Host> portalize */}
                <RootNavigator />
                {/* </Host> */}
              </GestureHandlerRootView>
            </NavigationContainer>
      </ThemeProvider>
    </View>
  );
}