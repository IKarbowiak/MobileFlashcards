import {getInitialData} from '../utils/api'
import {receiveCards} from './cards'
import {receiveDecks} from './decks'


export function handleInitialData() {
  return (dispatch) => {
    return getInitialData().then(({decks, cards}) => {
      dispatch(receiveCards(cards))
      dispatch(receiveDecks(decks))
    })
  }
}
