import React from 'react';
import { useState, useMemo } from 'react'
import { useSelector} from 'react-redux';

import { StyleSheet, Text, View } from 'react-native';

import { Colors, Screens, Buttons, Font } from '../styles'


import BasicArtist from '../components/DisplayArtists/BasicArtist';
import SearchBar from '../components/SearchBar';
import SearchableFlatList from '../components/SearchableFlatList';


//const sortedArtists = artists.sort((a, b) => (a.name > b.name) ? 1 : -1);
const PAGE_SIZE = 20;


const getSortedArtists = (artists) => {
  return artists.sort((a, b) => (a.name > b.name) ? 1 : -1);
}

// https://dev.to/raicuparta/compute-values-on-component-mount-with-react-hooks-state-vs-ref-4epk
export default function AllArtists(props) {
  const artists = useSelector(state => state.musicProfile.artists);
  const sortedArtists = useMemo(() => getSortedArtists(artists), []);
  const [artistsQuery, setArtistsQuery] = useState("");

    return (
      <View style={styles.container}>
        <SearchBar
          style = {styles.searchBar}
          searchCallback = {setArtistsQuery}
          placeholderText = "Find Artists"
        />
        <View style = {styles.listPadding}>
          <SearchableFlatList
            query = {artistsQuery}
            elements = {sortedArtists}
            queryKey = {"name"}
            renderElementComponenet = {(item) => <BasicArtist artist = {item} />}
            pageSize = {PAGE_SIZE}
            // passing a different key from the previous key tells react to
            // load a new component and thus reset the component's state to initial.
            key = {artistsQuery}
          />
        </View>
      </View>
  );
}


const styles = StyleSheet.create({
  container: {
      ...Screens.screenContainer,
    },
    listPadding: {
      padding: 4,
    },
    searchBar: {
      margin: 4,
    }
});
