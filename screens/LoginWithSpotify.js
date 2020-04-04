import React from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { SPOTIFY_GREEN, SPOTIFY_BLACK } from '../styles/colors'



import { getRefreshToken, registerWithRefreshToken } from '../store/authentication/authenticationActions';

import { refreshAndGetMusicProfile } from '../store/musicProfile/musicProfileActions';

export default function LoginWithSpotify(props) {

  const dispatch = useDispatch();


  // ask to sign in to spotify, which will return a refrsh token if successful,
  // and null if the user refused or an error occured
  const LoginUserButtonClicked = async () => {
    await dispatch(getRefreshToken());
  }
  const registerAnalyzeAndGetMusicProfile = async() => {
    await dispatch(registerWithRefreshToken());
    await dispatch(refreshAndGetMusicProfile());
    console.log("navigating to app now")
    props.navigation.navigate('App');
  }
  
  const refreshToken = useSelector(state => state.authentication.refreshToken);

  if(refreshToken){
    registerAnalyzeAndGetMusicProfile()
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