import { StyleSheet } from 'react-native';

import { PLACEHOLDER_TEXT_COLOR } from './consts';

export default StyleSheet.create({
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
    color: PLACEHOLDER_TEXT_COLOR,
    fontSize: 16,
  },
});
