import { View, Text, StyleSheet } from 'react-native';
import type { ViewProps } from 'react-native';

import type { GIFContentRatings } from '../../@types/giphy';

type AgeRatingProps = {
  rating?: GIFContentRatings;
  containerProps?: ViewProps;
};

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    backgroundColor: 'grey',
    borderRadius: 50,
    height: 65,
    justifyContent: 'center',
    width: 65,
  },
  gRatingBgColor: {
    backgroundColor: 'green',
  },
  pgRatingBgColor: {
    backgroundColor: 'orange',
  },
  pg13RatingBgColor: {
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
        styles.circle,
        styles[`${rating}RatingBgColor` as keyof typeof styles],
        containerProps?.style,
      ]}
    >
      <Text style={styles.content}>{rating?.toLocaleUpperCase() || 'N/A'}</Text>
    </View>
  );
}
