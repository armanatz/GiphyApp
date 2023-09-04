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
  const truncatedTitle = renderTitleOrUrl({ type: 'title', text: title });
  const truncatedUrl = renderTitleOrUrl({ type: 'url', text: url });

  return (
    <View {...containerProps}>
      <Text accessibilityLabel={`Title of GIF is ${truncatedTitle}`}>
        {truncatedTitle}
      </Text>
      <Text accessibilityLabel={`URL of GIF is ${truncatedUrl}`}>
        {truncatedUrl}
      </Text>
    </View>
  );
}
