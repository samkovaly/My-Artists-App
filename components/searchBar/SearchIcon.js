import React from 'react';
import { StyleSheet } from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';


const SearchIcon = () => {
    return (
        <IconAntDesign
            name='search1'
            size = {20}
            color = "white"
            style = {styles.searchIcon}
        />
    )
}
export default SearchIcon;

const styles = StyleSheet.create({
    searchIcon: {
      //flex: 1,
      marginRight: 9,
      marginTop: 2,
    },
});
