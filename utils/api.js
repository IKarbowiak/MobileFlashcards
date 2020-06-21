import {AsyncStorage} from 'react-native'
import {DECKS_STORAGE_KEY, _getQuestions, _getDecks, QUESTIONS_STORAGE_KEY} from './_decks'
import {generateUID} from './helpers'


export function getInitialData() {
  return Promise.all([
    _getQuestions(),
    _getDecks(),
  ]).then(([cards, decks]) => ({
    decks,
    cards,
  }))
}

export function saveCard(deckId, {question, answer}) {
  return saveQuestion(question, answer).then(
    (card) => (
      submitCard(deckId, card.id).then(
        () => card
      )
    )
  )
}

export function saveQuestion(question, answer) {
    const cardId = generateUID()
    const card = {
      id: cardId,
      question,
      answer,
    }
    const data = {
      cardId: card
    }
    return AsyncStorage.mergeItem(QUESTIONS_STORAGE_KEY, JSON.stringify({
      [cardId]: card
    })).then(() => card)
}

export function submitCard(deckId, cardId) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      const deck = data[deckId]
      deck.questions.push(cardId)
      AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [deckId]: deck
      }))
    })
}

export function dropCard(deckId, cardId) {
  return removeCard(cardId).then(
    () => removeCardFromDeck(deckId, cardId)
  )
}

function removeCard(cardId) {
  return AsyncStorage.getItem(QUESTIONS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      delete data[cardId]
      AsyncStorage.setItem(QUESTIONS_STORAGE_KEY, JSON.stringify(data))
    })
}

function removeCardFromDeck(deckId, cardId) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[deckId].questions = data[deckId].questions.filter(item => item !== cardId)
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
    })
}

export function dropDeck(key) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      delete data[key]
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
    })
}

export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(handleDecks)
}

export function getDeck(id) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      const deck = data[id]
      return deck
    })
}

export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [title]: {
      title: title,
      questions: []
    }
  }))
}