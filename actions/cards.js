import {addCardToDeck, removeCardFromDeck} from './decks'
import {saveCard, dropCard, cardUpdate} from '../utils/api'

export const RECEIVE_CARDS = 'RECEIVE_CARDS'
export const ADD_CARD = 'ADD_CARD'
export const REMOVE_CARD = 'REMOVE_CARD'
export const UPDATE_CARD = 'UPDATE_CARD'


export function receiveCards(cards) {
  return {
    type: RECEIVE_CARDS,
    cards,
  }
}

export function addCard(card) {
  return {
    type: ADD_CARD,
    card,
  }
}

export function removeCard(cardId) {
  return {
    type: REMOVE_CARD,
    cardId
  }
}

export function updateCard(cardId, newQuestion, newAnswer) {
  return {
    type: UPDATE_CARD,
    cardId,
    newQuestion,
    newAnswer,
  }
}

export function handleAddCard(deckId, card) {
  return (dispatch, _) => {
    return saveCard(deckId, card)
      .then((card) => {
        dispatch(addCard(card))
        dispatch(addCardToDeck(deckId, card.id))
      })
  }
}

export function handleDeleteCard(deckId, card) {
  return (dispatch, _) => {
    const cardId = card.id
    dispatch(removeCard(cardId))
    dispatch(removeCardFromDeck(deckId, cardId))
    return dropCard(deckId, cardId)
      .catch((e) => {
        console.warn('Error in handleDeleteCard', e)
        dispatch(addCard(card))
        dispatch(addCardToDeck(deckId, cardId))
        alert('There was an error deleting card. Try again.')
      })
  }
}

export function handleUpdateCard(cardId, newQuestion, newAnswer) {
  return (dispatch, getState) => {
    dispatch(updateCard(cardId, newQuestion, newAnswer))
    const {cards} = getState()
    return cardUpdate(cardId, newQuestion, newAnswer)
      .catch((e) => {
        console.warn('Error in handleUpdateCard', e)
        const card = cards[cardId]
        dispatch(updateCard(cardId, card.question, card.answer))
        alert('There was an error updating card. Try again.')
      })
  }
}
