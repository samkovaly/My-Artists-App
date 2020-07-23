import React, { useState, useRef } from 'react';

import { Colors } from '../styles'

import { useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import IconAntDesign from 'react-native-vector-icons/AntDesign';

import { View,  StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { GooglePlacesAutocomplete } from './GooglePlacesAutocomplete'
import BaseText from './BaseText';

export default function PlacesSearchBarAutocomplete ({ setLocation, containerStyle }) {
    //const [text, setText] = useState("");
    const googlePlacesAPIKey = useSelector(state => state.authentication.APICredentials.googlePlacesAPI.key);

    const googlePlacesRef = useRef(null);


    const userLocation = useSelector(state => state.concerts.userLocation);
    let description = null;
    let locationDenied = false;
    
    if(userLocation && userLocation != "denied"){
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
            <IconAntDesign
                name='search1'
                size = {20}
                color = "white"
                style = {styles.searchIcon}
            />
        }
        renderRightButton = { () =>
            <TouchableWithoutFeedback style = {styles.closeContainer} onPress = {() => googlePlacesRef.current.clearDatur()}>
                <Icon style = {styles.close} name = 'close-circle' size = {22} color = {Colors.LIGHT_GREY}/>
            </TouchableWithoutFeedback>
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
                paddingVertical: 10,
                paddingHorizontal: 12,
                borderRadius: 6,
                //marginVertical: 6,
            },
            textInput: {
                backgroundColor: null,
                color: Colors.SEARCH_BAR_INPUT,
                fontSize: 16,
                flex: 10,
            },
            listView: {
                marginLeft: 12,
            },
            row: {
                paddingTop: 14,
            },
            description: {
                color: 'white',
                fontSize: 16,
            },
            predefinedPlacesDescription: {
                color: Colors.THEME_BLUE,
                fontWeight: '500',
            },
        }}
    />
)
}

const styles = StyleSheet.create({
    searchIcon: {
        flex: 1,
        marginRight: 2,
    },
    closeContainer: {
        flex: 1,
    },
    close: {
        marginTop: 2,
    },
});