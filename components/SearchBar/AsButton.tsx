import { Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import commonStyles from './commonStyles';

export default function AsButton({
  onActivateSearch,
}: {
  onActivateSearch: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onActivateSearch}
      style={commonStyles.container}
      activeOpacity={1}
      accessibilityHint="Search for GIFs"
    >
      <View style={commonStyles.inputContainer}>
        <Ionicons name="search" size={22} />
        <Text style={commonStyles.text}>Search</Text>
      </View>
    </TouchableOpacity>
  );
}
