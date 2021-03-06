import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import { Colors, Screens, Buttons, Font } from '../../styles'


import { useSelector} from 'react-redux';

//import ArtistItem from '../../components/artists/ArtistItem'
import BasicButton from '../../components/BasicButton'

import { FlatList } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import BaseText from '../../components/BaseText'


import ArtistHorizontalCards from '../../components/artists/ArtistHorizontalCards'

import { filterArtists, sortByProperty } from '../../store/musicProfile/musicProfileActions';

export default function MyArtists(props) {
  const navigation = useNavigation();

  const artistsMap = useSelector(state => state.musicProfile.artistSlugMap);


  if(artistsMap == null){
    return (
      <View style = {styles.noMusicProfileContainer}>
        <BaseText style = {styles.noMusicProfileText}>Unfortunately there was an error with Spotify and we can't load any of your artists. We have been notified of this and it will be fixed soon.</BaseText>
      </View>
    )
  }
  if(artistsMap.size == 0){
    return (
      <View style = {styles.noMusicProfileContainer}>
        <BaseText style = {styles.noMusicProfileText}>Unfortunately you have not listened to enough artists on spotify for them to show up here.</BaseText>
      </View>
    )
  }


  const artists = Array.from(artistsMap.values());

  // example: top_artists_long_term_ranking
  let shortTermArtists = filterArtists(artists, 'top_artists_short_term');
  shortTermArtists = sortByProperty(shortTermArtists, "top_artists_short_term_ranking")

  let mediumTermArtists = filterArtists(artists, 'top_artists_medium_term');
  mediumTermArtists = sortByProperty(mediumTermArtists, "top_artists_medium_term_ranking")

  let longTermArtists = filterArtists(artists, 'top_artists_long_term');
  longTermArtists = sortByProperty(longTermArtists, "top_artists_long_term_ranking")

  let followedArtists = filterArtists(artists, 'followed_artist');
  followedArtists = followedArtists.sort((a, b) => (a.name > b.name) ? 1 : -1);

  const gotoAllArtists = () => {
    navigation.navigate('AllArtists');
  }
  
  return (
    <ScrollView style={styles.scrollContainer}>

        <BasicButton text = "See all artists" onPress = {gotoAllArtists}
          containerStyle = { styles.allArtistsButton }
        />

        <ArtistHorizontalCards
          title = "Favorite recent artists"
          artists = {shortTermArtists}
        />
        <ArtistHorizontalCards
          title = "Favorite artists in the past 6 months"
          artists = {mediumTermArtists}
        />
        <ArtistHorizontalCards
          title = "Favorite artists of all time"
          artists = {longTermArtists}
        />
        <ArtistHorizontalCards
          title = "Artists you follow"
          artists = {followedArtists}
        />
    </ScrollView>
  );
}





const styles = StyleSheet.create({
  scrollContainer: {
    ...Screens.screenContainer,
    flexDirection: 'column',
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  allArtistsButton: {
    marginTop: 16,
    marginBottom: 16,
    alignSelf: 'center',
  },

  noMusicProfileContainer: {
    ...Screens.screenContainer,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 40,
  },
  noMusicProfileText: {
    fontSize: 18,
  }

});