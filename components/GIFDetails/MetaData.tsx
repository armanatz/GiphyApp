import { Text, TouchableHighlight, View } from 'react-native';
import type { ViewProps } from 'react-native';

type MetaDataProps = {
  title?: string;
  url?: string;
  containerProps?: ViewProps;
};

export default function MetaData({
  title,
  url,
  containerProps,
}: MetaDataProps) {
  return (
    <View>
      <Text>{title || 'GIF title not found'}</Text>
      <Text>{url || 'https://giphy.com/'}</Text>
    </View>
  );
}
