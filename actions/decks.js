export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'
export const REMOVE_DECK = 'REMOVE_DECK'
export const REMOVE_CARD_FROM_DECK = 'REMOVE_CARD_FROM_DECK'


export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export function addDeck(title) {
  return {
    type: ADD_DECK,
    title,
  }
}

export function addCardToDeck(deckId, cardId) {
  return {
    type: ADD_CARD_TO_DECK,
    deckId,
    cardId,
  }
}

export function removeDeck(title) {
  return {
    type: REMOVE_DECK,
    title,
  }
}

export function removeCardFromDeck(deckId, cardId) {
  return {
    type: REMOVE_CARD_FROM_DECK,
    deckId,
    cardId,
  }
}
