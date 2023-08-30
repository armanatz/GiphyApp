import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { SearchBar } from '../components';
import type { RootStackParams } from '../App';

type HomeProps = NativeStackScreenProps<RootStackParams, 'Home'>;

const styles = StyleSheet.create({
  content: {
    marginTop: 25,
  },
});

export default function Home({ navigation }: HomeProps) {
  return (
    <SafeAreaView>
      <SearchBar
        asButton
        onActivateSearch={() => navigation.navigate('Search')}
      />
      <View style={styles.content}>
        <Text>Random selected GIF:</Text>
      </View>
    </SafeAreaView>
  );
}
