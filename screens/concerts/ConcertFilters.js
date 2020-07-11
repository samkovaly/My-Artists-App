import React, { useState } from 'react';
import { useSelector } from 'react-redux'

import { View,  StyleSheet, Dimensions } from 'react-native';
import { TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import BaseText from '../../components/BaseText'
import { useDispatch } from 'react-redux';

import { Colors, Screens } from '../../styles'

import {Slider} from 'react-native'

import BasicButton from '../../components/BasicButton';
import LocationSearch from '../../components/LocationSearch';

import { useNavigation } from '@react-navigation/native';
import { setFiltersAction} from '../../store/concerts/concertsActions'

const ConcertFilters = ({ route }) => {

    const dispatch = useDispatch();

    const navigation = useNavigation();
    const initialFilters = route.params.filters;
    const apply = route.params.apply;

    const [location, setLocation] = useState(initialFilters.location);
    const [radius, setRadius] = useState(initialFilters.radius);
    const [months, setMonths] = useState(initialFilters.months);

    const applyFilters = () => {
        const filters = {
            location: location,
            radius: Math.round(radius),
            months: months,
        }
        dispatch(setFiltersAction(filters));
        navigation.goBack();
    }

    return (
        <View style = { styles.modalContainer }>
            <View style = {styles.filtersContainer}>

                <View style = {styles.locationContainer}>
                    <BaseText style={styles.filterText }>Location: {location.displayString}</BaseText>
                    <LocationSearch
                        setLocation = {setLocation}
                        containerStyle = {styles.LocationSearch}
                    />
                </View>

                <View style = {styles.radiusContainer}>
                    <BaseText style={styles.filterText }>Radius: {Math.round(radius)} mi</BaseText>
                    <Slider
                        style={styles.radiusSlider}
                        minimumValue={2}
                        maximumValue={20}
                        value = {radius}
                        step = {0} // need to keep at 0, or EJECT EXPO LOL
                        onValueChange = {(v) => setRadius(v)}
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="#000000"
                    />
                </View>

                <View style = {styles.monthsContainer}>
                    <BaseText style={styles.filterText }>Months ahead: {Math.round(months)}</BaseText>
                    <Slider
                        style={styles.monthsSlider}
                        minimumValue={1}
                        maximumValue={12}
                        value = {months}
                        step = {0} // need to keep at 0, or EJECT EXPO LOL
                        onValueChange = {(v) => setMonths(v)}
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="#000000"
                    />
                </View>
            </View>

            <BasicButton text = "Apply" onPress = {applyFilters}
                containerStyle = {styles.buttonContainer}
             />
        </View>
    )
}


export default ConcertFilters;




const styles = StyleSheet.create({
    modalContainer: {
        ...Screens.screenContainer,
        //backgroundColor: Colors.GREY,

        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    filtersContainer: {
        flex: 1,
        padding: 22,
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },

    filterText: {
        fontSize: 18,
    },

    locationContainer: {
        width: '100%',
        marginTop: 7,
        height: 260,
    },
    LocationSearch: {
        marginTop: 12,
    },

    radiusContainer: {
        width: '100%',
        marginTop: 7,
    },
    radiusSlider: {
        width: '100%',
        height: 30,
        marginTop: 5,
        marginBottom: 10,
    },

    monthsContainer: {
        width: '100%',
        marginTop: 7,
    },
    monthsSlider: {
        width: '100%',
        height: 30,
        marginTop: 5,
        marginBottom: 10,
    },

    buttonContainer: {
        marginBottom: 25,
    },
})