import React from 'react';

import { StyleSheet, ScrollView } from 'react-native';

import { Colors, Screens} from '../../styles'
import SettingsSwitch from '../../components/settings/SettingsSwitch'



export default function NotificationSettings(props) {


    const updateNotificationSettings = (name, value) => {
        console.log(name, value);
    }


    return (
      <ScrollView style = {styles.container}>

            
            <SettingsSwitch
                text = "Notifications1"
                onSwitch = {(value) => updateNotificationSettings("Notifications1", value)}
                style = {styles.elementGroupLead}
            />
            
            <SettingsSwitch
                text = "Notifications2"
                onSwitch = {(value) => updateNotificationSettings("Notifications2", value)}
                style = {styles.elementGrouped}
            />
            
            <SettingsSwitch
                text = "Notifications3"
                onSwitch = {(value) => updateNotificationSettings("Notifications3", value)}
                style = {styles.elementGrouped}
            />
            
            <SettingsSwitch
                text = "Notifications4"
                onSwitch = {(value) => updateNotificationSettings("Notifications4", value)}
                style = {styles.elementGrouped}
            />

      </ScrollView>
    );
}

const groupDistance = 20;
const groupWidth = 1.5;

const styles = StyleSheet.create({
  container: {
    ...Screens.screenContainer,
  },
  elementGroupLead: {
    marginTop: groupDistance,
  },
  elementGrouped: {
    marginTop: groupWidth,
  },
})