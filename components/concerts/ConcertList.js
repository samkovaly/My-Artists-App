import React from 'react'
import { StyleSheet, View, Image, FlatList } from 'react-native';


import BasicConcert from './BasicConcert'
import PagedFlatlist from '../PagedFlatlist'


function ConcertList({concerts, style }) {

    return (
        <View style={style}>
            <PagedFlatlist
                elements={concerts}
                renderElementComponent = {(item) => <BasicConcert concert = {item} pressForDetail = {true} />}
                pageSize={20}
            />
      </View>
    )

}



const styles = StyleSheet.create({
    concertListContainer: {

    },
})

export default React.memo(ConcertList)