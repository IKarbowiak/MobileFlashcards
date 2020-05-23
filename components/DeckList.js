import React, {Component} from 'react'
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native'
import {AppLoading} from 'expo'

import {getDecks} from '../utils/api'


class DeckList extends Component {
  state = {
    decks: {},
    ready: false,
  }
  componentDidMount() {
    getDecks()
      .then((decks) => {
        this.setState({
          decks
        })
      })
      .then(() => {
        this.setState({
          ready: true
        })
      })
  }

  render() {
    const {decks, ready} = this.state
    
    if (ready === false) {
      return <AppLoading/>
    }

    return (
      <ScrollView style={styles.container}>
        {Object.keys(decks).map((key) => {
          const deck = decks[key]
          return (
            <TouchableOpacity onPress={() => console.log('Pressed')}>
              <View key={key} style={styles.deckInfo}>
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
    backgroundColor: '#F5FCFF',
    marginTop: 10,
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

export default DeckList
