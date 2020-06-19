import React, {Component} from 'react'
import {View, StyleSheet, ScrollView, TouchableOpacity, Animated} from 'react-native'
import {AppLoading} from 'expo'
import {connect} from 'react-redux'

import { white } from '../utils/colors'
import {handleInitialData} from '../actions/shared'


class DeckList extends Component {
  state = {
    bounceValues: [],
  }
  componentDidMount() {
    const {dispatch} = this.props
    dispatch(handleInitialData())
  }

  goToDeckView = (key, index) => {
    const {bounceValues} = this.state

    this.props.navigation.navigate(
      'DeckView', {'deckId': key}
    )
  }

  render() {
    const {decks, loading} = this.props
    let {bounceValues} = this.state
    
    if (loading == true) {
      return <AppLoading/>
    }

    return (
      <ScrollView style={styles.container}>
        {decks.map((deck, index) => {
          const key = deck.title
          return (
            <TouchableOpacity key={key} onPress={() => this.goToDeckView(key, index)}>
              <View style={styles.deckInfo}>
                  <Animated.Text style={[styles.deckTitle]}>
                    {deck.title}
                  </Animated.Text>
                  <Animated.Text style={[styles.cardsInfo]}>
                    {deck.questions.length} cards
                  </Animated.Text>
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


function mapStateToProps({decks}) {
  const loading = Object.keys(decks).length === 0
  return {
    loading,
    decks: loading ? decks : Object.values(decks).sort((a, b) => a.title.localeCompare(b.title)),
  }
}

export default connect(mapStateToProps)(DeckList)
