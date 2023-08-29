import { StyleSheet, View } from 'react-native';

import ImageWrapper from '../ImageWrapper';
import MetaData from './MetaData';
import AgeRating from './AgeRating';

type GIFDetailsProps = {
  source: string;
  title?: string;
  shortUrl?: string;
  rating?: string;
};

const styles = StyleSheet.create({
  imageContainer: {
    height: 350,
    marginVertical: 10,
  },
  descriptionContainer: {
    flexDirection: 'row',
    gap: 20,
    maxWidth: '100%',
    justifyContent: 'space-between',
  },
});

export default function GIFDetails({
  source,
  title,
  shortUrl,
  rating,
}: GIFDetailsProps) {
  return (
    <>
      <ImageWrapper
        source={source}
        containerProps={{ style: styles.imageContainer }}
      />
      <View style={styles.descriptionContainer}>
        <MetaData title={title} url={shortUrl} />
        <AgeRating rating={rating} />
      </View>
    </>
  );
}
