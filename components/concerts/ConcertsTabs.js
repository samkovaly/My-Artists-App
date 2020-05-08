import React from 'react';
import { Text } from 'react-native';

import { TabBar } from 'react-native-tab-view';


import { Colors } from '../../styles'




const ConcertsTab = (props) => {




    return (
        <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: Colors.THEME_BLUE }}
        style={{ backgroundColor: Colors.SPOTIFY_BLACK }}
        pressOpacity = {0.60}
        renderLabel={({ route, focused, color }) => (
            <Text style={{ fontSize: 16, color, margin: 0 }}>
              {route.title}
            </Text>
          )}
        />
    )
}



export default ConcertsTab;