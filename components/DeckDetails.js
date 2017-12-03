import React, { Component } from 'react';
import { View, Text, StyleSheet, DeviceEventEmitter } from 'react-native';
import { getDeck } from '../utils/api';
import { black, white } from '../utils/colors'
import TextButton from './TextButton';

class DeckDetails extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.title
    };
  };

  state = {
    deck: null
  };

  componentWillMount() {
    DeviceEventEmitter.addListener('onDataChangedEvent', this.loadDeck);
  }

  componentDidMount() {
    this.loadDeck();
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeListener('onDataChangedEvent', this.loadDeck);
  }

  loadDeck = () => {
    const { deckId } = this.props.navigation.state.params;
    getDeck(deckId).then(deck => this.setState({deck}));
  }

  addCard = () => {
  }

  startQuiz = () => {
  }

  render() {
    const { deck } = this.state

    if (!deck) {
      return (
        <Text>
          Deck not found
        </Text>);
    }

    return (
      <View style={styles.container}>
        <View style={styles.textsContainer}>
          <Text style={styles.title}>
            {this.state.deck.title}
          </Text>
          <Text style={styles.subtitle}>
            {this.state.deck.questions.length} cards
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TextButton onPress={this.addCard} style={[styles.button, styles.buttonWhite]} inverted>
            Add Card
          </TextButton>
          <TextButton
            style={[styles.button, styles.buttonBlack]}
            disabled={deck.questions.length === 0}
            onPress={this.startQuiz}
          >
            Start Quiz
          </TextButton>
        </View>
      </View>
    )
  }
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center'
    },
    textsContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttonsContainer: {
      marginBottom: 25,
      width: 200
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      paddingBottom: 10
    },
    subtitle: {
      color: 'grey',
      fontSize: 20
    },
    button: {
      marginTop: 30,
      fontSize: 25,
      width: 200,
      padding: 15,
      borderColor: black,
      borderRadius: 6,
      borderWidth: 0.5,
    },
    buttonBlack: {
      backgroundColor: black,
      color: white,
    },
    buttonWhite: {
      backgroundColor: white,
      color: black,
    },
  });

export default DeckDetails;