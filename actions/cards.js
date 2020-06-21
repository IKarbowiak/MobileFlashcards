import {addCardToDeck, removeCardFromDeck} from './decks'
import {saveCard, dropCard} from '../utils/api'

export const RECEIVE_CARDS = 'RECEIVE_CARDS'
export const ADD_CARD = 'ADD_CARD'
export const REMOVE_CARD = 'REMOVE_CARD'


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
