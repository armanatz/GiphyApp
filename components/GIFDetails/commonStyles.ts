import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  imageContainer: {
    height: 350,
    width: '100%',
    marginVertical: 10,
  },
  descriptionContainer: {
    flexDirection: 'row',
    gap: 20,
    maxWidth: '100%',
    justifyContent: 'space-between',
  },
  ratingCircle: {
    alignItems: 'center',
    backgroundColor: 'grey',
    borderRadius: 50,
    height: 65,
    justifyContent: 'center',
    width: 65,
  },
});
