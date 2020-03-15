import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { SPOTIFY_GREEN, SPOTIFY_BLACK, LOGOUT_BUTTON_RED } from '../styles/colors';

import { logoutSpotify } from '../store/authentication/authenticationActions';




  

export default function Settings(props) {

    const dispatch = useDispatch();

      
    const logout = async() =>{
      dispatch(logoutSpotify())
      props.navigation.navigate('Auth');
    }
    const refreshData = async () => {
      dispatch(refreshSpotifyData())
      props.navigation.navigate('Concerts');
    }

    return (
        <View style={styles.container}>
            <Text>Settings</Text>

            {/* REFRESH SPOTIFY DATA */}
            <TouchableHighlight
              style = {fetchingArtists ? styles.getArtistsButtonDisabled : styles.getArtistsButton}
              onPress={fetchingArtists ? () => {} : () => refreshData()}>
              <Text style = {styles.getArtistsButtonText}>Refresh spotify data</Text>
            </TouchableHighlight>

            {/* LOGOUT OF SPOTIFY */}
            <TouchableHighlight
                style = {styles.logoutButton }
                onPress={() => logout()}>
                <Text style = {styles.logoutButtonText}>Logout</Text>
            </TouchableHighlight>

      </View>
    );
}






const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: SPOTIFY_BLACK,
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: 20,
    },
    getArtistsButton: {
      backgroundColor: SPOTIFY_GREEN,
      padding: 12,
      borderRadius: 8,
      margin: 8
    },
    getArtistsButtonDisabled: {
      backgroundColor: 'grey',
      padding: 12,
      borderRadius: 8,
      margin: 8

    },
    getArtistsButtonText: {
      color: 'white',
      fontSize: 20,
    },
  
    logoutButton: {
      borderColor: 'black',
      backgroundColor: LOGOUT_BUTTON_RED,
      padding: 12,
      borderRadius: 8,
    },
    logoutButtonText: {
      color: 'white',
      fontSize: 20,
    }
  });
  