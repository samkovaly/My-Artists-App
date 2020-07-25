import React from 'react';
import { Colors } from '../../styles'


import { View, ScrollView, Keyboard, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BaseText from '../BaseText';
import Icon from 'react-native-vector-icons/MaterialIcons';



const ResultsPreview = ({ sections, query }) => {

    const navigation = useNavigation();

    return (
        <ScrollView
            onScrollBeginDrag = {() => Keyboard.dismiss()}
            keyboardShouldPersistTaps = "always"
        >
            {sections.map(section =>{
                if(section.data.length > 0){
                    return (
                        <View key = {section.name}>
                            <BaseText style = {styles.header}>{section.name}</BaseText>
                            <View style = {styles.list}>
                                {section.data.map(element => section.renderComponent(element))}
                            </View>
                            <View style = {styles.moreResultsOuterContainer}>
                                <TouchableOpacity onPress={() => navigation.navigate(section.expandSearchNav, {initialQuery: query})}>
                                    <View style = {styles.moreResultsInnerContainer}>
                                        <BaseText style = {styles.moreResults}>more results</BaseText>
                                        <Icon style = {styles.arrow} name="keyboard-arrow-right" size={25} color={Colors.SUB_TEXT_GREY} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }else if(query.length > 1){
                    return (
                        <View  key = {section.name} style = {styles.noResultsContainer}>
                            <BaseText style = {styles.noResultsText}>{section.noResultsMessage}</BaseText>
                        </View>
                    )
                }
            })}
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
    moreResultsOuterContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
        marginBottom: 12,
        marginHorizontal: 8,
    },
    moreResultsInnerContainer: {
        flexDirection: 'row',
        padding: 10,
    },
    moreResults: {
        fontSize: 16,
        color: Colors.SUB_TEXT_GREY,
        fontWeight: 'normal',
        marginLeft: 8,
    },
    arrow: {
        marginTop: -2,
        marginLeft: -3,
        marginRight: -7,
        marginBottom: -3,
    },
    list: {
        marginHorizontal: 6,
    },
    noResultsContainer: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noResultsText: {
        fontSize: 20,
        color: Colors.SUB_TEXT_GREY,
        fontWeight: 'normal',
    },
  });