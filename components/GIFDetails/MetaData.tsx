import { Text, TouchableHighlight, View } from 'react-native';
import type { ViewProps } from 'react-native';
import { truncateText } from '../../utils';

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
  function renderTitle() {
    if (!title) {
      return 'GIF has no title';
    }

    return title.length >= 30 ? truncateText(title, 30) : title;
  }

  function renderUrl() {
    if (!url) {
      return 'GIF has no URL';
    }

    return url.length >= 30 ? truncateText(url, 30) : url;
  }

  return (
    <View {...containerProps}>
      <Text>{renderTitle()}</Text>
      <Text>{renderUrl()}</Text>
    </View>
  );
}
