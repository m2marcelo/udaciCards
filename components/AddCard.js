import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  DeviceEventEmitter
} from 'react-native';
import { NavigationActions } from 'react-navigation';

import { addCardToDeck } from '../utils/api';
import { black, white } from '../utils/colors'
import TextButton from './TextButton';

class AddCard extends Component {
  state = {
    question: '',
    answer: ''
  };

  createCard = () => {
    const { question, answer } = this.state;
    const { navigation } = this.props;
    const { deckId } = navigation.state.params;

    addCardToDeck(deckId, {question, answer})
      .then(() => {
        DeviceEventEmitter.emit('onDataChangedEvent', {});
        navigation.dispatch(NavigationActions.back());
    });
  };

  render() {
    const { question, answer } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Enter the information required for the new card
        </Text>
        <Text style={styles.label}>
          Question
        </Text>
        <TextInput
          value={question}
          onChangeText={text => this.setState({question: text})} autoFocus={true}
          style={[styles.stretched, styles.cardInput]}
          placeholder="Question"
        />
        <Text style={styles.label}>
          Answer
        </Text>
        <TextInput
          value={answer}
          onChangeText={text => this.setState({answer: text})} style={[styles.stretched, styles.cardInput]}
          placeholder="Answer"
        />
        <TextButton
          disabled={question.length === 0 || answer.length === 0}
          style={[styles.button, styles.buttonBlack]}
          onPress={this.createCard}
        >
          Submit
        </TextButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    alignItems: 'center'
  },
  title: {
    marginBottom: 40,
    fontSize: 25,
    textAlign: 'center'
  },
  label: {
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    fontSize: 16,
    paddingLeft: 5
  },
  cardInput: {
    marginTop: 30,
    width: '90%',
    height: 50,
    fontSize: 18,
    borderColor: black,
    borderWidth: 0.5,
  },
  stretched: {
    alignSelf: 'stretch',
    marginBottom: 30
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
});

export default AddCard;
