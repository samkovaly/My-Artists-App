import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Colors } from '../../styles'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { showLocation } from '../concerts/map-link'

const OpenMapButton = ({ name, lat, lon}) => {
    return (
        <TouchableOpacity
            onPress={() => openMap(name, lat, lon)}>
            <Icon name = "map-marker" color = {Colors.TAB_NAV_BLUE} size = {28} />
        </TouchableOpacity>
    )
}
export default OpenMapButton;



const openMap = (name, lat, long) => {
    showLocation({
      usingExpo: true,
      forceAppList: ['apple-maps', 'google-maps'],
      latitude: lat,
      longitude: long,
      title: name,  // optional
      googleForceLatLon: false,  // optionally force GoogleMaps to use the latlon for the query instead of the title
      dialogTitle: 'Open in Maps', // optional (default: 'Open in Maps')
      dialogMessage: 'Which map app would you like to use', // optional (default: 'What app would you like to use?')
      cancelText: 'Cancel', // optional (default: 'Cancel')
    })
  }
  
  
const styles = StyleSheet.create({
  });