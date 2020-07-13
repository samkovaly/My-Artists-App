import React from 'react';
import { Colors } from '../../styles'


import { View, ScrollView, Keyboard, TouchableHighlight, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BaseText from '../BaseText';
import Icon from 'react-native-vector-icons/MaterialIcons';



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
                        <Icon style = {styles.arrow} name="keyboard-arrow-right" size={25} color={Colors.SUB_TEXT_GREY} />
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
        marginTop: 10,
        marginBottom: 4,
        marginLeft: 8,
        alignSelf: 'center',
    },
    moreResultsView: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 2,
        marginBottom: 12,
        marginHorizontal: 8,
        padding: 2,
    },
    moreResults: {
        fontSize: 16,
        //marginLeft: 12,
        //marginVertical: 4,
        //color: Colors.SUB_TEXT_GREY,
        color: Colors.SUB_TEXT_GREY,
        fontWeight: 'normal',
        paddingLeft: 20,
    },
    arrow: {
        //position: 'absolute',
        //right: 10,
        marginTop: 2,
    },
    list: {
        marginHorizontal: 6,
    }
  });