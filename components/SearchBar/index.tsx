import { forwardRef } from 'react';
import type { TextInput } from 'react-native';

import AsButton from './AsButton';
import AsInput from './AsInput';

import { SearchBarProps } from '../../@types/globals';

const SearchBar = forwardRef<TextInput, SearchBarProps>((props, ref) => {
  const { asButton, onActivateSearch } = props;

  if (asButton) {
    return <AsButton onActivateSearch={onActivateSearch!} />;
  }

  return <AsInput {...props} ref={ref} />;
});

export default SearchBar;
