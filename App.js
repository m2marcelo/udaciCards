import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NewDeck from './components/NewDeck'
import DeckListView from './components/DeckListView'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <DeckListView />
        <NewDeck />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
