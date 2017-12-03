import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Platform,
  FlatList,
  DeviceEventEmitter
} from 'react-native'
import { getDecks } from '../utils/api';
import DeckItem from './DeckItem';

class DeckListView extends Component {
  state = {
      decks: null
  };

  componentWillMount() {
      DeviceEventEmitter.addListener('onDataChangedEvent', this.loadDecks);
  }

  componentDidMount() {
      this.loadDecks();
  }

  componentWillUnmount() {
      DeviceEventEmitter.removeListener('onDataChangedEvent', this.loadDecks);
  }

  loadDecks = () => getDecks().then(data => this.setState({decks: data}));

  render() {
    const { decks } = this.state;

    if (!decks) {
      return (<Text>There is no deck</Text>);
    }

    const data = Object.keys(decks).map(keyId => {
      return {
        ...decks[keyId],
        key: keyId
      }
    });

    return (
      <FlatList
        style={{flex: 1}}
        data={data}
        renderItem={
          ({item}) => (
          <DeckItem onPressItem={console.log('decks pressed')} item={item}/>)
        }
      />
    )
  }
}

export default DeckListView
