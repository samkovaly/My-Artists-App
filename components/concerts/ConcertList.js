import React from 'react'
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';


import BasicConcert from './BasicConcert'


export default function ConcertList({concerts, style, navigation}) {



    return (
        <View style={style}>
            <FlatList
                data={concerts}
                renderItem={({ item }) => <BasicConcert concert = {item} pressForDetail = {true} navigation={navigation} />}
                keyExtractor = {(item, index) => `list-item-${index}`}
            />
      </View>
    )

}



const styles = StyleSheet.create({
    concertListContainer: {

    },
})