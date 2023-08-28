import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';

import Home from './screens/Home';
import Search from './screens/Search';
import ViewGIF from './screens/ViewGIF';

export type RootStackParams = {
  Home: undefined;
  Search: undefined;
  ViewGIF: undefined;
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
});

const commonStackScreenOpts = {
  headerShown: false,
  contentStyle: styles.container,
};

function cacheFonts(fonts: Record<string, any>[]) {
  return fonts.map(font => Font.loadAsync(font));
}

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        const fontAssets = cacheFonts([Ionicons.font]);

        await Promise.allSettled([...fontAssets]);
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  const Stack = createNativeStackNavigator<RootStackParams>();

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            ...commonStackScreenOpts,
          }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            ...commonStackScreenOpts,
          }}
        />
        <Stack.Screen
          name="ViewGIF"
          component={ViewGIF}
          options={{
            ...commonStackScreenOpts,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
