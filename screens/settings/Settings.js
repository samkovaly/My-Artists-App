import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Linking, ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import BaseText from '../../components/BaseText';
import ErrorCard from '../../components/ErrorCard';
import SettingsActionButton from '../../components/settings/SettingsActionButton';
import SettingsOpenScreenButton from '../../components/settings/SettingsOpenScreenButton';
import { logout } from '../../store/authentication/authenticationActions';
import { setRefreshSpotifyError } from '../../store/musicProfile/musicProfileActions';
import { Colors, Screens } from '../../styles';
import { twoButtonConfirmAlert } from '../../utilities/alerts';




  



const SUPPORT_EMAIL = 'xilernet@gmail.com';
const EMAIL_SUBJECT = 'My Artists App';
const EMAIL_BODY = '';

export default function Settings(props) {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const lastRefreshed = useSelector(state => state.musicProfile.lastRefreshed);

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

            { /*
            <SettingsOpenScreenButton
              text = "Notifications"
              screen = "NotificationSettings"
              style = {styles.elementGroupLead}
            />
            */ }
            
            <SettingsOpenScreenButton
              text = "Terms of Use"
              screen = "TermsOfUse"
              //style = {styles.elementGrouped}
              style = {styles.elementGroupLead}
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
              textColor = {Colors.RED}
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