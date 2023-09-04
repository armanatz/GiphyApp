import { StyleSheet, Text, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

import { GIFDetails, GIFDetailsSkeleton, SearchBar } from '../components';

import { useRandomGIF } from '../hooks/queries';

import type { RootStackParams } from '../@types/globals';

type HomeProps = NativeStackScreenProps<RootStackParams, 'Home'>;

const styles = StyleSheet.create({
  content: {
    marginTop: 25,
  },
});

export default function Home({ navigation }: HomeProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const screenIsFocused = useIsFocused();

  const {
    data: randomGIF,
    status: randomGIFStatus,
    isFetching: randomGIFIsFetching,
    refetch,
  } = useRandomGIF({
    refetchInterval: data => {
      if (isImageLoaded && data && screenIsFocused) {
        return 10000;
      }
      return 0;
    },
  });

  useEffect(() => {
    if (randomGIFStatus === 'error') {
      Alert.alert(
        'Network Error',
        'An error occurred while fetching a random GIF.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Retry',
            onPress: () => refetch(),
          },
        ],
      );
    }
  }, [randomGIFStatus]);

  return (
    <SafeAreaView>
      <SearchBar
        asButton
        onActivateSearch={() => navigation.navigate('Search')}
      />
      <View style={styles.content}>
        <Text>Random selected GIF:</Text>
        {randomGIFIsFetching || randomGIFStatus !== 'success' ? (
          <GIFDetailsSkeleton />
        ) : (
          <GIFDetails
            source={
              randomGIF?.data.images.original.webp ||
              randomGIF?.data.images.original.url
            }
            title={randomGIF?.data.title}
            shortUrl={randomGIF?.data.bitly_url || randomGIF?.data.url}
            rating={randomGIF?.data.rating}
            onImageLoadingStatusChange={imageLoadingStatus =>
              setIsImageLoaded(imageLoadingStatus === 'success')
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}
