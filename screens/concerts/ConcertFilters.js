import React, { useState } from 'react';

import { View,  StyleSheet } from 'react-native';
import BaseText from '../../components/BaseText'
import { useDispatch } from 'react-redux';

import { Colors, Screens } from '../../styles'


import BasicButton from '../../components/BasicButton';
import PlacesSearchBarAutocomplete from '../../components/PlacesSearchBarAutocomplete';

import { useNavigation } from '@react-navigation/native';
import { setFiltersAction} from '../../store/concerts/concertsActions'

// https://github.com/miblanchard/react-native-slider
import { Slider } from "@miblanchard/react-native-slider";

import { adjustSize } from '../../utilities/scaling'


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
            months: Math.round(months),
        }
        dispatch(setFiltersAction(filters));
        navigation.goBack();
    }

    return (
        <View style = { styles.modalContainer }>
            <View style = {styles.filtersContainer}>

                <View style = {styles.locationContainer}>
                    <BaseText style={styles.filterText }>Location: {location.displayString}</BaseText>
                    <PlacesSearchBarAutocomplete
                        setLocation = {setLocation}
                        containerStyle = {styles.PlacesSearchBarAutocomplete}
                    />
                </View>

                <View style = {styles.radiusContainer}>
                    <BaseText style={styles.filterText }>Radius: {Math.round(radius)} mi</BaseText>
                    <Slider
                        style={styles.radiusSlider}
                        minimumValue={1}
                        maximumValue={30}
                        value = {radius}
                        step = {0}
                        onValueChange = {(v) => setRadius(v)}
                        minimumTrackTintColor = {Colors.THEME_BLUE} //"#FFFFFF"
                        maximumTrackTintColor = {Colors.GREY}
                        thumbTintColor = {"white"} //"#FFFFFF"
                    />
                </View>

                <View style = {styles.monthsContainer}>
                    <BaseText style={styles.filterText }>Months ahead: {Math.round(months)}</BaseText>
                    <Slider
                        style={styles.monthsSlider}
                        minimumValue={1}
                        maximumValue={10}
                        value = {months}
                        step = {0}
                        onValueChange = {(v) => setMonths(v)}
                        minimumTrackTintColor = {Colors.THEME_BLUE} //"#FFFFFF"
                        maximumTrackTintColor = {Colors.GREY}
                        thumbTintColor = {"white"} //"#FFFFFF"
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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: adjustSize(10),
    },

    filtersContainer: {
        flex: 1,
        padding: adjustSize(22),
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },

    filterText: {
        fontSize: adjustSize(18),
    },

    locationContainer: {
        width: '100%',
        height: adjustSize(270),
        marginBottom: adjustSize(6),
    },
    PlacesSearchBarAutocomplete: {
        marginTop: adjustSize(12),
    },

    radiusContainer: {
        width: '100%',
        marginTop: adjustSize(7),
    },
    radiusSlider: {
        width: '100%',
        height: adjustSize(30),
        marginTop: adjustSize(5),
        marginBottom: adjustSize(10),
    },

    monthsContainer: {
        width: '100%',
        marginTop: 7,
    },
    monthsSlider: {
        width: '100%',
        height: adjustSize(30),
        marginTop: adjustSize(5),
        marginBottom: adjustSize(10),
    },

    buttonContainer: {
        marginBottom: adjustSize(25),
    },
})