import React, {Component} from 'react'
import {
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native'

import {saveDeckTitle, getDecks} from '../utils/api'
import {white} from '../utils/colors'


export default class NewDeck extends Component {
  state = {
    title: ''
  }

  onChange = (text) => {
    this.setState({
      title: text
    })
  }

  submit = () => {
    console.log("submit")
    const {title} = this.state

    saveDeckTitle(title)

    this.setState({
      title: ''
    })

    getDecks()
      .then((data) => console.log(data))

     // navigate to decks

  }

  render() {
    const {title} = this.state
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.text}>What is the title of your new deck?</Text>
        <TextInput
          style={styles.input}
          value={title}
          placeholder="Deck Title"
          onChangeText={this.onChange}
        />
        <TouchableOpacity style={styles.btnCont} onPress={this.submit}>
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
    paddingBottom: 20,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: Platform.OS === 'ios' ? 8 : 2,
    padding: 5,
  },
  btnCont: {
    backgroundColor: 'black',
    padding: 10,
    margin: 20,
    borderRadius: 10,
  },
  btnText: {
    fontSize: 20,
    color: white,
    textAlign: 'center'
  }
})