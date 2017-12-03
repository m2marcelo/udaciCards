import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import FlipCard from 'react-native-flip-card';
import { getDeck } from '../utils/api';
import { black, green, grey, red, white } from '../utils/colors';

import TextButton from './TextButton';
import Results from './Results';

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
          {showScore ? (
            <Results percentage={ parseInt(score / questonsCount * 100) }/>
          ) : (
          <View style={{height: 0}}>
            <FlipCard style={{borderWidth: 0}}>
              <View style={{alignItems: 'center'}}>
               <Text style={styles.textToFlip}>Press here to show the answer</Text>
                <Text style={styles.title}>{question.question}</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.textToFlip}>Press here to show the question</Text>
                <Text style={styles.title}>{question.answer}</Text>
              </View>
            </FlipCard>
          </View>
        )}
        </View>
        <View style={styles.buttonsContainer}>
        {showScore ? (
          <View>
            <TextButton
              onPress={this.goBack}
              style={[styles.button, styles.buttonWhite]}
              inverted>
              Back to Deck
            </TextButton>
            <TextButton
              onPress={this.restartQuiz}
              style={[styles.button, styles.buttonBlack]}
            >
              Restart Quiz
            </TextButton>
          </View>
          ) : (
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
        )}
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
  textToFlip: {
    color: red,
    fontSize: 18,
    fontWeight: 'bold'
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
  buttonBlack: {
    backgroundColor: black,
    color: white,
  },
  buttonWhite: {
    backgroundColor: white,
    color: black,
  },
});

export default Quiz;
