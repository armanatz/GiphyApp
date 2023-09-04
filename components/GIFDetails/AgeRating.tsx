import { View, Text, StyleSheet } from 'react-native';
import type { ViewProps } from 'react-native';

import commonStyles from './commonStyles';

import type { GIFContentRatings } from '../../@types/giphy';

type AgeRatingProps = {
  rating?: GIFContentRatings;
  containerProps?: ViewProps;
};

const styles = StyleSheet.create({
  gRatingBgColor: {
    backgroundColor: 'green',
  },
  pgRatingBgColor: {
    backgroundColor: 'orange',
  },
  'pg-13RatingBgColor': {
    backgroundColor: 'purple',
  },
  rRatingBgColor: {
    backgroundColor: 'red',
  },
  content: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: -4,
  },
});

export default function AgeRating({ rating, containerProps }: AgeRatingProps) {
  return (
    <View
      {...containerProps}
      style={[
        commonStyles.ratingCircle,
        styles[`${rating}RatingBgColor` as keyof typeof styles],
        containerProps?.style,
      ]}
      accessibilityLabel={`Content rating of GIF is ${rating || 'N/A'}`}
      accessible={true}
    >
      <Text style={styles.content}>{rating?.toLocaleUpperCase() || 'N/A'}</Text>
    </View>
  );
}
