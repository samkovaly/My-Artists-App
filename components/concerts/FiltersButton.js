import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import BaseText from '../../components/BaseText'
import Icon from 'react-native-vector-icons/AntDesign'



const FiltersButton = ({ filters, editFilters }) => {
  return (
    <TouchableOpacity onPress = {() => editFilters() }>
        <View style = {styles.filterContainer}>
            <BaseText style = {styles.filterText}>
                {filters.location.displayString ? 
                    filters.location.displayString + " (" + filters.radius + "mi)" :
                    "Need to choose a location"
                }
            </BaseText>
            <Icon style = {styles.caretdown} name = "caretdown" size = {11} color = 'white' />
        </View>
    </TouchableOpacity>
  )
}
export default FiltersButton;



const styles = StyleSheet.create({
    filterContainer: {
      flexDirection: 'row',
      marginVertical: 12,
      marginHorizontal: 8,
    },
    filterText: {
      fontSize: 18,
      marginHorizontal: 6,
      fontWeight: Platform.OS === 'ios' ? '600' : 'bold',
    },
    caretdown: {
      marginLeft: -2,
      marginTop: Platform.OS === 'ios' ? 0 : 3,
      paddingTop: 5
    }
});