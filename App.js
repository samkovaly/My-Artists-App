import React from 'react';

// Navigation
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

// Redux
import { Provider } from 'react-redux';
import store from './store/store';

// My screens
import LoginWithSpotify from './screens/LoginWithSpotify';
import MyArtists from './screens/MyArtists';
import Concerts from './screens/Concerts';
import Discovery from './screens/Discovery';
import Settings from './screens/Settings';
import AuthLoadingScreen from './screens/AuthLoadingScreen';

import { SPOTIFY_GREEN, SPOTIFY_BLACK, LOGOUT_BUTTON_RED } from './styles/colors';

const AppStack = createBottomTabNavigator({
  MyArtists: MyArtists,
  Concerts: Concerts,
  Discovery: Discovery,
  Settings: Settings,
},
{
  tabBarLabel: {
  },
  tabBarOptions: {
    activeTintColor: SPOTIFY_GREEN,
    inactiveTintColor: 'gray',
    labelStyle: {
      fontSize: 20,
    },
    style: {
      backgroundColor: SPOTIFY_BLACK,
    },
  },
});

const AuthStack = createStackNavigator({ LoginWithSpotify: LoginWithSpotify });


const App = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);

// Connect Redux
const MyArtistsApp = () => (
  <Provider store = {store}>
      <App/>
  </Provider>
)

export default MyArtistsApp;