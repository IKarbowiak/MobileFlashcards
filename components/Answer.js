import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import * as Speech from 'expo-speech'
import { LinearGradient } from "expo-linear-gradient"

import {defaultLanguage} from '../utils/options'


const Answer = (props) => {
  const {card, correct, incorrect} = props

  return (
    <View>
      <Text style={[styles.text, styles.answer]}>
      {card.answer}
      </Text>
      <TouchableOpacity
        onPress={() => Speech.speak(card.answer, {language: defaultLanguage})}
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
            onPress={correct}
          >
            <LinearGradient
              colors={['#79d27d', '#2d7530']}
              style={styles.btnCont}
            >
              <Text style={styles.btnText}>Correct</Text>
            </LinearGradient>
          </TouchableOpacity>

        <TouchableOpacity
          onPress={incorrect}
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


const styles = StyleSheet.create({
  ansContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 35,
    textAlign: 'center',
    paddingBottom: 20,
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
  answer: {
    textShadowColor: 'rgba(0, 0, 0, 0.50)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  },
})

export default Answer
