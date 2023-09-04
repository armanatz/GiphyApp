import { View, StyleSheet, Dimensions } from 'react-native';

import SkeletonPlaceholder from '../SkeletonPlaceholder';

import commonStyles from './commonStyles';

const styles = StyleSheet.create({
  titleText: {
    width: Dimensions.get('screen').width * 0.5,
    height: 16,
    marginBottom: 5,
  },
  urlText: {
    width: Dimensions.get('screen').width * 0.6,
    height: 16,
  },
});

export default function GIFDetailsSkeleton() {
  return (
    <>
      <View accessible accessibilityLabel="GIF loading animation">
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item style={commonStyles.imageContainer} />
        </SkeletonPlaceholder>
      </View>
      <View style={commonStyles.descriptionContainer}>
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item style={styles.titleText} />
          <SkeletonPlaceholder.Item style={styles.urlText} />
        </SkeletonPlaceholder>
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item style={commonStyles.ratingCircle} />
        </SkeletonPlaceholder>
      </View>
    </>
  );
}
