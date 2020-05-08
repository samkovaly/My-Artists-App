import React from 'react'
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';


import BasicConcert from './BasicConcert'


function ConcertList({concerts, style }) {

    return (
        <View style={style}>
            <FlatList
                data={concerts}
                renderItem={({ item }) => <BasicConcert concert = {item} pressForDetail = {true} />}
                keyExtractor = {(item, index) => `list-item-${index}`}
            />
      </View>
    )

}



const styles = StyleSheet.create({
    concertListContainer: {

    },
})

export default React.memo(ConcertList)