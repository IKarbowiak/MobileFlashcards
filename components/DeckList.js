import React, {Component} from 'react'
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native'
import {AppLoading} from 'expo'
import {connect} from 'react-redux'

import {getDecks} from '../utils/api'
import { white } from '../utils/colors'
import {receiveDecks} from '../actions'


class DeckList extends Component {
  state = {
    ready: false,
  }
  componentDidMount() {
    const {dispatch} = this.props
    getDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then(() => {
        this.setState({
          ready: true
        })
      })
  }

  render() {
    const {decks} = this.props
    const {ready} = this.state
    
    if (ready === false) {
      return <AppLoading/>
    }

    return (
      <ScrollView style={styles.container}>
        {Object.keys(decks).map((key) => {
          const deck = decks[key]
          return (
            <TouchableOpacity key={key} onPress={() => this.props.navigation.navigate(
              'DeckView', {'deckId': key}
            )}>
              <View style={styles.deckInfo}>
                  <Text style={styles.deckTitle}>{deck.title}</Text>
                  <Text style={styles.cardsInfo}>{deck.questions.length} cards</Text>
              </View>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  deckInfo: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    padding: 30,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  deckTitle: {
    fontSize: 35,
  },
  cardsInfo: {
    fontSize: 20,
    color: '#A9A9A9',
    textAlign: 'center',
  }
})


function mapStateToProps(decks) {
  // TODO: sort
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckList)
