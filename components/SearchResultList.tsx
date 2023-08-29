import { View, StyleSheet, Dimensions } from 'react-native';
import { FlashList } from '@shopify/flash-list';

import ImageWrapper from './ImageWrapper';

const styles = StyleSheet.create({
  content: {
    marginTop: 25,
  },
  resultList: {
    height: Dimensions.get('screen').height * 0.75,
  },
  imageContainer: {
    height: 100,
    width: 100,
    marginVertical: 5,
  },
});

export default function SearchResultList({ data }) {
  return (
    <View style={styles.resultList}>
      <FlashList
        data={data}
        renderItem={({ item }) => (
          <ImageWrapper
            source={item.images.fixed_height_small_still.url}
            containerProps={{ style: styles.imageContainer }}
          />
        )}
        estimatedItemSize={100}
        numColumns={3}
      />
    </View>
  );
}
