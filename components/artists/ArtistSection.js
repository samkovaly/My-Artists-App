import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Colors, Screens } from '../../styles'
import BaseText from '../BaseText'


const ArtistSection = ({contentPresent, renderItem, contentText, noContentText, container}) => {
    return (
        <View style = {styles.container}>
        {contentPresent ?
          <View style = {{flex: 1}}>
            <View style = {styles.centerText}>
              <BaseText style = {styles.contentText}>{contentText}</BaseText>
            </View>
            {renderItem()}
  
          </View> :
          <View style = {styles.centerText}>
            <BaseText style = {styles.noContentText}>{noContentText}</BaseText>
          </View>
        }
      </View>
    );
}

export default ArtistSection;

const styles = StyleSheet.create({
    container: {
        marginTop: 14,
    },
    centerText: {
        alignItems: 'center',
    },
    contentText: {
        fontSize: 22,
        marginBottom: 6,
    },
    noContentText: {
        fontSize: 18,
    },
})