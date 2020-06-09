import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import { MaterialIcons } from '@expo/vector-icons'
import * as Speech from 'expo-speech'

import { white } from '../utils/colors'
import {clearLocalNotifications, setLocalNotification} from '../utils/notifications'
import {shuffleData} from '../utils/helpers'
import QuizFinished from './QuizFinished'
import Answer from './Answer'
import {defaultLanguage} from '../utils/options'


class Quiz extends Component {
  state = {
    answered: false,
    score: 0,
    counter: 0,
  }

  showAnswer = (card) => {
    this.setState({
      answered: true
    })
    Speech.speak(card.answer, {language: defaultLanguage})
  }
  
  correct = () => {
    this.setState((currentState) => ({
      score: currentState.score + 1,
      counter: currentState.counter +1,
      answered: false,
    }))
    Speech.stop()
  }

  incorrect = () => {
    this.setState((currentState) => ({
      counter: currentState.counter +1,
      answered: false,
    }))
    Speech.stop()
  }

  reset = () => {
    this.setState({
      answered: false,
      score: 0,
      counter: 0,
    })
  }

  render() {
    const {counter, score, answered} = this.state
    const {deckId, questions} = this.props
    const cardNum = questions.length
  
    if (counter >=  cardNum) {
      clearLocalNotifications()
        .then(setLocalNotification)

      return (
        <QuizFinished
          score={score}
          cardNum={cardNum}
          deckId={deckId}
          reset={this.reset}
          navigation={this.props.navigation}
        />
      )
    }

    const card = questions[counter]
 
    return (
      <View style={{flex: 1, backgroundColor: white}}>
        <View style={styles.counter}>
          <Text style={styles.counterText}>{counter} / {cardNum}</Text>
        </View>
        <View style={styles.container}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={styles.text}>
                  {card.question}
            </Text>
            {! answered &&
              <TouchableOpacity
                      onPress={() => Speech.speak(
                        card.question,
                        {language: defaultLanguage}
                      )}
                    >
                      <MaterialIcons
                        name='record-voice-over'
                        size={30}
                        color='black'
                        style={{textAlign: 'center'}}
                      />
              </TouchableOpacity>
            }
          </View>
          {!answered
            ? (
              <View style={{flex: 2, justifyContent: 'center'}}>
                <TouchableOpacity
                  onPress={() => this.showAnswer(card)}
                  style={styles.ansBtn}
                >
                  <Text style={styles.ansText}>See answer</Text>
                </TouchableOpacity>
              </View>
              )
            : (
              <View style={{flex: 2, justifyContent: 'flex-start'}}>
                <Answer
                  card={card}
                  correct={this.correct}
                  incorrect={this.incorrect}
                />
              </View>
            )
          }
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
    padding: 40,
  },
  text: {
    fontSize: 40,
    textAlign: 'center',
    paddingBottom: 20,
  },
  ansBtn: {
    color: 'red',
    alignItems: 'center',
  },
  ansText: {
    fontSize: 20,
    color: 'red',
    paddingTop: 20,
  },
  counter: {
    alignItems: 'flex-start',
    margin: 10,
  },
  counterText: {
    fontWeight: 'bold',
    fontSize: 18
  },
})

function mapStateToProps(state, {route}) {
  const {deckId} = route.params
  const deck = state[deckId]
  const questions = shuffleData(deck.questions)

  return {
    deckId,
    questions
  }
}

export default connect(mapStateToProps)(Quiz)
