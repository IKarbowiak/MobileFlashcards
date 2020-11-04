import React, {Component} from 'react'
import {Text, KeyboardAvoidingView, TextInput, TouchableOpacity, StyleSheet, Platform} from 'react-native'
import {connect} from 'react-redux'
import {CommonActions} from '@react-navigation/native'

import { white } from '../utils/colors'
import {handleAddCard} from '../actions/cards'
import {submitCard} from '../utils/api'
import { ScrollView } from 'react-native'


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
    const {deckId, dispatch} = this.props

    if (question === '' || answer === ''){
      alert('You need to enter question and answer!')
      return
    }

    dispatch(handleAddCard(deckId, {question, answer}))

    submitCard(deckId, {question, answer})

    this.setState({
      question: '',
      answer: '',
    })

    this.props.navigation.dispatch(
      CommonActions.goBack({
          key: 'CardsView',
      }))

  }

  render() {
    const {question, answer} = this.state

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
        >
          <Text style={styles.text}>Insert question and answer below</Text>
          <TextInput
            multiline={true}
            style={styles.input}
            value={question}
            placeholder="...question here"
            onChangeText={this.onChangeQuestion}
          />
          <TextInput
            multiline={true}
            style={styles.input}
            value={answer}
            placeholder="...answer here"
            onChangeText={this.onChangeAnswer}
          />
          <TouchableOpacity style={styles.btnCont} onPress={this.submit}>
            <Text style={styles.btnText}>Submit</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
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


function mapStateToProps(state, {route}) {
  const {deckId} = route.params
  return {
    deckId,
  }
}

export default connect(mapStateToProps)(AddCard)
