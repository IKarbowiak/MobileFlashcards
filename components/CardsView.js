import React, {Component} from 'react'
import {View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, TouchableHighlight} from 'react-native'
import {connect} from 'react-redux'
import { white } from '../utils/colors'
import { AntDesign, EvilIcons } from '@expo/vector-icons'
import {handleDeleteCard} from '../actions/cards'
import UpdateCardModal  from './UpdateCardModal'


class Item extends Component {
  state = {
    modalVisible: false,
  }

  setModalVisible = () => {
    this.setState({
      modalVisible: true,
    })
  }

  closeModal = () => {
    this.setState({
      modalVisible: false,
    })
  }
  render() {
    const {card, deleteFunc} = this.props
    const {modalVisible} = this.state
    return (
      <View style={styles.itemCont}>
        <UpdateCardModal
          modalVisible={modalVisible}
          closeModal={this.closeModal}
          card={card}
        />
        <View style={styles.item}>
          <Text style={styles.question}>{card.question}</Text>
          <Text style={styles.answer}>{card.answer}</Text>
        </View>
        <View style={styles.options}>
          <TouchableOpacity key={`${card}-manage`} onPress={this.setModalVisible}>
            <AntDesign
              name="edit"
              size={24}
              color="black"
              style={{marginHorizontal: 8}}
            />
          </TouchableOpacity>
          <TouchableOpacity key={`${card}-del`} onPress={() => deleteFunc(card)}>
            <EvilIcons
              name="trash"
              size={30}
              color="black"
              style={{marginHorizontal: 8}}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}


class CardsView extends Component {
  deleteCard = (card) => {
    const {deck, dispatch} = this.props
    dispatch(handleDeleteCard(deck.title, card))
  }

  render() {
    const {deck, cards} = this.props
    return (
      <View style={styles.container}>
        <View style={styles.titleCont}>
          <Text style={styles.title}>{deck.title}</Text>
        </View>
        <FlatList
          data={deck.questions}
          renderItem={({ item }) => (
            <View>
              <Item
                card={cards[item]}
                deleteFunc={this.deleteCard}
              />
            </View>
          )
          }
          keyExtractor={item => item}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    justifyContent: 'center',
  },
  itemCont: {
    flexDirection: 'row',
    alignItems: 'center', 
    flex: 1,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  titleCont: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 35,
    textAlign: 'center',
    marginVertical: 15,
  },
  item: {
    flex: 4,
    alignSelf: 'flex-start',
    paddingVertical: 30,
    marginHorizontal: 10,
  },
  options: {
    flex: 1,
    flexDirection: 'row',
    marginRight: 10,
  },
  question: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  answer: {
    fontSize: 15,
  },
})

function mapStateToProps({decks, cards}, {route}) {
  const {deckId} = route.params
  return {
    deck: decks[deckId],
    cards,
  }
}

export default connect(mapStateToProps)(CardsView)
