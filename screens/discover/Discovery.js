import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import { Colors, Screens} from '../../styles'

import SearchBar from '../../components/SearchBar';

import { queryConcertsAtPage } from '../../store/concerts/effects/seatgeekEffects';
import ResultsPreview from '../../components/discover/ResultsPreview';
import { queryArtistsAtPage } from '../../utilities/spotifyFetches';

import ConcertItemSmall from '../../components/concerts/ConcertItemSmall';
import ArtistItem from '../../components/artists/ArtistItem';


import { spotifyArtistsGetArtists } from '../../utilities/artists'

import { updateAndGetAccessToken } from '../../utilities/updateAndGetState';

import { useDispatch } from 'react-redux'


export default function Discovery({}) {
  const dispatch = useDispatch();
  const seatgeekClientId = useSelector(state => state.authentication.APICredentials.seatgeek.client_id);
  const extractedArtistsSlugMap = useSelector(state => state.musicProfile.artistSlugMap)

  const [query, setQuery] = useState('');
  const [previewConcerts, setPreviewConcerts] = useState([])
  const [previewArtists, setPreviewArtists] = useState([])

  const previewFetch = 5;
  const previewLength = 3;

  const lastConcertsPromise = useRef(null);
  const lastArtistsPromise = useRef(null);

  useEffect(() => {
    const fetchPreview = async() => {
      // record this promise, compare to latest promise later
      const accessToken = await updateAndGetAccessToken(dispatch);
      const currentConcertsPromise = await queryConcertsAtPage(query, 1, previewFetch, seatgeekClientId);
      lastConcertsPromise.current = currentConcertsPromise;
      const concerts = await currentConcertsPromise;

      const currentArtistsPromise = await queryArtistsAtPage(query, 1, previewFetch, accessToken);
      lastArtistsPromise.current = currentArtistsPromise;
      let artists = await currentArtistsPromise;
      
      if(currentConcertsPromise == lastConcertsPromise.current){
        setPreviewConcerts(concerts);
      }
      
      if(currentArtistsPromise == lastArtistsPromise.current){
        artists = spotifyArtistsGetArtists(artists, extractedArtistsSlugMap)
        setPreviewArtists(artists);
      }

    }

    fetchPreview();
  }, [query])
  

  const sections = [
    {
      name: 'Concerts',
      data: previewConcerts.slice(0, previewLength),
      renderComponent: (item) => <ConcertItemSmall key = {item.id} concert = {item} pressForDetail = {true} />,
      expandSearchNav: "ConcertSearch",
    },
    {
      name: 'Artists',
      data: previewArtists.slice(0, previewLength),
      renderComponent: (item) => <ArtistItem key = {item.id} artist = {item} pressForDetail = {true} />,
      expandSearchNav: "ArtistSearch",
    }
  ]


  return (
    <View style={styles.container}>
      <SearchBar
        searchCallback = {setQuery}
        placeholderText = "Find anything"
        containerStyle = {styles.searchBarContainer}
        autoCapitalize = 'none'
        autoCorrect = {false}
        autoFocus = {false}
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