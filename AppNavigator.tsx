import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { Home, Search, ViewGIF } from './screens';

import { HeaderBackBtn } from './components';

import { renderTitleOrUrl } from './utils';

import type { RootStackParams } from './@types/globals';

type CommonScreenOpts = NativeStackNavigationOptions;

const { Navigator, Screen } = createNativeStackNavigator<RootStackParams>();

export default function AppNavigator(props: CommonScreenOpts) {
  return (
    <Navigator>
      <Screen
        name="Home"
        component={Home}
        options={{
          ...props,
        }}
      />
      <Screen
        name="Search"
        component={Search}
        options={{
          ...props,
          animation: 'none',
        }}
      />
      <Screen
        name="ViewGIF"
        component={ViewGIF}
        options={({ navigation, route }) => {
          return {
            ...props,
            headerLeft: () => (
              <HeaderBackBtn onPress={() => navigation.navigate('Search')} />
            ),
            headerShown: true,
            headerTitleAlign: 'center',
            title: renderTitleOrUrl({
              type: 'title',
              text: route.params.title,
              charLimit: 25,
            }),
            contentStyle: [
              {
                paddingHorizontal: 20,
                paddingVertical: 0,
              },
            ],
          };
        }}
      />
    </Navigator>
  );
}
