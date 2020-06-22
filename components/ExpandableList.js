import React from 'react';
import { useState, useMemo } from 'react'

import { StyleSheet, View, FlatList, TouchableHighlight } from 'react-native';

import { Colors, Screens, Buttons, Font } from '../styles'

import Icon from 'react-native-vector-icons/MaterialIcons'



const ExpandableList = ({elements, renderElementComponent, initialPageSize, style}) => {

    const [pageSize, setPageSize] = useState(initialPageSize);

    const loadRestOfElements = () => {
        setPageSize(elements.length);
    }

    return (
        <View style = {style}>
            <View>
                {elements.slice(0,pageSize).map(element => renderElementComponent(element))}
            </View>

            {elements.length > initialPageSize && pageSize != elements.length?
                <TouchableHighlight onPress={() => loadRestOfElements()} style = {styles.loadMoreButton}>
                    <Icon name="keyboard-arrow-down" style = {styles.arrow} size={30} color="white"/>
                </TouchableHighlight>
            : null
            }

        </View>
    );
}

export default ExpandableList;



const styles = StyleSheet.create({
    loadMoreButton: {
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#383838'
    },
    arrow: {
    },
})