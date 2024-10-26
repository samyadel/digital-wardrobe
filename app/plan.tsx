import { Text, StyleSheet, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { Agenda } from 'react-native-calendars';

export default class plan extends Component {
  render() {
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic" showsVerticalScrollIndicator={false} contentContainerStyle={{alignItems: "center"}}>
        <SafeAreaView style={{marginVertical: 20, width: "85%"}}>
        <Text>Hello</Text>
        <Agenda
        selected="2022-12-01"
        items={{
          '2022-12-01': [{name: 'Cycling'}, {name: 'Walking'}, {name: 'Running'}],
          '2022-12-02': [{name: 'Writing'}]
        }}
        renderItem={(item, isFirst) => (
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
        </SafeAreaView>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  itemText: {
    color: '#888',
    fontSize: 16,
  }
});