import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { SPOTIFY_GREEN, SPOTIFY_BLACK } from '../styles/colors'



import { RegisterWithSpotifyFetch } from '../store/authentication/authenticationActions';

import { loadNewMusicProfile, getMusicProfile } from '../store/musicProfile/musicProfileActions';

export default function LoginWithSpotify(props) {

  const dispatch = useDispatch();


  const LoginUserButtonClicked = async () => {
    dispatch(RegisterWithSpotifyFetch());

    // display 'analyzing your Spotify' modal for some seconds while backend finishes
    dispatch(loadNewMusicProfile());
    dispatch(getMusicProfile());

    props.navigation.navigate('App');
  }



  return (
    <View style = {styles.loginContainer}>
        <TouchableHighlight
          style = {styles.loginButton}
          onPress={() => {LoginUserButtonClicked()}}>
          <Text style = {styles.loginButtonText}>Login with spotify</Text>
        </TouchableHighlight>
    </View>
  )
}


const styles = StyleSheet.create({
  loadingScreenContainer: {
    flex: 1,
    backgroundColor: SPOTIFY_BLACK,
  },
  loginContainer: {
    flex: 1,
    backgroundColor: SPOTIFY_BLACK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButton: {
    borderWidth: 3,
    borderColor: 'black',
    backgroundColor: SPOTIFY_GREEN,
    padding: 15,
    borderRadius: 12,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 26,
  }
});