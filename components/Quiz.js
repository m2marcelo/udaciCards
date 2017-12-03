import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import FlipCard from 'react-native-flip-card';
import { getDeck } from '../utils/api';
import { black, green, red, white } from '../utils/colors';

import TextButton from './TextButton';

class Quiz extends Component {
  state = {
    deck: null,
    currentQuestion: 0,
    score: 0
  }

  componentDidMount() {
    this.loadDeck();
  }

  loadDeck = () => {
    const { deckId } = this.props.navigation.state.params;
    getDeck(deckId).then(deck => this.setState({deck}));
  }

  goBack = () => {
    this.props.navigation.dispatch(NavigationActions.back());
  }

  restartQuiz = () => {
    this.setState({
      currentQuestion: 0,
      score: 0
    });
  };

  saveResult(correct = false) {
    this.setState(({score, currentQuestion, deck}) => {
      const newScore = correct ? score + 1 : score;
      const nextQuestion = currentQuestion + 1;

      return {
      currentQuestion: nextQuestion,
      score: newScore
      }
    })
  };

  render() {
    const { deck, currentQuestion, score } = this.state;

    if (!deck) {
      return (<Text>Deck not found</Text>);
    }

    const question = deck.questions[currentQuestion];
    const questonsCount = deck.questions.length;
    const showScore = currentQuestion === deck.questions.length;

    return (
      <View style={styles.container}>
        {!showScore && <Text style={styles.topLeftText}>{currentQuestion + 1} / {questonsCount}</Text>}
        <View style={styles.textsContainer}>
          <View style={{height: 0}}>
            <FlipCard style={{borderWidth: 0}}>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.subtitle}>Question</Text>
                <Text style={styles.title}>{question.question}</Text>
                <Text>Show answer</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.subtitle}>Answer:</Text>
                <Text style={styles.title}>{question.answer}</Text>
                <Text>Show question</Text>
              </View>
            </FlipCard>
          </View>
        </View>
        <View style={styles.buttonsContainer}>
        <View>
          <TextButton
            onPress={() => this.saveResult(true)}
            style={[styles.button, styles.buttonGreen]}
          >
            Correct
          </TextButton>
          <TextButton
            onPress={() => this.saveResult()}
            style={[styles.button, styles.buttonRed]}
          >
            Incorrect
          </TextButton>
        </View>
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
    alignItems: 'center',
    marginTop: 50
  },
  buttonsContainer: {
    marginBottom: 25,
    width: 200
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 25,
    textAlign: 'center'
  },
  subtitle: {
    color: 'grey',
    fontSize: 14
  },
  coloredButton: {
    borderWidth: 0
  },
  topLeftText: {
    alignSelf: 'flex-start',
    padding: 13,
    fontSize: 17
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
  buttonRed: {
    backgroundColor: red,
    color: white,
  },
  buttonGreen: {
    backgroundColor: green,
    color: white,
  },
});

export default Quiz;
