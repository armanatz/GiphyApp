import { Text, TouchableHighlight, View } from 'react-native';
import type { ViewProps } from 'react-native';

import { renderTitleOrUrl } from '../../utils';

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
    <View {...containerProps}>
      <Text>{renderTitleOrUrl({ type: 'title', text: title })}</Text>
      <Text>{renderTitleOrUrl({ type: 'url', text: url })}</Text>
    </View>
  );
}
