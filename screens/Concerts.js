import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

import { SPOTIFY_GREEN, SPOTIFY_BLACK, LOGOUT_BUTTON_RED } from '../styles/colors';

import { useSelector, useDispatch} from 'react-redux';

//import { setUpcomingConcerts, fetchConcertAPICredentials } from '../redux/actions/getConcertsActions'



export default function Concerts(props) {

  const dispatch = useDispatch();


  const artists = useSelector(state => state.artists.artists);
  const tracks = useSelector(state => state.tracks.tracks);
  const concerts = useSelector(state => state.concerts.concerts);

  if(concerts){
    console.log('displaying concerts')
    //return displayConcerts()
  }else{
    //useEffect(() => {
    //  setUpcomingConcerts(dispatch);
    //}, [])
    //fetchConcertAPICredentials()
    //setUpcomingConcerts(dispatch);
    return loadingScreen();
  }

  

  
}



  // concerts TODO
  // 1. get API data with location & API key
  // 2. filter by my artists
  // 3. sort by closest date
  // 4. disaptch to state
  // 5. display nicely

const displayConcerts = () => {
  return (
    <View style={styles.container}>
      <Text>CONCERTS</Text>

      <View style={{flex: 1}}>
        <ScrollView>
          <Card containerStyle={{ padding: 5}}>
            {
              concerts? concerts.map((concert, i) => (
                <ListItem
                  key={i}
                  //leftAvatar={{ source: {uri: concert.image_url || "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" } }}
                  title={concert.name}
                  //subtitle={concert.id}
                  titleStyle={styles.title}
                  bottomDivider
                  />
              ))
              : <Text>not fetched yet</Text>}
            </Card>
          </ScrollView>
      </View>
    </View>
  );
}


const loadingScreen = () => {
  return (
      <View style = {styles.loadingScreenContainer}>
          <Text>Loading...</Text>
          <Text>Loading...</Text>
          <Text>Loading...</Text>
          <Text>Loading...</Text>
      </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SPOTIFY_BLACK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    backgroundColor: SPOTIFY_GREEN,
    padding: 5,
    marginVertical: 4,
    marginHorizontal: 8,
  },
  title: {
    fontSize: 20,
  },
});