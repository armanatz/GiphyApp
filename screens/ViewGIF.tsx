import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { GIFDetails } from '../components';
import type { RootStackParams } from '../@types/globals';

type ViewGIFProps = NativeStackScreenProps<RootStackParams, 'ViewGIF'>;

export default function ViewGIF({ route }: ViewGIFProps) {
  const { source, title, shortUrl, rating } = route.params;

  return (
    <SafeAreaView>
      <View>
        <GIFDetails
          source={source}
          title={title}
          shortUrl={shortUrl}
          rating={rating}
        />
      </View>
    </SafeAreaView>
  );
}
