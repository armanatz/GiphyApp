import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Home, Search, ViewGIF } from './screens';
import { truncateText } from './utils';
import type { RootStackParams } from './@types/globals';

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

const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
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
              animation: 'none',
            }}
          />
          <Stack.Screen
            name="ViewGIF"
            component={ViewGIF}
            options={({ route }) => {
              let title = route.params.title;

              if (title && title?.length >= 25) {
                title = truncateText(title);
              }

              return {
                ...commonStackScreenOpts,
                headerShown: true,
                headerTitleAlign: 'center',
                title,
                contentStyle: [
                  styles.container,
                  {
                    paddingVertical: 0,
                  },
                ],
              };
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
