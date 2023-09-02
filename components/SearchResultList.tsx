import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';

import ImageWrapper from './ImageWrapper';
import type { RootStackParams } from '../@types/globals';
import type { GIFObject } from '../@types/giphy';

type SearchResultListProps = {
  data?: GIFObject[];
  dataIsLoading?: boolean;
};

const styles = StyleSheet.create({
  resultList: {
    height: Dimensions.get('screen').height * 0.75,
  },
  imageContainer: {
    height: 100,
    width: 100,
    marginVertical: 5,
  },
});

export default function SearchResultList({
  data,
  dataIsLoading = false,
}: SearchResultListProps) {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  return (
    <View style={styles.resultList}>
      {dataIsLoading ? (
        <FlashList
          data={data || []}
          renderItem={({ item }) => (
            <TouchableHighlight
              onPress={() =>
                navigation.navigate('ViewGIF', {
                  source: item.images.original.webp,
                  shortUrl: item.bitly_url || item.url,
                  title: item.title,
                  rating: item.rating,
                })
              }
            >
              <ImageWrapper
                source={item.images.fixed_height_small_still.url}
                containerProps={{ style: styles.imageContainer }}
              />
            </TouchableHighlight>
          )}
          estimatedItemSize={100}
          numColumns={3}
        />
      ) : (
        <View style={{ marginTop: 50 }}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
}
