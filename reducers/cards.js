import {RECEIVE_CARDS, ADD_CARD, REMOVE_CARD, UPDATE_CARD} from '../actions/cards'

export default function cards(state={}, action) {
  switch(action.type) {
    case RECEIVE_CARDS :
      return {
        ...state,
        ...action.cards,
      }
    case ADD_CARD :
      return {
        ...state,
        [action.card.id]: action.card
      }
    case REMOVE_CARD :
      delete state[action.cardId]
      return {
        ...state
      }
    case UPDATE_CARD :
      return {
        ...state,
        [action.cardId]: {
          ...state[action.cardId],
          question: action.newQuestion,
          answer: action.newAnswer
        }
      }
    default :
      return state
  }
}
