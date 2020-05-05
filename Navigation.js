
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import {
  Text,
} from 'react-native';

import { DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { NavigationContainer } from '@react-navigation/native'

// My screens
import LoginWithSpotify from './screens/authenticationFlow/LoginWithSpotify';
import AuthLoadingScreen from './screens/authenticationFlow/AuthLoadingScreen';

import Concerts from './screens/concerts/Concerts';
import ConcertDetail from './screens/concerts/ConcertDetail';

import MyArtists from './screens/artists/MyArtists';
import AllArtists from './screens/artists/AllArtists';
import ArtistDetail from './screens/artists/ArtistDetail';


import Discovery from './screens/Discovery';

import Settings from './screens/Settings';


import { Colors } from './styles'




import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Feather from 'react-native-vector-icons/Feather'

    





  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();


    const ArtistsStack = () => {
      return (
      <Stack.Navigator>
        <Stack.Screen
          name="MyArtists"
          component={MyArtists}
          options={{ title: 'Artists' }}
        />
        <Stack.Screen
          name="AllArtists"
          component={AllArtists}
          options={{title: 'My Artists'}}
        />
        <Stack.Screen
          name="ArtistDetail"
          component={ArtistDetail}
          options={({ route }) => ({ title: route.params.artist.name })}
        />
        <Stack.Screen
          name="ConcertDetail"
          component={ConcertDetail}
          options={({ route }) => ({ title: route.params.concert.artists[0].name })}
        />
      </Stack.Navigator>
      )
    }
  const ConcertsStack = () => {
      return (
      <Stack.Navigator>
        <Stack.Screen
          name="Concerts"
          component={Concerts}
          options={{title: 'Concerts'}}
        />
        <Stack.Screen
          name="ConcertDetail"
          component={ConcertDetail}
          options={({ route }) => ({ title: route.params.concert.artists[0].name })}
        />
      </Stack.Navigator>
      )
  }


    
    
    const MainTabs = () => {
      return (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {

              if (route.name === 'Artists') {
                return <MaterialCommunityIcon name = 'artist' style = {{marginBottom: -10}} size = {34} color = {color} />;

              } else if (route.name === 'Concerts') {
                return <FontAwesome5 name = 'music' style = {{marginBottom: -10}} size = {24} color = {color} />
              

              } else if (route.name === 'Discovery') {
                return <Feather name = 'globe' style = {{marginBottom: -5}} size = {26} color = {color} />
              }

              else if (route.name === 'Settings') {
                return <Feather name = 'settings' style = {{marginBottom: -5}} size = {26} color = {color} />
              }
              
            },
          })}
          tabBarOptions = {{
            activeTintColor: '#3e84e6',
            inactiveTintColor: '#c2c2c2',
            labelStyle: {
              fontSize: 14,
            },
            style: {
              backgroundColor: '#262626',
            }
          }}
        >
          <Tab.Screen name="Artists" component={ArtistsStack} />
          <Tab.Screen name="Concerts" component={ConcertsStack} />
          <Tab.Screen name="Discovery" component={Discovery} />
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
      );
    }
    
    
    
    const AuthFlow = () => {
      return (
        <Stack.Navigator headerMode = "none">
            <Stack.Screen name="AuthLoadingScreen" component={AuthLoadingScreen}/>
            <Stack.Screen name="LoginWithSpotify" component={LoginWithSpotify}/>
        </Stack.Navigator>
      )
    }
    
    const MyTheme = {
      dark: true,
      colors: {
        primary: 'white',
        background: Colors.SPOTIFY_BLACK,
        card: Colors.SPOTIFY_BLACK,
        text: 'white',
        border: Colors.SPOTIFY_BLACK,
      },
    };

export default function Navigation(props) {
  const loggedIn = useSelector(state => state.authentication.loggedIn);


  return (
    <NavigationContainer theme = {MyTheme}>
      { loggedIn ? (
        <MainTabs/>
      ) : (
        <AuthFlow/>
      )}
    </NavigationContainer>
  )
  
}