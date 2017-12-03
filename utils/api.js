import { AsyncStorage } from 'react-native';
import Uuid from 'uuid-lib';

const UDACICARDS_DB_KEY = 'UdaciCards:marcelo';

const initialData = {
  React: {
    title: 'React',
    questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
    ]
  }
}

export function getDecks() {
  return AsyncStorage.getItem(UDACICARDS_DB_KEY).then(data => {
    if (!data) {
      AsyncStorage.setItem(UDACICARDS_DB_KEY, JSON.stringify(initialData))
      return initialData
    } else {
      return JSON.parse(data)
    }
  }).catch(e => {
    console.log('Error when getting the decks from AsyncStorage', e)
    return null
  })
}

export function getDeck(id) {
  return AsyncStorage.getItem(UDACICARDS_DB_KEY).then(data => {
    const decks = JSON.parse(data) || {};
    return decks[id];
  }).catch(e => {
    console.log(`Error when getting deck "${id}" from AsyncStorage`, e);
    return null;
  });
}

export function saveDeckTitle(title) {
  return AsyncStorage.getItem(UDACICARDS_DB_KEY).then(data => {
    const storedData = JSON.parse(data);

    const deckId = Uuid.raw();
    storedData[deckId] = {
      title,
      questions: []
    };

    return AsyncStorage.setItem(UDACICARDS_DB_KEY, JSON.stringify(storedData))
      .then(() => {
        return { key: deckId, title };
      })
  }).catch(e => {
    console.log('Error saving new deck into AsyncStorage', e);
    return null;
  });
}

export function addCardToDeck(id, card) {
  return AsyncStorage.getItem(UDACICARDS_DB_KEY).then(data => {
    const storedData = JSON.parse(data);
    storedData[id].questions.push(card);
    return AsyncStorage.setItem(UDACICARDS_DB_KEY, JSON.stringify(storedData));
  }).catch(e => {
      console.log('Error adding card into AsyncStorage', e);
      return null;
  });
}
