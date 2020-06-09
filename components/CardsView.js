import React, {Component} from 'react'
import {View, Text, FlatList, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import { white } from '../utils/colors'
import { AntDesign, EvilIcons } from '@expo/vector-icons'


function Item({ item }) {
  return (
    <View style={styles.itemCont}>
      <View style={styles.item}>
        <Text style={styles.question}>{item.question}</Text>
        <Text style={styles.answer}>{item.answer}</Text>
      </View>
      <View style={styles.options}>
        <AntDesign name="edit" size={24} color="black" style={{marginHorizontal: 8}}/>
        <EvilIcons name="trash" size={30} color="black" style={{marginHorizontal: 8}} />
      </View>
    </View>
  );
}


class CardsView extends Component {
  render() {
    const {deck} = this.props
    return (
      <View style={styles.container}>
        <View style={styles.titleCont}>
          <Text style={styles.title}>{deck.title}</Text>
        </View>
        <FlatList
          data={deck.questions}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={item => item.question}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    justifyContent: 'center',
  },
  itemCont: {
    flexDirection: 'row',
    alignItems: 'center', 
    flex: 1,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  titleCont: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 35,
    textAlign: 'center',
    marginVertical: 15,
  },
  item: {
    flex: 4,
    alignSelf: 'flex-start',
    paddingVertical: 30,
    marginHorizontal: 10,
  },
  options: {
    flex: 1,
    flexDirection: 'row',
    marginRight: 10,
  },
  question: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  answer: {
    fontSize: 15,
  }
})

function mapStateToProps(decks, {route}) {
  const {deckId} = route.params
  return {
    deck: decks[deckId]
  }
}

export default connect(mapStateToProps)(CardsView)
