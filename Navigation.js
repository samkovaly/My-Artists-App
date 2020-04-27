
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
import LoginWithSpotify from './screens/LoginWithSpotify';
import MyArtists from './screens/MyArtists';
import AllArtists from './screens/AllArtists';
import ArtistDetail from './screens/ArtistDetail';
import Concerts from './screens/Concerts';
import Discovery from './screens/Discovery';
import Settings from './screens/Settings';
import AuthLoadingScreen from './screens/AuthLoadingScreen';

import ConcertDetail from './screens/ConcertDetail';

import { Colors } from './styles'




    





  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();


    const ArtistsStack = () => {
      return (
      <Stack.Navigator>
        <Stack.Screen
          name="MyArtists"
          component={MyArtists}
          options={{title: 'Artists'}}
        />
        <Stack.Screen
          name="AllArtists"
          component={AllArtists}
          options={{title: 'All Artists'}}
        />
        <Stack.Screen
          name="ArtistDetail"
          component={ArtistDetail}
          options={{title: 'Artist Detail'}}
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
          options={{title: 'Concert Detail'}}
        />
      </Stack.Navigator>
      )
  }

    const tabOptions = {
      activeTintColor: 'green',
      labelStyle: {
        fontSize: 20,
      }
    }
    
    const MainTabs = () => {
    return (
      <Tab.Navigator tabBarOptions = {tabOptions}>
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