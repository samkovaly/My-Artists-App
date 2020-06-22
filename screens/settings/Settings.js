import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Linking} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';

import { Colors, Screens} from '../../styles'

import { logout } from '../../store/authentication/authenticationActions';

import ErrorCard from '../../components/ErrorCard';
  
import SettingsOpenScreenButton from '../../components/settings/SettingsOpenScreenButton';
import SettingsActionButton from '../../components/settings/SettingsActionButton';

import { twoButtonConfirmAlert } from '../../utilities/alerts'
import { useNavigation } from '@react-navigation/native';
import BaseText from '../../components/BaseText';


const SUPPORT_EMAIL = 'xilernet@gmail.com';
const EMAIL_SUBJECT = 'My Artists App';
const EMAIL_BODY = '';
const lastRefreshed = 'date here';

export default function Settings(props) {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const logoutClicked = async() =>{
      twoButtonConfirmAlert("Logout", "Are you sure?", logoutConfirmed, null);
    }
    const logoutConfirmed = async() => {
      await dispatch(logout())
    }

    const refreshMusicProfile = async () => {
      navigation.navigate("AnalyzeSpotify");
    }

    const contactUsClicked = () => {
      twoButtonConfirmAlert("Contact Us", "Open email?", sendEmail, null);
    }
    const sendEmail = () => {
      Linking.openURL(`mailto:${SUPPORT_EMAIL}?subject=${EMAIL_SUBJECT}&body=${EMAIL_BODY}`)
    }

    const usename = useSelector(state => state.authentication.username);
    const spotifyError = useSelector(state => state.musicProfile.refreshSpotifyError);

    const spotifyErrorHeader = "Error"
    const spotifyErrorMessage = "Something went wrong while analyzing your spotify, please try again"




    return (
      <View style = {{flex: 1}}>
        <ErrorCard showError = {spotifyError} close={() => dispatch(setRefreshSpotifyError(false)) } header={spotifyErrorHeader} message={spotifyErrorMessage} />
        
        <ScrollView style={styles.container}>

            <BaseText style = {styles.topText} >Spotify account name: {username}</BaseText>
            <BaseText style = {styles.topText} >Last refreshed: {lastRefreshed}</BaseText>

            <SettingsOpenScreenButton
              text = "Notifications"
              screen = "NotificationSettings"
              style = {styles.elementGroupLead}
            />

            <SettingsOpenScreenButton
              text = "Terms of Use"
              screen = "TermsOfUse"
              style = {styles.elementGrouped}
            />

            <SettingsActionButton
              text = "Contact"
              textColor = {Colors.BASE_TEXT_COLOR}
              onPress = {() => contactUsClicked()}
              style = {styles.elementGrouped}
            />
            

            <SettingsActionButton
              text = "Refresh Spotify Data"
              textColor = {Colors.SPOTIFY_GREEN}
              onPress = { () => navigation.navigate('AnalyzeSpotify') }
              style = {styles.elementGroupLead}
            />

            <SettingsActionButton
              text = "Logout"
              textColor = {Colors.LOGOUT_RED}
              onPress = {() => logoutClicked()}
              style = {styles.elementGrouped}
            />

      </ScrollView>
      </View>
    );
}
const groupDistance = 20;
const groupWidth = 1.5;

const styles = StyleSheet.create({
  container: {
    ...Screens.screenContainer,
    paddingVertical: groupDistance,
  },
  topText: {
    fontSize: 15,
    marginLeft: 14,
  },
  elementGrouped: {
    marginTop: groupWidth,
  },
  elementGroupLead: {
    marginTop: groupDistance,
  },
})