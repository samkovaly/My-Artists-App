
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { useSelector } from 'react-redux';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// AUTH
import AuthLoadingScreen from './screens/authenticationFlow/AuthLoadingScreen';
import LoginWithSpotify from './screens/authenticationFlow/LoginWithSpotify';

// Artists
import MyArtists from './screens/artists/MyArtists';
import AllArtists from './screens/artists/AllArtists';
import ArtistDetail from './screens/artists/ArtistDetail';

// Concerts
import ConcertDetail from './screens/concerts/ConcertDetail';
import ConcertFilters from './screens/concerts/ConcertFilters';
import Concerts from './screens/concerts/Concerts';

// Discovery
import Discovery from './screens/discover/Discovery';
import ArtistSearch from './screens/discover/ArtistSearch';
import ConcertSearch from './screens/discover/ConcertSearch';

// settings
import Settings from './screens/settings/Settings';
import AnalyzeSpotify from './screens/settings/AnalyzeSpotify';
import NotificationSettings from './screens/settings/NotificationSettings';
import TermsOfUse from './screens/settings/TermsOfUse';
import PrivacyPolicy from './screens/settings/PrivacyPolicy';

import { Colors } from './styles';
import { StatusBar } from 'expo-status-bar';





    

  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();


  const stackScreenOptions = {
    headerStyle: {
      backgroundColor: Colors.TOP_NAV,
      shadowOffset: { height: 0, width: 0 },
    },
    headerBackTitleVisible: false,
    headerTintColor: 'white',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }

  const concertDetailScreen = () => {
    //const trimLength = 24;
    return (
      <Stack.Screen
      name="ConcertDetail"
      component={ConcertDetail}
      options={({ route }) => ({
        title: route.params.concert.performers[0].name
      })}
      //options={({ route }) => {
        //let name =  route.params.concert.name;
        //if(name.length > trimLength){
        //  name = name.slice(0,trimLength) + "...";
        //}
        //return {
         // title: "", //name,
        //}
      //}}
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
          title: name,
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
            title: 'All My Artists'
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
              //headerShown: true,
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
        options={{
          title: 'Discover Artists',
        }}
      />
      <Stack.Screen
        name="ConcertSearch"
        component={ConcertSearch}
        options={{
          title: 'Discover Concerts',
        }}
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
        options={{
          title: 'Notifications',
        }}
      />
      <Stack.Screen
        name="TermsOfUse"
        component={TermsOfUse}
        options={{
          title: 'Terms of use',
        }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{
          title: 'Privacy Policy',
        }}
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
              activeTintColor: Colors.THEME_BLUE,
              inactiveTintColor: Colors.BOTTOM_NAV_INACTIVE,
              labelStyle: {
                fontSize: 12,
              },
              style: {
                backgroundColor: Colors.BOTTOM_NAV,
                borderTopWidth: 0.5, //0,
                borderTopColor: '#000000',
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
      const loggedIn = useSelector(state => state.authentication.loggedIn);
      if(!loggedIn){
        return <View/>
      }
      return (
        <Stack.Navigator mode="modal"
          screenOptions={stackScreenOptions}
          initialRouteName = "MainTabs">
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
              headerLeft: ( { onPress } ) => {
                // onPress defaults to goBack()
                return (<TouchableOpacity onPress={onPress} >
                  <Text style = {{
                      color: Colors.THEME_BLUE,
                      fontSize: 17,
                      fontWeight: '700',
                      marginLeft: 12,
                    }}>Cancel</Text>
                </TouchableOpacity>)
              },
            }}
          />
        </Stack.Navigator>
      )
    }
    


    const AuthFlow = () => {
      const loggedIn = useSelector(state => state.authentication.loggedIn);
      if(loggedIn){
        return <View/>
      }
      return (
        <Stack.Navigator headerMode = "none">
            <Stack.Screen name="AuthLoadingScreen" component={AuthLoadingScreen}/>
            <Stack.Screen name="LoginWithSpotify" component={LoginWithSpotify}/>
        </Stack.Navigator>
      )
    }
    

export default function Navigation(props) {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.SCREEN_BACKGROUND }}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <NavigationContainer theme = {{
            colors: {
              background: Colors.SCREEN_BACKGROUND,
            }
          }}>
            <Stack.Navigator headerMode = "none" initialRouteName="AuthFlow">
                <Stack.Screen name="AuthFlow" component={AuthFlow}/>
                <Stack.Screen name="MainApp" component={MainApp}/>
            </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </View>
  )
}