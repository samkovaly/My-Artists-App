
import React from 'react';
import { Image, Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import Icon from 'react-native-vector-icons/EvilIcons';


const styles = StyleSheet.create({
    searchIcon: {
        marginLeft: 6,
    }
})

/* returns:
Object {
  "description": "San Leandro, CA, USA",
  "id": "beed4757e72862d116aca111a7caa31170d72221",
  "matched_substrings": Array [
    Object {
      "length": 3,
      "offset": 0,
    },
  ],
  "place_id": "ChIJ3WY6BH-Fj4ARslfX2g1JquU",
  "reference": "ChIJ3WY6BH-Fj4ARslfX2g1JquU",
  "structured_formatting": Object {
    "main_text": "San Leandro",
    "main_text_matched_substrings": Array [
      Object {
        "length": 3,
        "offset": 0,
      },
    ],
    "secondary_text": "CA, USA",
  },
  "terms": Array [
    Object {
      "offset": 0,
      "value": "San Leandro",
    },
    Object {
      "offset": 13,
      "value": "CA",
    },
    Object {
      "offset": 17,
      "value": "USA",
    },
  ],
  "types": Array [
    "locality",
    "political",
    "geocode",
  ],
}
*/

const searchIcon = <Icon name="search" size={30} color="white"  style = {styles.searchIcon}/>;

const GooglePlacesSearch = ( {apiKey, onSelect, onFocus} ) => {
  return (
      <TouchableWithoutFeedback onPress={() => console.log('abc')}>
        <GooglePlacesAutocomplete
        placeholder='Enter City'
        minLength={2} // minimum length of text to search
        autoFocus={false}
        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        keyboardAppearance={'dark'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance

        onPress={(data) => { // 'details' is provided when fetchDetails = true
            onSelect(data)
        }}

        getDefaultValue={() => ''}

        query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: apiKey,
            language: 'en', // language of the results
            types: '(cities)' // default: 'geocode'
        }}

        styles={{
            container: {
                flex: 1,
            },
            textInputContainer: {
            width: '100%',
            backgroundColor: '#303030',
            alignItems: 'center',
            
            height: null,
            borderTopWidth: 0,
            borderBottomWidth: 0,
            flexDirection: 'row',
            borderRadius: 6,
            },
            textInput: {
                color: 'white', 
                backgroundColor: '#303030',
    
                height: 36,
    
                paddingTop: 4.5,
                paddingBottom: 4.5,
                paddingLeft: 10,
                paddingRight: 10,
    
                marginTop: 0,
                marginBottom: 0,
                marginLeft: 0,
                marginRight: 0,

            },
            row: {
                padding: 13,
                height: 44,
                flexDirection: 'row',
            },

            description: {
                color: '#d2e4f7',
            },
            separator: {
                height: 0,
            },

            predefinedPlacesDescription: {
            color: '#377bc4',
            fontSize: 18,
            },

        }}

        currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
        currentLocationLabel="My location"
        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={{
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
        }}
        GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: 'distance',
            type: 'cafe'
        }}
        
        GooglePlacesDetailsQuery={{
            // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
            fields: 'formatted_address',
        }}

        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
        renderLeftButton={()  => searchIcon}

        enablePoweredByContainer = {false}
        />
    </TouchableWithoutFeedback>
  );
}


export default GooglePlacesSearch;