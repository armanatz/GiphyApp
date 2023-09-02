import { View } from 'react-native';

import ImageWrapper from '../ImageWrapper';
import MetaData from './MetaData';
import AgeRating from './AgeRating';

import commonStyles from './commonStyles';

import type { GIFContentRatings } from '../../@types/giphy';

type GIFDetailsProps = {
  source: string;
  title?: string;
  shortUrl?: string;
  rating?: GIFContentRatings;
};

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
        containerProps={{ style: commonStyles.imageContainer }}
      />
      <View style={commonStyles.descriptionContainer}>
        <MetaData title={title} url={shortUrl} />
        <AgeRating rating={rating} />
      </View>
    </>
  );
}
