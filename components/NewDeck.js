import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, Platform } from 'react-native'
import { black, white } from '../utils/colors'
import TextButton from './TextButton'

class NewDeck extends Component{
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.newDeckHeader}>
          What is the title of your new deck?
        </Text>
        <TextInput
          style={styles.deckTitle}
          placeholder="Deck title"
        />
      <TextButton
        style={[styles.button, styles.buttonBlack]}
        onPress={console.log('oi')}>
          Submit
      </TextButton>
      </View>
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
