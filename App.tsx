import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/Home';
import Search from './screens/Search';
import ViewGIF from './screens/ViewGIF';

export type RootStackParams = {
  Home: undefined;
  Search: undefined;
  ViewGIF: undefined;
};

export default function App() {
  const Stack = createNativeStackNavigator<RootStackParams>();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="ViewGIF" component={ViewGIF} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
