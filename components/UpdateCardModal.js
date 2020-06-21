import React, {Component} from 'react'
import {Modal, View, Text, TouchableHighlight, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {handleUpdateCard} from '../actions/cards'
import { white } from '../utils/colors'


class UpdateCardModal extends Component {
  state = {
    newQuestion: this.props.card.question,
    newAnswer: this.props.card.answer,
  }

  onChangeQuestion = (text) => {
    this.setState({
      newQuestion: text
    })
  }

  onChangeAnswer = (text) => {
    this.setState({
      newAnswer: text
    })
  }

  update = () => {
    const {dispatch} = this.props
    dispatch(
      handleUpdateCard(this.props.card.id, this.state.newQuestion, this.state.newAnswer)
    )
    this.props.closeModal()
  }

  close = () => {
    this.setState({
      newQuestion: this.props.card.question,
      newAnswer: this.props.card.answer,
    })
    this.props.closeModal()
  }

  render() {
    const {modalVisible} = this.props
    const {newQuestion, newAnswer} = this.state
    return (
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Question: </Text>
                <TextInput
                  style={styles.input}
                  value={newQuestion}
                  onChangeText={this.onChangeQuestion}
                />
              <Text style={styles.modalText}>Answer:</Text>
              <TextInput
                style={styles.input}
                value={newAnswer}
                onChangeText={this.onChangeAnswer}
              />

              <TouchableHighlight style={styles.openButton} onPress={this.update}>
                <Text style={styles.btnText}>Update</Text>
              </TouchableHighlight>
  
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: white }}
                onPress={this.close}
              >
                <Text style={[styles.btnText, {color: 'black'}]}>Back</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "black",
    borderRadius: 10,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    textAlign: "center"
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: Platform.OS === 'ios' ? 8 : 2,
    padding: 5,
    margin: 10,
  },
  btnText: {
    fontSize: 15,
    color: white,
    textAlign: 'center'
  }
})

export default connect()(UpdateCardModal)
