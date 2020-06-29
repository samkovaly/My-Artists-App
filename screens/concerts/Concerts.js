import React from 'react';
import { useEffect, useState, useMemo, useRef } from 'react';
import { StyleSheet, View, ScrollView, FlatList, Dimensions, ActivityIndicator  } from 'react-native';


import { Colors, Screens, Buttons, Font } from '../../styles'

import { useSelector, useDispatch } from 'react-redux';

import { TabView, SceneMap } from 'react-native-tab-view';

import { getUserLocation } from "../../store/concerts/concertsActions"
import { fetchAllConcertsAtLocation } from '../../store/concerts/effects/seatgeekEffects'

//import PagedFlatlist from '../../components/PagedFlatlist'
//import ConcertItemBig from '../../components/concerts/ConcertItemBig'

import ConcertsTabs from '../../components/concerts/ConcertsTabs'
import ConcertList from '../../components/concerts/ConcertList'
import BaseText from '../../components/BaseText'


import Icon from 'react-native-vector-icons/AntDesign'
import { TouchableOpacity } from 'react-native';

import { setFiltersAction} from '../../store/concerts/concertsActions'

import { useNavigation } from '@react-navigation/native';

const filterConcertsForArtists = (concerts, artists) => {

  // filter based on common property between both: slug
  if(!concerts || !artists){
    return [];
  }
  

  const performers = concerts.filter((concert) => {
    // return true to filter in
    for(performer of concert.performers){
      if(artists.has(performer.slug)){
        return true
      }
    }
    return false;
  });

  return performers;
}


export default function Concerts( {  } ) {


  const navigation = useNavigation();
  const dispatch = useDispatch();
  const seatgeekClientId = useSelector(state => state.authentication.APICredentials.seatgeek.client_id);
  const artistsMap = useSelector(state => state.musicProfile.artistSlugMap);

  const userLocation = useSelector(state => state.concerts.userLocation);

  const filters = useSelector(state => state.concerts.filters);
 
  const allConcerts = useRef([]);

  const artistConcerts = useMemo(() => filterConcertsForArtists(allConcerts.current, artistsMap), [allConcerts.current, artistsMap]);
  const [loadingConcerts, setLoadingConcerts] = useState(true);


  const test = useMemo(() => {
    console.log('here boy lollll')
    return 8;
  }, [filters])



  useEffect(() => { 
    const getAllConcerts = async () => {
      setLoadingConcerts(true);
      const concerts = await fetchAllConcertsAtLocation(seatgeekClientId,
        filters.months, filters.location.latitude, filters.location.longitude, filters.radius)
      allConcerts.current = concerts;
      setLoadingConcerts(false);
    }
    if(userLocation && filters.location.latitude != null){
      getAllConcerts();
    }
  }, [filters])



  useEffect(() => {
    if(userLocation){

      dispatch(setFiltersAction({
        ...filters,
        location: userLocation,
      }));
      /*
      setFilters({
        ...filters,
        location: userLocation,
      }) */
    }
  }, [userLocation])


  const editFilters = () => {
    navigation.navigate('ConcertFilters', {
      filters: filters,
      //apply: (filters) => {
        //setShowFilters(false)
      //  setFilters(filters);
      //}
    })
    //setShowFilters(true);
  }



  const [concertsTabIndex, setConcertsTabIndex] = useState(0);
  const [concertsRoutes] = useState([
    { key: 'artistConcerts', title: "My Concerts" },
    { key: 'allConcerts', title: 'All Concerts' },
  ]);



  if (!userLocation){
    dispatch(getUserLocation());
  }

  const initialLayout = { width: Dimensions.get('window').width };

  
  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'artistConcerts':
        return <ConcertList concerts = {artistConcerts} loading = {loadingConcerts}/>;
      case 'allConcerts':
        return <ConcertList concerts = {allConcerts.current} loading = {loadingConcerts} />;
      default:
        return null;
    }
  };


  return (
      <View style = {styles.container}>
        <TouchableOpacity onPress = {() => editFilters() }>
          <View style = {styles.filterContainer}>
              <BaseText style = {styles.filterText}>{filters.location.displayString + " (" + filters.radius + "mi)"}</BaseText>
              <Icon style = {styles.caretdown} name = "caretdown" size = {11} color = 'white' />
          </View>
        </TouchableOpacity>

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
      </View>
  );
}



const loadingScreen = () => {
  return (
      <View style = {styles.loadingContainer}>
          <ActivityIndicator
            size = 'large'
            color = {Colors.TAB_NAV_BLUE}
          />
      </View>
  )
}



const styles = StyleSheet.create({
  container: {
    ...Screens.screenContainer,
    paddingTop: 25,
  },
  filterContainer: {
    paddingTop: 12,
    paddingBottom: 2,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  filterText: {
    fontSize: 18,
    marginHorizontal: 6,
    fontWeight: '600',
  },
  caretdown: {
    paddingLeft: 0,
    paddingTop: 5
  },
  loadingContainer: {
    ...Screens.screenContainer,
    justifyContent: 'center',
    alignItems: 'center',
  },

  concertListContainer: {
    ...Screens.screenContainer,
    padding: 10,
  },
});