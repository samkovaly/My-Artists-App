import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { Colors, Screens, Buttons} from '../styles'

import { logout } from '../store/authentication/authenticationActions';
import { refreshAndGetMusicProfile, setAnalyzingSpotifyAction } from '../store/musicProfile/musicProfileActions'
  

export default function Settings(props) {

    const dispatch = useDispatch();

    const logoutClicked = async() =>{
      await dispatch(logout())
    }
    const refreshMusicProfile = async () => {
      await dispatch(setAnalyzingSpotifyAction(true));
      await dispatch(refreshAndGetMusicProfile());
      await dispatch(setAnalyzingSpotifyAction(false));
    }

    const analyzingSpotify = useSelector(state => state.musicProfile.analyzingSpotify);

    return (
        <View style={styles.container}>
            <Text>Settings</Text>

            {/* REFRESH SPOTIFY DATA */}
            <TouchableHighlight
              style = {analyzingSpotify ? styles.refreshArtistsButtonDisabled : styles.refreshArtistsButton}
              onPress={analyzingSpotify ? () => {} : () => refreshMusicProfile()}>
              <Text style = {styles.buttonText}>Refresh spotify data</Text>
            </TouchableHighlight>

            {/* LOGOUT OF SPOTIFY */}
            <TouchableHighlight
                style = {styles.logoutButton }
                onPress={() => logoutClicked()}>
                <Text style = {styles.buttonText}>Logout</Text>
            </TouchableHighlight>

      </View>
    );
}



const styles = StyleSheet.create({
  container: {
    ...Screens.screenContainerFlexEnd,
    padding: 20,
  },
  refreshArtistsButton: {
    ...Buttons.mediumButtonGreen,
  },
  refreshArtistsButtonDisabled: {
    ...Buttons.mediumButtonDisabled,
  },
  logoutButton: {
    ...Buttons.mediumButtonRed,
  },
  buttonText: {
    ...Buttons.mediumButtonWhiteText,
  },
})