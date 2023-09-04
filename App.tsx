import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import AppNavigator from './AppNavigator';

// Uncomment to run mock API server for development
// import { mswDev } from './mocks/api/server.dev';

// if (process.env.NODE_ENV === 'development') {
//   mswDev.listen({ onUnhandledRequest: 'bypass' });
// }

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

  if (!appIsReady) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <AppNavigator {...commonStackScreenOpts} />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
