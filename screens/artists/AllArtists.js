import React from 'react';
import { useState, useMemo } from 'react'
import { useSelector} from 'react-redux';

import { StyleSheet, View } from 'react-native';

import { Colors, Screens, Buttons, Font } from '../../styles'


import ArtistItem from '../../components/artists/ArtistItem';
import SearchBar from '../../components/searchBar/SearchBar';
import SearchableFlatList from '../../components/SearchableFlatList';


import BaseText from '../../components/BaseText'
//const sortedArtists = artists.sort((a, b) => (a.name > b.name) ? 1 : -1);
const PAGE_SIZE = 100;
const onEndReachedThreshold = 20;


//const getSortedArtists = (artists) => {
//  return artists.sort((a, b) => (a.name > b.name) ? 1 : -1);
//}

// https://dev.to/raicuparta/compute-values-on-component-mount-with-react-hooks-state-vs-ref-4epk
export default function AllArtists(props) {
  
  const artistsMap = useSelector(state => state.musicProfile.artistSlugMap);
  const sortedArtists = Array.from(artistsMap.values())
  //const sortedArtists = useMemo(() => getSortedArtists(artists), []);
  const [artistsQuery, setArtistsQuery] = useState("");

    return (
      <View style={styles.container}>
        <View style = {styles.searchBar}>
          <SearchBar
            searchCallback = {setArtistsQuery}
            placeholderText = "Filter artists"
            autoCapitalize = 'none'
            autoCorrect = {false}
            autoFocus = {false}
          />
        </View>
        
        <SearchableFlatList
          query = {artistsQuery}
          elements = {sortedArtists}
          queryKey = {"name"}
          renderElementComponent = {(item) => <ArtistItem artist = {item} pressForDetail = {true} />}
          pageSize = {PAGE_SIZE}
          onEndReachedThreshold = {onEndReachedThreshold}
          // passing a different key from the previous key tells react to
          // load a new component and thus reset the component's state to initial.
          key = {artistsQuery}
          style = {styles.list}
        />
      </View>
  );
}


const styles = StyleSheet.create({

  container: {
    ...Screens.screenContainer,
    //padding: 4,
  },

    list: {
      marginHorizontal: 6,
    },
    searchBar: {
      //marginVertical: 2,
    }
});
