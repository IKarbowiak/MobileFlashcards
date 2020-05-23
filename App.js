import * as React from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import DeckList from './components/DeckList'


export default function App() {
  return (
    <View style={styles.container}>
      <DeckList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
