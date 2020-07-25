import React from 'react';
import { StyleSheet } from 'react-native'
import { TabBar } from 'react-native-tab-view';
import BaseText from '../BaseText'

import { Colors } from '../../styles'




const ConcertsTab = (props) => {
    // https://github.com/satya164/react-native-tab-view
    return (
        <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: Colors.THEME_BLUE }}
        style={{
          backgroundColor: Colors.SCREEN_BACKGROUND,
          elevation: 0,
          shadowOffset: { height: 0, width: 0 },
        }}
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
    fontWeight: '400',
    margin: 0,
  }
})



export default ConcertsTab;