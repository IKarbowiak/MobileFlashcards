import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native'
import {connect} from 'react-redux'
import {CommonActions} from '@react-navigation/native'
import {AppLoading} from 'expo'
import { FontAwesome, EvilIcons } from '@expo/vector-icons'

import {white} from '../utils/colors'
import {removeDeck} from '../actions/decks'
import {dropDeck} from '../utils/api'
import DeleteModal from './DeleteModal'


class DeckView extends Component {
  state = {
    modalDeleteVisible: false,
  }

  delete = (deck) => {
    const {dispatch} = this.props
    const title = deck.title
    dispatch(removeDeck(title))

    this.props.navigation.dispatch(
      CommonActions.goBack({
          key: 'Decks',
      }))

    dropDeck(title)

  }

  openModal = () => {
    this.setState({
      modalDeleteVisible: true,
    })
  }

  closeModal = () => {
    this.setState({
      modalDeleteVisible: false,
    })
  }

  startQuiz = () => {
    const {deck} = this.props
    if (deck.questions.length === 0) {
      alert('Deck must have at least one question to start a quiz.')
      return
    }
    this.props.navigation.navigate(
      'Quiz', {'deckId': deck.title}
    )
  }
  render () {
    const {modalDeleteVisible} = this.state
    const {deck} = this.props

    if (deck === undefined) {
      return <AppLoading/>
    }

    return (
      <View style={styles.container}>
        <DeleteModal
          modalVisible={modalDeleteVisible}
          closeModal={this.closeModal}
          deleteFunc={this.delete}
          type='deck'
          item={deck}
        />
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <Text style={styles.text}>{deck.title}</Text>
          <Text style={styles.cardsInfo}>{deck.questions.length} cards</Text>
          <TouchableOpacity
            style={[styles.btnCont, {backgroundColor: white, borderWidth: 1, borderColor: 'black'}]}
            onPress={() => this.props.navigation.navigate(
              'AddCard', {'deckId': deck.title}
            )}
          >
            <Text style={[styles.btnText, {color: 'black'}]}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnCont, {backgroundColor: 'black'}]}
            onPress={this.startQuiz}
          >
            <Text style={styles.btnText}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 50}}>
          <TouchableOpacity onPress={this.openModal} >
            <EvilIcons
                name="trash"
                size={50}
                color="red"
                style={{marginHorizontal: 20}}
              />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate(
              'CardsView', {'deckId': deck.title}
            )}
          >
            <FontAwesome
              name="edit"
              size={40}
              color="black"
              style={{marginHorizontal: 20}}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 40,
    textAlign: 'center',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: Platform.OS === 'ios' ? 8 : 2,
    padding: 5,
  },
  btnCont: {
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 100,
    marginVertical: 10,
  },
  btnText: {
    fontSize: 20,
    color: white,
    textAlign: 'center'
  },
  cardsInfo: {
    fontSize: 20,
    color: '#A9A9A9',
    textAlign: 'center',
    paddingBottom: 20,
  },
})


function mapStateToProps({decks}, {route}) {
  const {deckId} = route.params
  return {
    deck: decks[deckId],
  }
}

export default connect(mapStateToProps)(DeckView)
