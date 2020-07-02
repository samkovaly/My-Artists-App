
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'


import { DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { NavigationContainer } from '@react-navigation/native'

// My screens
// AUTH
import LoginWithSpotify from './screens/authenticationFlow/LoginWithSpotify';
import AuthLoadingScreen from './screens/authenticationFlow/AuthLoadingScreen';

// Concerts
import Concerts from './screens/concerts/Concerts';
import ConcertDetail from './screens/concerts/ConcertDetail';
import ConcertFilters from './screens/concerts/ConcertFilters';

// Artists
import MyArtists from './screens/artists/MyArtists';
import AllArtists from './screens/artists/AllArtists';
import ArtistDetail from './screens/artists/ArtistDetail';

// Discovery
import Discovery from './screens/discover/Discovery';
import ArtistSearch from './screens/discover/ArtistSearch';
import ConcertSearch from './screens/discover/ConcertSearch';

import Settings from './screens/settings/Settings';
import NotificationSettings from './screens/settings/NotificationSettings';
import TermsOfUse from './screens/settings/TermsOfUse';
import AnalyzeSpotify from './screens/settings/AnalyzeSpotify'


import { Colors } from './styles'

import { TouchableOpacity, Text } from 'react-native'


import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Feather from 'react-native-vector-icons/Feather'

    

  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();


  const stackScreenOptions = {
    headerStyle: {
      backgroundColor: Colors.FOREGROUND_BLUE,
      shadowOffset: { height: 0, width: 0 },
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }

  const concertDetailScreen = () => {
    const trimLength = 24;
    return (
      <Stack.Screen
      name="ConcertDetail"
      component={ConcertDetail}
      //options={({ route }) => ({ title: route.params.concert.performers[0].name })}
      options={({ route }) => {
        let name =  route.params.concert.name;
        if(name.length > trimLength){
          name = name.slice(0,trimLength) + "...";
        }
        return {
          title: name
        }
      }}
    />
    )
  }
  const ArtistDetailScreen = () => {
    const trimLength = 24;
    return (
      <Stack.Screen
      name="ArtistDetail"
      component={ArtistDetail}
      options={({ route }) => {
        let name =  route.params.artist.name;
        if(name.length > trimLength){
          name = name.slice(0,trimLength) + "...";
        }
        return {
          title: name
        }
      }}
    />
    )
  }

    const ArtistsStack = () => {
      return (
      <Stack.Navigator
        screenOptions={stackScreenOptions}
      >
        <Stack.Screen
          name="MyArtists"
          component={MyArtists}
          options={{
            title: 'My Artists',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="AllArtists"
          component={AllArtists}
          options={{
            title: 'All Artists'
          }}
        />
        { concertDetailScreen() }
        { ArtistDetailScreen() }

      </Stack.Navigator>
      )
    }


    const ConcertsStack = () => {
      return (
        <Stack.Navigator screenOptions={stackScreenOptions}>
          <Stack.Screen
            name="Concerts"
            component={Concerts}
            options={{
              //title: 'Concerts',
              headerShown: true,
            }}
          />
          { concertDetailScreen() }
          { ArtistDetailScreen() }
      </Stack.Navigator>
    )
  }


  
  const DiscoveryStack = () => {
    return (
    <Stack.Navigator
      screenOptions={stackScreenOptions}
    >
      <Stack.Screen
        name="Discover"
        component={Discovery}
        options={{
          //title: 'Discover',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="ArtistSearch"
        component={ArtistSearch}
        options={{ title: 'Discover Artists' }}
      />
      <Stack.Screen
        name="ConcertSearch"
        component={ConcertSearch}
        options={{ title: 'Discover Concerts' }}
      />
      { concertDetailScreen() }
      { ArtistDetailScreen() }

    </Stack.Navigator>
    )
  }

  const SettingsStack = () => {
    return (
      <Stack.Navigator
        screenOptions={stackScreenOptions}
      >
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          //title: 'Settings',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="NotificationSettings"
        component={NotificationSettings}
        options={{title: 'Notifications'}}
      />
      <Stack.Screen
        name="TermsOfUse"
        component={TermsOfUse}
        options={{title: 'Terms of use'}}
      />
      <Stack.Screen
        name="AnalyzeSpotify"
        component={AnalyzeSpotify}
        options={{
          title: 'Spotify',
        }}
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
              activeTintColor: Colors.TAB_NAV_BLUE,
              inactiveTintColor: Colors.TAB_NAV_GREY,
              labelStyle: {
                fontSize: 12,
              },
              style: {
                backgroundColor: Colors.FOREGROUND_BLUE,
                borderTopWidth: 0,
              }
            }}
          >
            <Tab.Screen name="Concerts" component={ConcertsStack} />
            <Tab.Screen name="Artists" component={ArtistsStack} />
            <Tab.Screen name="Discovery" component={DiscoveryStack} />
            <Tab.Screen name="Settings" component={SettingsStack} />
          </Tab.Navigator>
      );
    }
    
    
    const MainApp = () => {
      return (
        <Stack.Navigator mode="modal"
          screenOptions={stackScreenOptions} >
          <Stack.Screen
            name = "MainTabs"
            component = {MainTabs}
            options = {{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name = "ConcertFilters"
            component = {ConcertFilters}
            options={{
              title: 'Filter Concerts',
              headerLeft: ( { onPress } ) => (
                // onPress defaults to goBack()
                <TouchableOpacity onPress={onPress} >
                  <Text style = {{
                      color: Colors.TAB_NAV_BLUE,
                      fontSize: 17,
                      fontWeight: '700',
                      marginLeft: 12,
                    }}>Cancel</Text>
                </TouchableOpacity>
              ),
            }}
          />
        </Stack.Navigator>
      )
    }
    
    const AuthFlow = () => {
      return (
        <Stack.Navigator headerMode = "none">
            <Stack.Screen name="AuthLoadingScreen" component={AuthLoadingScreen}/>
            <Stack.Screen name="LoginWithSpotify" component={LoginWithSpotify}/>
        </Stack.Navigator>
      )
    }
    

export default function Navigation(props) {
  const loggedIn = useSelector(state => state.authentication.loggedIn);
  return (
    <NavigationContainer>
      { loggedIn ? (
        <MainApp/>
      ) : (
        <AuthFlow/>
      )}
    </NavigationContainer>
  )
}