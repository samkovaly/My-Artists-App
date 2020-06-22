import React from 'react';
import { useMemo } from 'react'

import { Colors, Screens, Buttons, Font } from '../../styles'


import { View, ScrollView, Keyboard, TouchableHighlight, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BaseText from '../BaseText';



const ResultsPreview = ({ sections, query, style }) => {

    const navigation = useNavigation();

    return (
        <ScrollView
            onScrollBeginDrag = {() => Keyboard.dismiss()}
            keyboardShouldPersistTaps = "always"
        >
            {sections.map(section =>(
            <View key = {section.name}>
                <BaseText style = {styles.header}>{section.name}</BaseText>
                <View style = {styles.list}>
                    {section.data.map(element => section.renderComponent(element))}
                </View>

                <TouchableHighlight onPress={() => navigation.navigate(section.expandSearchNav, {initialQuery: query})}>
                    <View style = {styles.moreResultsView}>
                        <BaseText style = {styles.moreResults}>more results</BaseText>
                    </View>
                </TouchableHighlight>
            </View>
            ))}
        </ScrollView>
  );
}

export default ResultsPreview;




const styles = StyleSheet.create({
    header: {
        fontSize: 26,
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 4,
    },
    moreResultsView: {
        borderColor: 'white',
        borderWidth: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 6,
        marginBottom: 16,
        marginHorizontal: 8,
        padding: 2,
    },
    moreResults: {
        fontSize: 16,
        //marginLeft: 12,
        //marginVertical: 4,
        //color: Colors.SUB_TEXT_GREY,
        color: 'white',
        fontWeight: 'normal',
    },
    list: {
        marginHorizontal: 12,
    }
  });