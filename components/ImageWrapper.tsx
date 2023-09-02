import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';

import type { ViewProps } from 'react-native';
import type { ImageProps } from 'expo-image';

import type { ImageLoadingStatus } from '../@types/globals';

type ImageWrapperProps = {
  source?: string;
  containerProps?: ViewProps;
  imageProps?: ImageProps;
  onImageLoadingStatusChange?: (status: ImageLoadingStatus) => void;
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: '100%',
  },
});

export default function ImageWrapper({
  source,
  containerProps,
  imageProps,
  onImageLoadingStatusChange,
}: ImageWrapperProps) {
  const [imageLoadingStatus, setImageLoadingStatus] =
    useState<ImageLoadingStatus>('loading');

  useEffect(() => {
    if (onImageLoadingStatusChange) {
      onImageLoadingStatusChange(imageLoadingStatus);
    }
  }, [imageLoadingStatus]);

  return (
    <View {...containerProps}>
      <Image
        contentFit="fill"
        {...imageProps}
        onLoad={() => setImageLoadingStatus('success')}
        onLoadStart={() => setImageLoadingStatus('loading')}
        source={source}
        style={[styles.image, imageProps?.style]}
      />
    </View>
  );
}
