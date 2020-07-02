import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native';


import ConcertItemBig from './ConcertItemBig'
import PagedFlatlist from '../PagedFlatlist'

import { Colors, Screens, Buttons, Font } from '../../styles'
import BaseText from '../BaseText';

function ConcertList({concerts, loading, displayConcertName, style, noConcertsHeader, noConcertsText }) {

    if(loading) {
        return loadingScreen();
    }

    if(!concerts || concerts.length == 0){
        return noConcerts(noConcertsHeader, noConcertsText);
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
const noConcerts = (noConcertsHeader, noConcertsText) => {
    return (
    <View style = {styles.noConcertsContainer}>
        <BaseText style = {styles.noConcertsHeader}>{noConcertsHeader}</BaseText>
        <BaseText style = {styles.noConcertsText}>{noConcertsText}</BaseText>
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
        color: Colors.SEARCH_BAR_INPUT,
    }
})

// need to memo for performance in Concerts.js
export default React.memo(ConcertList)