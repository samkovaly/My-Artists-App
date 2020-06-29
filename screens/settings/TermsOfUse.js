import React from 'react';

import { ScrollView, View, StyleSheet, Text } from 'react-native';

import { Colors, Screens} from '../../styles'
import BaseText from '../../components/BaseText'

export default function TermsOfUse(props) {


  const getSection = (title, text) => {
    return (
      <View style = {styles.sectionContainer}>
        <BaseText style = {styles.header}>
          {title}
        </BaseText>
        <Text style = {styles.text}>
          {text}
        </Text>
      </View>
    )
  }

    // https://www.websitepolicies.com/policies
    return (
      <ScrollView style = {styles.container}>
        { getSection("Terms and conditions", 
          "These terms and conditions (\"Terms\", \"Agreement\") are an agreement between Mobile Application Developer (\"Mobile Application Developer\", \"us\", \"we\" or \"our\") and you (\"User\", \"you\" or \"your\"). This Agreement sets forth the general terms and conditions of your use of the My Concerts mobile application and any of its products or services (collectively, \"Mobile Application\" or \"Services\")."
        )}

        { getSection("Age requirement", 
          "You must be at least 13 years of age to use this Mobile Application. By using this Mobile Application and by agreeing to this Agreement you warrant and represent that you are at least 13 years of age."
        )}

        { getSection("Links to other mobile applications", 
          "Although this Mobile Application may link to other mobile applications, we are not, directly or indirectly, implying any approval, association, sponsorship, endorsement, or affiliation with any linked mobile application, unless specifically stated herein. We are not responsible for examining or evaluating, and we do not warrant the offerings of, any businesses or individuals or the content of their mobile applications. We do not assume any responsibility or liability for the actions, products, services, and content of any other third parties. You should carefully review the legal statements and other conditions of use of any mobile application which you access through a link from this Mobile Application. Your linking to any other off-site mobile applications is at your own risk."
        )}

        { getSection("Changes and amendments", 
          "We reserve the right to modify this Agreement or its policies relating to the Mobile Application or Services at any time, effective upon posting of an updated version of this Agreement in the Mobile Application. When we do, we will revise the updated date at the bottom of this page. Continued use of the Mobile Application after any such changes shall constitute your consent to such changes."
        )}

        { getSection("Acceptance of these terms", 
          "You acknowledge that you have read this Agreement and agree to all its terms and conditions. By using the Mobile Application or its Services you agree to be bound by this Agreement. If you do not agree to abide by the terms of this Agreement, you are not authorized to use or access the Mobile Application and its Services."
        )}

        { getSection("Contacting us", 
          "If you would like to contact us to understand more about this Agreement or wish to contact us concerning any matter relating to it, you may send an email to xilernet@gmail.com"
        )}

        <Text style = {[styles.text, {marginBottom: 20}]}>This document was last updated on June 25, 2020</Text>
      </ScrollView>
    );
}


const styles = StyleSheet.create({
  container: {
    ...Screens.screenContainer,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  sectionContainer: {
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
    marginBottom: 2,
  },
  text: {
      fontSize: 14,
      color: Colors.SUB_TEXT_GREY,
  },
})