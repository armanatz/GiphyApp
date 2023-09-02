import { View } from 'react-native';

import ImageWrapper from '../ImageWrapper';
import MetaData from './MetaData';
import AgeRating from './AgeRating';

import commonStyles from './commonStyles';

import type { GIFDetailsProps } from '../../@types/globals';

export default function GIFDetails({
  source,
  title,
  shortUrl,
  rating,
  onImageLoadingStatusChange,
}: GIFDetailsProps) {
  return (
    <>
      <ImageWrapper
        source={source}
        containerProps={{ style: commonStyles.imageContainer }}
        onImageLoadingStatusChange={onImageLoadingStatusChange}
      />
      <View style={commonStyles.descriptionContainer}>
        <MetaData title={title} url={shortUrl} />
        <AgeRating rating={rating} />
      </View>
    </>
  );
}
