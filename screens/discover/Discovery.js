import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import BaseText from '../../components/BaseText'

import { Colors, Screens} from '../../styles'

import SearchBar from '../../components/SearchBar';
import SearchableFlatList from '../../components/SearchableFlatList';

import { queryConcertsAtPage } from '../../store/concerts/effects/seatgeekEffects';
import PagedFlatlist from '../../components/PagedFlatlist';
import ResultsPreview from '../../components/discover/ResultsPreview';
import { queryArtistsAtPage } from '../../utilities/spotifyFetches';

import BasicConcert from '../../components/concerts/BasicConcert';
import BasicArtist from '../../components/artists/BasicArtist';




export default function Discovery({}) {

  const accessToken = useSelector(state => state.authentication.accessToken.token);

  const [query, setQuery] = useState('');
  const [previewConcerts, setPreviewConcerts] = useState([])
  const [previewArtists, setPreviewArtists] = useState([])

  const seatgeekClientId = useSelector(state => state.authentication.APICredentials.seatgeek.client_id);
  const previewLength = 3;

  const lastConcertsPromise = useRef(null);
  const lastArtistsPromise = useRef(null);

  useEffect(() => {
    const fetchPreview = async() => {
      // record this promise, compare to latest promise later
      const currentConcertsPromise = await queryConcertsAtPage(query, 1, previewLength, seatgeekClientId);
      lastConcertsPromise.current = currentConcertsPromise;
      const concerts = await currentConcertsPromise;

      const currentArtistsPromise = await queryArtistsAtPage(query, 1, previewLength, accessToken);
      lastArtistsPromise.current = currentArtistsPromise;
      const artists = await currentArtistsPromise;
      
      if(currentConcertsPromise == lastConcertsPromise.current){
        setPreviewConcerts(concerts);
      }
      
      if(currentArtistsPromise == lastArtistsPromise.current){
        setPreviewArtists(artists);
      }

    }

    fetchPreview();
  }, [query])
  

  const sections = [
    {
      name: 'Concerts',
      data: previewConcerts.slice(0, previewLength),
      renderComponent: (item) => <BasicConcert key = {item.id} concert = {item} pressForDetail = {true} />,
      expandSearchNav: "ConcertSearch",
    },
    {
      name: 'Artists',
      data: previewArtists.slice(0, previewLength),
      renderComponent: (item) => <BasicArtist key = {item.id} artist = {item} userArtist = {false} pressForDetail = {true} />,
      expandSearchNav: "ArtistSearch",
    }
  ]


  return (
    <View style={styles.container}>
      <SearchBar
        searchCallback = {setQuery}
        placeholderText = "Find Anything"
        containerStyle = {styles.searchBarContainer}
        autoCapitalize = 'none'
        autoCorrect = {false}
        autoFocus = {true}
      />
      {
        previewConcerts.length > 0 ?
        <ResultsPreview
          sections={sections}
          query = {query}
        />
        :
        null
      }
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    ...Screens.screenContainer,
  },
  searchBarContainer: {
    //marginTop: 12,
    //marginHorizontal: 6,
  },
});