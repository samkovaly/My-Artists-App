import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';


import { SPOTIFY_GREEN, SPOTIFY_BLACK, LOGOUT_BUTTON_RED } from '../styles/colors';

import { useSelector} from 'react-redux';


import { ListItem, ThemeProvider, Card } from 'react-native-elements';


const theme = {

}


export default function MyArtists(props) {

  //console.log("state in myArtists", state)
  const artists = useSelector(state => state.musicProfile.artists);

  if(artists !== undefined){
    console.log('artists returned:', artists.length)
    console.log('artists[0]', artists[0])
  }

  
  return (
    <View style={styles.container}>

      <View style={{flex: 1}}>
        <ScrollView>
          <Card containerStyle={{ padding: 5}}>
            {
              artists? artists.map((artist, i) => (
                <ListItem
                  key={i}
                  leftAvatar={{ source: {uri: artist.image_url || "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" } }}
                  title={artist.name}
                  subtitle={artist.id}
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


function ShowArtist( artist ) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{artist.name}{' '}{artist.top_artists_long_term}</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: SPOTIFY_GREEN,
    padding: 8,
    marginVertical: 2,
    marginHorizontal: 8,
    borderRadius: 6
  },
  title: {
    fontSize: 20,
  },
});