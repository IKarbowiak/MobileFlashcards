import React, {Component} from 'react'
import {Text, KeyboardAvoidingView, TextInput, TouchableOpacity, StyleSheet} from 'react-native'

import { white } from '../utils/colors'


class AddCard extends Component {
  state = {
    question: '',
    answer: '',
  }

  onChangeQuestion = (text) => {
    this.setState({
      question: text
    })
  }

  onChangeAnswer = (text) => {
    this.setState({
      answer: text
    })
  }

  submit = () => {
    const {question, answer} = this.state
    console.log(question)
    console.log(answer)

    this.setState({
      question: '',
      answer: '',
    })
    // TODO: add redux

    // Go back to decks view

  }

  render() {
    const {question, answer} = this.state

    return (
      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.text}>Insert question and answer below</Text>
        <TextInput
          style={styles.input}
          value={question}
          placeholder="...question here"
          onChangeText={this.onChangeQuestion}
        />
        <TextInput
          style={styles.input}
          value={answer}
          placeholder="...answer here"
          onChangeText={this.onChangeAnswer}
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
    margin: 10,
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

export default AddCard
