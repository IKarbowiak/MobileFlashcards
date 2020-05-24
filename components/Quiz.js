import React, {Component} from 'react'
import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import { white } from '../utils/colors'

class Quiz extends Component {
  state = {
    answered: false,
    score: 0,
    counter: 0,
  }

  showAnswer = () => {
    this.setState((currentState) => ({
      answered: !currentState.answered
    }))
  }

  render() {
    const {counter} = this.state
    const {deck} = this.props
    const cardNum = deck.questions.length
    if (counter >=  cardNum) {
      return (
        <View>
          <Text>Congratulations! You finished quiz.</Text>
          <Text>Your score is:</Text>
          <Text>{Math.round(score/cardNum * 100)}%</Text>
          <Text>{score}/{cardNum}</Text>
        </View>
      )
    }

    const card = deck.questions[counter]
    console.log(card)

    return (
      <View style={{flex: 1, backgroundColor: white}}>
        <View style={styles.counter}>
          <Text style={styles.counterText}>{counter} / {cardNum}</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.text}>
                {card.question}
          </Text>
          {!this.state.answered
            ? (
              <View >
                <Button
                    title='See answer'
                    color='red'
                    onPress={this.showAnswer}
                    style={styles.btn}
                />
              </View>
              )
            : (
              <View>
                <Text style={[styles.text, styles.answer]}>
                {card.answer}
                </Text>
                <TouchableOpacity
                  style={[styles.btnCont, {backgroundColor: 'green'}]}
                  onPress={() => console.log('Pressed ans')}
                >
                  <Text style={[styles.btnText, {color: 'white'}]}>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.btnCont, {backgroundColor: 'red', color: white}]}
                  onPress={() => console.log('Pressed ans')}
                >
                  <Text style={[styles.btnText, {color: 'white'}]}>Incorrect</Text>
                </TouchableOpacity>
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
  btn: {
    fontSize: 20,
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
  }
})

function mapStateToProps(state, {route}) {
  const {deckId} = route.params
  return {
    deck: state[deckId]
  }
}

export default connect(mapStateToProps)(Quiz)
