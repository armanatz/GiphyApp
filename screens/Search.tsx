import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import SearchBar from '../components/SearchBar';
import type { RootStackParams } from '../App';

type SearchProps = NativeStackScreenProps<RootStackParams, 'Search'>;

const styles = StyleSheet.create({
  content: {
    marginTop: 25,
  },
});

export default function Search({ navigation }: SearchProps) {
  return (
    <SafeAreaView>
      <SearchBar onCancelSearch={() => navigation.goBack()} />
      <View style={styles.content}>
        <Text>Search results:</Text>
      </View>
    </SafeAreaView>
  );
}
