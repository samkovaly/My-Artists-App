import React, { useState, useRef } from 'react';

import { Colors } from '../styles'

import { useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import IconAntDesign from 'react-native-vector-icons/AntDesign';

import { View,  StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { GooglePlacesAutocomplete } from './GooglePlacesAutocomplete'
import BaseText from './BaseText';
import { adjustSize } from '../utilities/scaling'

import SearchIcon from './searchBar/SearchIcon';
import CloseButton from './searchBar/CloseButton';



export default function PlacesSearchBarAutocomplete ({ setLocation, containerStyle }) {
    const googlePlacesAPIKey = useSelector(state => state.authentication.APICredentials.googlePlacesAPI.key);

    const googlePlacesRef = useRef(null);

    const userLocation = useSelector(state => state.concerts.userLocation);
    let description = null;
    let locationDenied = false;

    
    if(userLocation != "denied"){
        description = userLocation.displayString
        location = userLocation;
    }else{
        locationDenied = true;
        description = 'no location';
        location = null;
    }

    let userPlaces = [];
    if(!locationDenied){
        userPlaces = [{
            description: description,
            isUserLocation: true,
            location: location,
        }]
    }
    

    return (
        <GooglePlacesAutocomplete
        ref = {googlePlacesRef}

        onPress={(data, details = null) => {
            googlePlacesRef.current.clearDatur();

            if(data.isUserLocation){
                setLocation(data.location);
                return;
            }

            const city = data.terms[0].value;
            const state = data.terms[data.terms.length - 2].value;
            const country = data.terms[data.terms.length - 1].value;
            const latitude = details.geometry.location.lat;
            const longitude = details.geometry.location.lng;
            const USA = country == "USA" ? true : false;

            let displayString = city + ', ' + country;
            if(USA){
                displayString = city + ', ' + state;
            }

            setLocation({
                latitude,
                longitude,
                city,
                state,
                country,
                USA,
                displayString,
            });


        }}
        query={{
            key: googlePlacesAPIKey,
            language: 'en',
            types: '(regions)',
        }}

        placeholder='Search'
        predefinedPlaces = {userPlaces}
        predefinedPlacesAlwasyVisible = {!locationDenied}
        autoFocus = {false}
        keyboardAppearance = {'dark'}
        fetchDetails = {true}
        returnKeyType={'search'}
        enablePoweredByContainer = {false}

        renderLeftButton = { () => 
            <SearchIcon />
        }
        renderRightButton = { () =>
            <CloseButton onClose = {() => googlePlacesRef.current.clearDatur()}/>
        }

        textInputProps = {{
            clearButtonMode: 'never',
        }}
        suppressDefaultStyles = {true}

        styles={{
            container: {
                ...containerStyle,
            },
            textInputContainer: {
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: Colors.SEARCH_BAR_BACKGROUND,
                paddingVertical: adjustSize(8),
                paddingHorizontal: adjustSize(10),
                borderRadius: 6,
            },
            textInput: {
                backgroundColor: null,
                color: Colors.SEARCH_BAR_INPUT,
                fontSize: adjustSize(16),
                flex: 10,
            },
            listView: {
                marginLeft: adjustSize(12),
            },
            row: {
                paddingTop: adjustSize(14),
            },
            description: {
                color: 'white',
                fontSize: adjustSize(16),
            },
            predefinedPlacesDescription: {
                color: Colors.THEME_BLUE,
                fontWeight: '500',
            },
        }}
    />
)
}