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

  const filters = useSelector(state => state.concerts.filters);
 
  const allConcerts = useRef([]);

  const artistConcerts = useMemo(() => filterConcertsForArtists(allConcerts.current, artistsMap), [allConcerts.current, artistsMap]);
  const [loadingConcerts, setLoadingConcerts] = useState(false);

  const interestedConcerts = useSelector(state => state.concerts.interestedConcerts);

  const userLocation = useSelector(state => state.concerts.userLocation);

  const [concertsTabIndex, setConcertsTabIndex] = useState(0);
  const [concertsRoutes] = useState([
    { key: 'artistConcerts', title: "My Concerts" },
    { key: 'allConcerts', title: 'All Concerts' },
    { key: 'interestedConcerts', title: 'Favorites' },
  ]);



  useEffect(() => {
    const getAllConcerts = async () => {
      setLoadingConcerts(true);
      const concerts = await fetchAllConcertsAtLocation(seatgeekClientId,
        filters.months, filters.location.latitude, filters.location.longitude, filters.radius)
      allConcerts.current = concerts;
      setLoadingConcerts(false);
    }
    if(filters.location.latitude != null){
      getAllConcerts();
    }
  }, [filters])

  useEffect(() => {
    if(userLocation != null && userLocation != "undetermined" && userLocation != "denied"){
      dispatch(setFiltersAction({
        ...filters,
        location: userLocation,
      }));
    }
  }, [userLocation])

  // ask for if we don't have yet
  if (userLocation == null){
    dispatch(getUserLocation());
  }

  navigation.setOptions({
    headerTitle: props => <FiltersButton filters = {filters} editFilters = {editFilters} />
  })

  const editFilters = () => {
    navigation.navigate('ConcertFilters', {
      filters: filters,
    })
  }

  const initialLayout = { width: Dimensions.get('window').width };

  
  const renderScene = ({ route }) => {
    const locationDenied = ((userLocation == null || userLocation == "denied") && filters.location.latitude == null);
    const locationDeniedHeader = "Need a location."
    const locationDeniedText = "Give location permission or manually search for a city above.";

    const backendErrorHeader = "Oops, there was an error!";
    const backendErrorText = "Unfortunately there was an error with Spotify and we can't load any of your artists. We have been notified of this and it will be fixed soon. Luckily the 'All Concerts' tab still works!";

    switch (route.key) {
      case 'artistConcerts':
        return <ConcertList concerts = {artistConcerts} loading = {loadingConcerts} locationDenied = {locationDenied}
                  noConcertsHeader = "Sorry, no concerts found"
                  noConcertsText = "Try changing the city or increasing the radius to include more results."
                  locationDeniedHeader = {locationDeniedHeader}
                  locationDeniedText = {locationDeniedText}

                  backendErrorHeader = {backendErrorHeader}
                  backendErrorText = {backendErrorText}
                  backendError = {artistsMap == null}

              />;
      case 'allConcerts':
        return <ConcertList concerts = {allConcerts.current} loading = {loadingConcerts} locationDenied = {locationDenied}
                  noConcertsHeader = "Sorry, no concerts found"
                  noConcertsText = "Try changing the city or increasing the radius to include more results or listen to more artists on Spotify"
                  locationDeniedHeader = {locationDeniedHeader}
                  locationDeniedText = {locationDeniedText}
              />;
      case 'interestedConcerts':
        return <ConcertList concerts = {interestedConcerts} loading = {interestedConcerts == null} locationDenied = {false}
                  noConcertsHeader = "You have not favorited any concerts"
                  noConcertsText = "Any concerts that you favorite will show up here."
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