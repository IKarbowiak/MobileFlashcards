import {AsyncStorage} from 'react-native'

export const DECKS_STORAGE_KEY = 'MobileFlashcards:decks'
export const QUESTIONS_STORAGE_KEY = 'MobileFlashcards:questions'


function setDefaultQuestions() {
  const defaultQuestions = {
    'j9a25jh3y8f0txojxvldhrn': {
      id: 'j9a25jh3y8f0txojxvldhrn',
      question: 'What is React?',
      answer: 'A library for managing user interfaces',
    },
    'a5ahdddc5d95a2okwhp3i4': {
      id: 'a5ahdddc5d95a2okwhp3i4',
      question: 'Where do you make Ajax requests in React?',
      answer: 'The componentDidMount lifecycle event',
    },
    'oi5qx1abhdcecp6e08977m': {
      id: 'oi5qx1abhdcecp6e08977m',
      question: 'What is a closure?',
      answer: 'The combination of a function and the lexical environment within which that function was declared.',
    },
  }

  AsyncStorage.setItem(QUESTIONS_STORAGE_KEY, JSON.stringify(defaultQuestions))

  return defaultQuestions
}

function setDefaultDecks() {
  const defaultDecks = {
    React: {
      title: 'React',
      questions: ['j9a25jh3y8f0txojxvldhrn', 'a5ahdddc5d95a2okwhp3i4']
    },
    JavaScript: {
      title: 'JavaScript',
      questions: ['oi5qx1abhdcecp6e08977m']
    }
  }
  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(defaultDecks))

  return defaultDecks
}

export function _getQuestions() {
  return AsyncStorage.getItem(QUESTIONS_STORAGE_KEY).then(
    (questions) => {
      return questions === null
      ? setDefaultQuestions()
      : JSON.parse(questions)
    }
  )
}

export function _getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(
    (decks) => {
      return decks === null
      ? setDefaultDecks()
      : JSON.parse(decks)
    }
  )
}
