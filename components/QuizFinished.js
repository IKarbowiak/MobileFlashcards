import React from 'react'
import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'

import { white } from '../utils/colors'


const QuizFinished = (props) => {
  const {score, cardNum, deckId, reset, navigation} = props

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
          onPress={reset}
          >
            <Text style={[styles.btnText, {color: 'white'}]}>Start the Quiz again!</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.resultBtn, {backgroundColor: white, borderWidth: 1, borderColor: 'black'}]}
            onPress={() => navigation.navigate(
              'DeckView', {'deckId': deckId}
            )}
          >
            <Text style={[styles.btnText, {color: 'black'}]}>Go back to deck</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
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
  btnText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center'
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

export default QuizFinished

