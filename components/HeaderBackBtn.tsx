import { TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type HeaderBackBtnProps = {
  onPress?: () => void;
};

export default function HeaderBackBtn({ onPress }: HeaderBackBtnProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
      accessibilityHint="Go back to search"
    >
      <View>
        <Ionicons name="arrow-back" size={22} />
      </View>
    </TouchableOpacity>
  );
}
