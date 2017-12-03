import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  KeyboardAvoidingView
} from 'react-native'
import { black, white } from '../utils/colors'
import TextButton from './TextButton'
import { saveDeckTitle } from '../utils/api';
import { NavigationActions } from 'react-navigation'


class NewDeck extends Component{
  state = {
        deckTitle: ''
    };

  createDeck = () => {
    saveDeckTitle(this.state.deckTitle)
      .then(deck => {
        const resetAction = NavigationActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({ routeName: 'Home' }),
            NavigationActions.navigate({ routeName: 'DeckDetails', params: {deckId: deck.key, title: deck.title}})
          ]
        })
        this.props.navigation.dispatch(resetAction);
      }
    )
  }

  render() {
    return (
      <KeyboardAvoidingView behavior={'padding'} style={{flex: 1}}>
        <View style={styles.container}>
          <Text style={styles.newDeckHeader}>
            What is the title of your new deck?
          </Text>
          <TextInput
            style={styles.deckTitle}
            placeholder="Deck title"
            onChangeText={text => this.setState({deckTitle: text})}
            autoFocus={true}
          />
          <TextButton
          style={[styles.button, styles.buttonBlack]}
          onPress={this.createDeck}>
            Submit
          </TextButton>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newDeckHeader: {
    fontSize: 50,
    textAlign: 'center',
  },
  deckTitle: {
    marginTop: 30,
    width: '90%',
    height: 50,
    fontSize: 18,
    borderColor: black,
    borderWidth: 0.5,
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
})

export default NewDeck
