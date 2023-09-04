import { forwardRef, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import commonStyles from './commonStyles';

import { PLACEHOLDER_TEXT_COLOR } from './consts';

import { SearchBarProps } from '../../@types/globals';

const styles = StyleSheet.create({
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

const AsInput = forwardRef<TextInput, SearchBarProps>(
  ({ onCancelSearch, onChangeText }, ref) => {
    const [inputValue, setInputValue] = useState<string>('');

    useEffect(() => {
      if (onChangeText) {
        onChangeText(inputValue);
      }
    }, [inputValue]);

    function clearInput() {
      return setInputValue('');
    }

    function handleCancel() {
      clearInput();
      onCancelSearch?.();
    }

    return (
      <View style={commonStyles.container}>
        <View style={commonStyles.inputContainer}>
          <Ionicons name="search" size={22} />
          <TextInput
            placeholder="Search"
            style={styles.input}
            placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
            value={inputValue}
            onChangeText={setInputValue}
            ref={ref}
            accessibilityHint="Search for GIFs"
          />
          {inputValue.length > 0 && (
            <TouchableOpacity
              onPress={clearInput}
              activeOpacity={0.5}
              accessibilityHint="Clear search"
            >
              <View style={styles.closeIcon}>
                <Ionicons name="close-circle" size={18} />
              </View>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity onPress={handleCancel} activeOpacity={0.5}>
          <View style={styles.cancelBtn}>
            <Text>Cancel</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  },
);

export default AsInput;
