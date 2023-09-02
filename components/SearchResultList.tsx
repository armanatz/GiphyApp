import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { FlashList } from '@shopify/flash-list';

import ImageWrapper from './ImageWrapper';
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
  return (
    <View style={styles.resultList}>
      {dataIsLoading ? (
        <FlashList
          data={data || []}
          renderItem={({ item }) => (
            <ImageWrapper
              source={item.images.fixed_height_small_still.url}
              containerProps={{ style: styles.imageContainer }}
            />
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
