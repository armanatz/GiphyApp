import { useRef, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { TextInput } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { SearchBar } from '../components';
import type { RootStackParams } from '../App';

type SearchProps = NativeStackScreenProps<RootStackParams, 'Search'>;

const styles = StyleSheet.create({
  content: {
    marginTop: 25,
  },
});

export default function Search({ navigation }: SearchProps) {
  const searchInputRef = useRef<TextInput | null>(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('transitionEnd', () => {
      if (searchInputRef.current !== null) {
        searchInputRef.current.focus();
      }
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView>
      <SearchBar
        ref={searchInputRef}
        onCancelSearch={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <Text>Search results:</Text>
      </View>
    </SafeAreaView>
  );
}
