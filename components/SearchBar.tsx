import { useState, forwardRef, LegacyRef } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface SearchBarProps {
  asButton?: boolean;
  onActivateSearch?: () => void;
  onCancelSearch?: () => void;
}

const placeholderTextColor = '#545454';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    alignContent: 'center',
  },
  inputContainer: {
    alignItems: 'center',
    borderColor: '#3c3c3c',
    borderRadius: 5,
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    height: 48,
    paddingHorizontal: 10,
    gap: 8,
  },
  text: {
    color: placeholderTextColor,
    fontSize: 16,
  },
  input: {
    flex: 2,
    fontSize: 16,
    height: 40,
  },
  closeIcon: {
    height: 20,
    width: 20,
  },
  cancelBtn: {
    padding: 10,
  },
});

const SearchBar = forwardRef(function SearchBar(
  props: SearchBarProps,
  ref: LegacyRef<TextInput> | undefined,
) {
  const { asButton, onActivateSearch, onCancelSearch } = props;

  const [inputValue, setInputValue] = useState<string>('');

  function onActivateBtnPress() {
    if (onActivateSearch) {
      return onActivateSearch();
    }
  }

  function onInputTextChange(value: string) {
    setInputValue(value);
  }

  function onClearBtnPress() {
    setInputValue('');
  }

  function onCancelBtnPress() {
    setInputValue('');

    if (onCancelSearch) {
      return onCancelSearch();
    }
  }

  if (asButton) {
    return (
      <TouchableOpacity
        onPress={onActivateBtnPress}
        style={styles.container}
        activeOpacity={1}
      >
        <View style={styles.inputContainer}>
          <Ionicons name="search" size={22} />
          <Text style={styles.text}>Search</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Ionicons name="search" size={22} />
        <TextInput
          placeholder="Search"
          style={styles.input}
          placeholderTextColor={placeholderTextColor}
          value={inputValue}
          onChangeText={onInputTextChange}
          ref={ref}
        />
        {inputValue.length !== 0 ? (
          <TouchableOpacity onPress={onClearBtnPress} activeOpacity={0.5}>
            <View style={styles.closeIcon}>
              <Ionicons name="close-circle" size={18} />
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
      <TouchableOpacity onPress={onCancelBtnPress} activeOpacity={0.5}>
        <View style={styles.cancelBtn}>
          <Text>Cancel</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
});

export default SearchBar;
