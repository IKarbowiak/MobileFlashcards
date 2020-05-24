import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'

import {white} from '../utils/colors'


class DeckView extends Component {
  render () {
    const {deckId} = this.props.route.params
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{deckId}</Text>
        <Text style={styles.cardsInfo}>XYZ cards</Text>
        <TouchableOpacity
          style={[styles.btnCont, {backgroundColor: white, borderWidth: 1, borderColor: 'black'}]}
          onPress={() => this.props.navigation.navigate(
            'AddCard', {'deckId': deckId}
          )}
        >
          <Text style={[styles.btnText, {color: 'black'}]}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btnCont, {backgroundColor: 'black', color: white}]}
          onPress={this.submit}
        >
          <Text style={styles.btnText}>Start Quiz</Text>
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
    padding: 40,
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
  }
})

export default DeckView
