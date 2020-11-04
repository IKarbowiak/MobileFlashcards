import React, {Component} from 'react'
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import { white } from '../utils/colors'
import { AntDesign, EvilIcons } from '@expo/vector-icons'
import {handleDeleteCard} from '../actions/cards'
import UpdateCardModal  from './UpdateCardModal'
import DeleteModal from './DeleteModal'


class Item extends Component {
  state = {
    updateModalVisible: false,
    deleteModalVisible: false,
  }

  setModalVisible = (item) => {
    this.setState({
      [item]: true,
    })
  }

  closeUpdateModal = () => {
    this.setState({
      updateModalVisible: false,
    })
  }

  closeDeleteModal = () => {
    this.setState({
      deleteModalVisible: false,
    })
  }

  render() {
    const {card, deleteFunc} = this.props
    const {updateModalVisible, deleteModalVisible} = this.state
    return (
      <View style={styles.itemCont}>
        <UpdateCardModal
          modalVisible={updateModalVisible}
          closeModal={this.closeUpdateModal}
          card={card}
        />
        <DeleteModal
          modalVisible={deleteModalVisible}
          closeModal={this.closeDeleteModal}
          deleteFunc={deleteFunc}
          type='card'
          item={card}
        />
        <View style={styles.item}>
          <Text style={styles.question}>{card.question}</Text>
          <Text style={styles.answer}>{card.answer}</Text>
        </View>
        <View style={styles.options}>
          <TouchableOpacity
            key={`${card}-manage`}
            onPress={() => this.setModalVisible('updateModalVisible')}
          >
            <AntDesign
              name="edit"
              size={24}
              color="black"
              style={{marginHorizontal: 8}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            key={`${card}-del`}
            onPress={() => this.setModalVisible('deleteModalVisible')}
          >
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
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => this.props.navigation.navigate(
            'AddCard', {'deckId': deck.title}
          )}
        >
          <AntDesign
              name="pluscircle"
              size={40}
              color="black"
              style={{marginHorizontal: 8}}
          />
        </TouchableOpacity>
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
  addBtnTxt : {
    color: white,
    fontSize: 30,
    marginBottom: 5
  },
  addBtn: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 40,
    right: 20,
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
