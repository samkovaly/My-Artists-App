import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';
import { TabView } from 'react-native-tab-view';
import { useDispatch, useSelector } from 'react-redux';
import ConcertList from '../../components/concerts/ConcertList';
import ConcertsTabs from '../../components/concerts/ConcertsTabs';
import FiltersButton from '../../components/concerts/FiltersButton';
import { getUserLocation, setFiltersAction } from "../../store/concerts/concertsActions";
import { fetchAllConcertsAtLocation } from '../../store/concerts/effects/seatgeekEffects';
import { Colors, Screens } from '../../styles';









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


  const interestedConcerts = useSelector(state => state.concerts.interestedConcerts);

  navigation.setOptions({
    headerTitle: props => <FiltersButton filters = {filters} editFilters = {editFilters} />
  })

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
    { key: 'interestedConcerts', title: 'Favorites' },
  ]);



  if (!userLocation){
    dispatch(getUserLocation());
  }

  const initialLayout = { width: Dimensions.get('window').width };

  
  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'artistConcerts':
        return <ConcertList concerts = {artistConcerts} loading = {loadingConcerts}
                  noConcertsHeader = "Sorry, no concerts found."
                  noConcertsText = "Try expanding your filters to include more results."
              />;
      case 'allConcerts':
        return <ConcertList concerts = {allConcerts.current} loading = {loadingConcerts}
                  noConcertsHeader = "Sorry, no concerts found."
                  noConcertsText = "Try expanding your filters to include more results or listen to more artists on Spotify"
              />;
        case 'interestedConcerts':
          return <ConcertList concerts = {interestedConcerts} loading = {interestedConcerts == null}
                  noConcertsHeader = "No conerts you are watching."
                  noConcertsText = "Any concerts you have an interest for will show up here."
              />;
      default:
        return null;
    }
  };


  return (
      <View style = {styles.container}>
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
            color = {Colors.THEME_BLUE}
          />
      </View>
  )
}



const styles = StyleSheet.create({
  container: {
    ...Screens.screenContainer,
    paddingTop: 0,
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