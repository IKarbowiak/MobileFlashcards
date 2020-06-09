import React, {Component} from 'react'
import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import * as Speech from 'expo-speech'
import { LinearGradient } from "expo-linear-gradient"

import { white } from '../utils/colors'
import {clearLocalNotifications, setLocalNotification} from '../utils/notifications'
import {shuffleData} from '../utils/helpers'


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
    Speech.speak(card.answer)
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
        <View style={styles.container}>
          <Text style={styles.text}>
            Congratulations! You finished the quiz.{"\n"}Your score is:
          </Text>
          <Text style={styles.resultPer}>
            {Math.round(score/cardNum * 100)}%
          </Text>
          <Text style={styles.result}>
            {score} correct / {cardNum} all
          </Text>
          <View style={{alignItems: 'center', padding: 20}}>
            {score/cardNum === 0 && 
              <FontAwesome5 name="sad-tear" size={50} color="black"/>
            }
            {score/cardNum === 1 && 
              <FontAwesome5 name="smile-beam" size={50} color="black" />
            }
          </View>
          <View>
            <TouchableOpacity
              style={[styles.resultBtn, {backgroundColor: 'black'}]}
              onPress={this.reset}
              >
                <Text style={[styles.btnText, {color: 'white'}]}>Start the Quiz again!</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.resultBtn, {backgroundColor: white, borderWidth: 1, borderColor: 'black'}]}
                onPress={() => this.props.navigation.navigate(
                  'DeckView', {'deckId': deckId}
                )}
              >
                <Text style={[styles.btnText, {color: 'black'}]}>Go back to deck</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }

    const card = questions[counter]
 
    return (
      <View style={{flex: 1, backgroundColor: white}}>
        <View style={styles.counter}>
          <Text style={styles.counterText}>{counter} / {cardNum}</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.text}>
                {card.question}
          </Text>
          {!answered
            ? (
              <View >
                <TouchableOpacity
                  onPress={() => Speech.speak(card.question)}
                >
                  <MaterialIcons
                    name='record-voice-over'
                    size={30}
                    color='black'
                    style={{textAlign: 'center'}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.showAnswer(card)}
                  style={styles.ansBtn}
                >
                  <Text style={styles.ansText}>See answer</Text>
                </TouchableOpacity>
              </View>
              )
            : (
              <View>
                <Text style={[styles.text, styles.answer]}>
                {card.answer}
                </Text>
                <TouchableOpacity
                  onPress={() => Speech.speak(card.answer)}
                >
                  <MaterialIcons
                    name='record-voice-over'
                    size={30}
                    color='black'
                    style={{textAlign: 'center'}}
                  />
                </TouchableOpacity>
                <View style={styles.ansContainer}>
                    <TouchableOpacity
                      onPress={this.correct}
                    >
                      <LinearGradient
                        colors={['#79d27d', '#2d7530']}
                        style={styles.btnCont}
                      >
                        <Text style={styles.btnText}>Correct</Text>
                      </LinearGradient>
                    </TouchableOpacity>

                  <TouchableOpacity
                    onPress={this.incorrect}
                  >
                    <LinearGradient
                      colors={['#f67b7d', '#bb181b']}
                      style={styles.btnCont}
                    >
                      <Text style={styles.btnText}>Incorrect</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            )
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  ansContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  btnCont: {
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 15,
    marginVertical: 25,
  },
  btnText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center'
  },
  counter: {
    alignItems: 'flex-start',
    margin: 10,
  },
  counterText: {
    fontWeight: 'bold',
    fontSize: 18
  },
  answer: {
    textShadowColor: 'rgba(0, 0, 0, 0.50)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  },
  resultPer: {
    color: '#482869',
    textShadowColor: 'rgba(72, 40, 105, 0.50)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
    fontSize: 30,
    textAlign: 'center',
  },
  result: {
    fontSize: 25,
    textAlign: 'center',
    color: '#370966',
  },
  resultBtn: {
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 50,
    marginVertical: 10,
  }
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
