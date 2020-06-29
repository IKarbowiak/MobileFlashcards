import React, {Component} from 'react'
import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native'
import { white } from '../utils/colors';


class DeleteCardModal extends Component {
  render() {
    const {modalVisible, card, closeModal, deleteCard} = this.props
    return (
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
            <Text style={styles.modalText}>
              Are you sure you want to delete this card?
            </Text>
            <Text style={styles.question}>{card.question}</Text>
            <View style={styles.btnCont}>
              <TouchableOpacity
                style={[styles.buttons, {backgroundColor: "white"}]}
                onPress={() => deleteCard(card)}
              >
                <Text style={[styles.btnText, {color: 'black'}]}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttons}
                onPress={closeModal}
              >
                <Text style={styles.btnText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  question: {
    marginTop: 15,
    textAlign: 'center',
    fontWeight: '300',
  },
  buttons: {
    backgroundColor: "black",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'black',
    marginHorizontal: 15,
    marginTop: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    textAlign: "center",
    fontWeight: "bold",
  },
  btnText: {
    fontSize: 15,
    color: white,
    textAlign: 'center'
  },
  btnCont: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
})

export default DeleteCardModal