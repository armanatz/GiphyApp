import { useRef, useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { TextInput } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { SearchBar, SearchResultList } from '../components';

import { useDebounce } from '../hooks';
import { useGIFSearch } from '../hooks/queries';

import type { RootStackParams } from '../@types/globals';

type SearchProps = NativeStackScreenProps<RootStackParams, 'Search'>;

const styles = StyleSheet.create({
  content: {
    marginTop: 25,
  },
});

export default function Search({ navigation }: SearchProps) {
  const [searchValue, setSearchValue] = useState('');
  const debouncedValue = useDebounce(searchValue);

  const searchInputRef = useRef<TextInput | null>(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('transitionEnd', () => {
      if (searchInputRef.current !== null) {
        searchInputRef.current.focus();
      }
    });

    return unsubscribe;
  }, [navigation]);

  const {
    data: searchResults,
    status: searchResultsStatus,
    isFetching,
  } = useGIFSearch(
    { searchQuery: debouncedValue },
    { enabled: debouncedValue.length >= 2 },
  );

  return (
    <SafeAreaView>
      <SearchBar
        ref={searchInputRef}
        onCancelSearch={() => navigation.goBack()}
        onChangeText={value => setSearchValue(value)}
      />
      <View style={styles.content}>
        {searchResultsStatus === 'success' ? (
          <Text>Search results:</Text>
        ) : null}
        {searchResults?.data && searchResults?.data.length === 0 ? (
          <Text>No GIFs Found</Text>
        ) : null}
        <SearchResultList
          data={searchResults?.data}
          dataIsLoading={!isFetching}
        />
      </View>
    </SafeAreaView>
  );
}
