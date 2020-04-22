import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors, Screens, Buttons, Font } from '../styles'


import { useSelector} from 'react-redux';

import BasicArtist from '../components/DisplayArtists/BasicArtist'

import { ListItem, ThemeProvider, Card } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';

import SearchBar from '../components';


export default function AllArtists(props) {

    // get and sort artists
    let artists = useSelector(state => state.musicProfile.artists);
    artists = artists.sort((a, b) => (a.name > b.name) ? 1 : -1);
  
  return (

    <View style={styles.container}>


    <SearchBar></SearchBar>
      

      <View style={{flex: 1}}>
        <FlatList
            data={artists}
            renderItem={({ item }) => <BasicArtist artist = {item} />}
            keyExtractor={item => item.id}
        />
      </View>

    </View>
  );
}





const styles = StyleSheet.create({
    container: {
        ...Screens.screenContainer,
      },
});