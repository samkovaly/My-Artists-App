import React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';



import { Colors, Screens, Buttons, Font } from '../../styles'

import { useSelector, useDispatch } from 'react-redux';

//import { setUpcomingConcerts, fetchConcertAPICredentials } from '../redux/actions/getConcertsActions'
import { getUserLocation, getConcertsAtLocation } from "../../store/concerts/concertsActions"
import BasicConcert from '../../components/BasicConcert';


import GooglePlacesSearch from '../../components/GooglePlacesSearch';

export default function Concerts(props) {

  const dispatch = useDispatch();

  const [searchingLocation, setSearchingLocation] = useState(false);

  const userLocation = useSelector(state => state.concerts.userLocation);
  const artists = useSelector(state => state.musicProfile.artists);
  const tracks = useSelector(state => state.musicProfile.tracks);
  const apiKey = useSelector(state => state.authentication.concertsCredentials.googlePlacesAPI.key);
  const concertsAtLocation = useSelector(state => state.concerts.concertsAtLocation);

  
  const startLocationSearch = () => {
    setSearchingLocation(true);
  }

  const updateLocation = (selectionData) => {
    console.log(selectionData.description);
    setSearchingLocation(false);
  }
 


  if (!userLocation){
    dispatch(getUserLocation());
    return loadingScreen()
  }else if(!concertsAtLocation){
    dispatch(getConcertsAtLocation());
    return loadingScreen();
  }
  
  if(searchingLocation){
    return searchingLocationView();
  }else{

  }


  return (
    <View style={styles.container}>
      
      <View style = {styles.searchContainer}>
        <GooglePlacesSearch apiKey={apiKey} onFocus = {startLocationSearch} onSelect = {(data) => updateLocation(data)}/>
      </View>

      {searchingLocation ?
        searchingLocationView() : 

        <View style={styles.concertListContainer}>
          <FlatList
                data={concertsAtLocation}
                renderItem={({ item }) => <BasicConcert concert = {item} pressForDetail = {false} navigation={props.navigation} />}
                //keyExtractor={item => item.id}
                keyExtractor = {(item, index) => `list-item-${index}`}
          />
        </View>
      }
    </View>
  );
}



  // concerts TODO
  // 1. get API data with location & API key
  // 2. filter by my artists
  // 3. sort by closest date
  // 4. disaptch to state
  // 5. display nicely



const loadingScreen = () => {
  return (
      <View style = {styles.container}>
          <Text style = {styles.loadingText} >Loading...</Text>
      </View>
  )
}

const searchingLocationView = () => {
  return (
    <View style = {styles.container}>

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  loadingText: {
    color: 'white',
    fontSize: 28,
  },
  searchContainer: {
    padding: 4,
    flex: 1,
  },
  concertListContainer: {

  },
});