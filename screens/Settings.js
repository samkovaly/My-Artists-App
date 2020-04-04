import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { SPOTIFY_GREEN, SPOTIFY_BLACK, LOGOUT_BUTTON_RED } from '../styles/colors';

import { logout } from '../store/authentication/authenticationActions';
import { refreshAndGetMusicProfile } from '../store/musicProfile/musicProfileActions'
  

export default function Settings(props) {

    const dispatch = useDispatch();

    const logoutClicked = async() =>{
      await dispatch(logout())
      props.navigation.navigate('Auth');
    }
    const refreshMusicProfile = async () => {
      await dispatch(refreshAndGetMusicProfile());
      //props.navigation.navigate('MyArtists');
    }

    const analyzingSpotify = useSelector(state => state.musicProfile.analyzingSpotify);

    return (
        <View style={styles.container}>
            <Text>Settings</Text>

            {/* REFRESH SPOTIFY DATA */}
            <TouchableHighlight
              style = {analyzingSpotify ? styles.getArtistsButtonDisabled : styles.getArtistsButton}
              onPress={analyzingSpotify ? () => {} : () => refreshMusicProfile()}>
              <Text style = {styles.getArtistsButtonText}>Refresh spotify data</Text>
            </TouchableHighlight>

            {/* LOGOUT OF SPOTIFY */}
            <TouchableHighlight
                style = {styles.logoutButton }
                onPress={() => logoutClicked()}>
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
  