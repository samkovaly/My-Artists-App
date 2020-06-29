import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native';


import ConcertItemBig from './ConcertItemBig'
import PagedFlatlist from '../PagedFlatlist'

import { Colors, Screens, Buttons, Font } from '../../styles'
import BaseText from '../BaseText';

function ConcertList({concerts, loading, displayConcertName, style }) {

    if(loading) {
        return loadingScreen();
    }

    if(!concerts || concerts.length == 0){
        return noConcerts();
    }

    return (
        <View style={style}>
            <PagedFlatlist
                elements={concerts}
                renderElementComponent = {(item) => {
                    return (<ConcertItemBig concert = {item} pressForDetail = {true} displayConcertName = {displayConcertName}/>)
                }}
                pageSize={20}
            />
      </View>
    )

}

const loadingScreen = () => {
    return (
        <View style = {styles.loadingContainer}>
            <ActivityIndicator
              size = 'large'
              color = {Colors.TAB_NAV_BLUE}
            />
        </View>
    )
}
const noConcerts = () => {
    return (
    <View style = {styles.noConcertsContainer}>
        <BaseText style = {styles.noConcertsHeader}>Sorry, no concerts found.</BaseText>
        <BaseText style = {styles.noConcertsText}>Try expanding your filters to include more results.</BaseText>
    </View>
    )
}

const styles = StyleSheet.create({
    concertListContainer: {

    },
    loadingContainer: {
      ...Screens.screenContainer,
      justifyContent: 'center',
      alignItems: 'center',
    },
    noConcertsContainer: {
        ...Screens.screenContainer,
        alignItems: 'center',
        marginTop: 50,
        marginHorizontal: 20,
    },
    noConcertsHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 25,
    },
    noConcertsText: {
        fontSize: 18,
        color: '#e6e6e6',
    }
})

// need to memo for performance in Concerts.js
export default React.memo(ConcertList)