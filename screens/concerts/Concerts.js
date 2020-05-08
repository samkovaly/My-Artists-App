import React from 'react';
import { useEffect, useState, useMemo } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, Dimensions  } from 'react-native';


import { Colors, Screens, Buttons, Font } from '../../styles'

import { useSelector, useDispatch } from 'react-redux';

import { TabView, SceneMap } from 'react-native-tab-view';

import { getUserLocation, getAllConcerts } from "../../store/concerts/concertsActions"

import ConcertList from '../../components/concerts/ConcertList'
import ConcertsTabs from '../../components/concerts/ConcertsTabs'


const filterConcertsForArtists = (concerts, artists) => {
  // filter based on common property between both: slug
  // n^2 time
  if(!concerts || !artists){
    return [];
  }
  
  console.log('filtering...')

  const artistConcerts = concerts.filter((concert) => {
    // return true to filter in
    for(concertArtist of concert.artists){
      if(artists.has(concertArtist.slug)){
        return true
      }
    }
    return false;
  });

  return artistConcerts;
}



export default function Concerts(props) {

  const dispatch = useDispatch();

  //const [searchingLocation, setSearchingLocation] = useState(false);

  const userLocation = useSelector(state => state.concerts.userLocation);

  const allConcerts = useSelector(state => state.concerts.allConcerts);
  const artistsMap = useSelector(state => state.musicProfile.artists);
  const artistConcerts = useMemo(() => filterConcertsForArtists(allConcerts, artistsMap), [allConcerts, artistsMap]);



  const [concerts, setConcerts] = useState([]);


  const [concertsTabIndex, setConcertsTabIndex] = useState(0);
  const [concertsRoutes] = useState([
    { key: 'artistConcerts', title: 'My Artists' },
    { key: 'allConcerts', title: 'All Concerts' },
    { key: 'genreConcerts', title: 'Genres' },
  ]);
 



  if (!userLocation){
    dispatch(getUserLocation());
    return loadingScreen()
  }else if(!allConcerts){
    dispatch(getAllConcerts());
    return loadingScreen();
  }else if(!artistConcerts){
    setArtistConcerts(filterConcertsForArtists(allConcerts, artistsMap));
    return loadingScreen();
  }


  const initialLayout = { width: Dimensions.get('window').width };

  
  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'artistConcerts':
        return <ConcertList concerts = {artistConcerts} displayConcertName={false} style = {styles.concertListContainer} />;
      case 'allConcerts':
        return <ConcertList concerts = {allConcerts} displayConcertName={false} style = {styles.concertListContainer} />;
      case 'genreConcerts':
        return <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
      default:
        return null;
    }
  };


  return (
    <TabView
      renderTabBar={props => <ConcertsTabs {...props} />}
      navigationState={{
        index: concertsTabIndex,
        routes: concertsRoutes
      }}
      renderScene={renderScene}
      
      onIndexChange={setConcertsTabIndex}
      initialLayout={initialLayout}
    />
  );
}


const loadingScreen = () => {
  return (
      <View style = {styles.container}>
          <Text style = {styles.loadingText} >Loading...</Text>
      </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'black',
  },
  loadingText: {
    color: 'white',
    fontSize: 28,
  },
  concertListContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: 'black',
  },
});