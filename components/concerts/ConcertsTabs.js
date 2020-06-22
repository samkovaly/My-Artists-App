import React from 'react';
import { StyleSheet } from 'react-native'
import { TabBar } from 'react-native-tab-view';
import BaseText from '../BaseText'

import { Colors } from '../../styles'




const ConcertsTab = (props) => {




    return (
        <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: Colors.TAB_NAV_BLUE }}
        style={{ backgroundColor: Colors.BACKGROUND_DARK_BLUE }}
        pressOpacity = {0.60}
        renderLabel={({ route, focused, color }) => (
            <BaseText style={[styles.tabText, {color: color}]}>
              {route.title}
            </BaseText>
          )}
        />
    )
}


const styles = StyleSheet.create({
  tabText: {
    fontSize: 16,
    margin: 0,
  }
})



export default ConcertsTab;