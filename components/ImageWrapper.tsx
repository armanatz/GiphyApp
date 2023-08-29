import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import type { ViewProps } from 'react-native';
import type { ImageProps } from 'expo-image';

type ImageWrapperProps = {
  source: string;
  containerProps?: ViewProps;
  imageProps?: ImageProps;
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
}: ImageWrapperProps) {
  return (
    <View {...containerProps}>
      <Image
        {...imageProps}
        contentFit="cover"
        source={source}
        style={[styles.image, imageProps?.style]}
      />
    </View>
  );
}
