import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';

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

export default function App() {
  const Stack = createNativeStackNavigator<RootStackParams>();

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
