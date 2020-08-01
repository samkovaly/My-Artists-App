import React from 'react';

import { ScrollView, View, StyleSheet, Text } from 'react-native';

import { Colors, Screens} from '../../styles'
import BaseText from '../../components/BaseText'

export default function PrivacyPolicy(props) {


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

    // https://app-privacy-policy-generator.firebaseapp.com/
    return (
      <ScrollView style = {styles.container}>
        { getSection("Privacy Policy", 
          "My Artists is a free and open source mobile application and it is intended for use as is. This page is used to inform visitors regarding the policies with the collection, use, and disclosure of Personal Information. If you choose to use the Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that is collected is used for providing the best service possible. Your information will not be used or shared with anyone except as described in this Privacy Policy."
        )}

        { getSection("Information Collection and Use", 
          "For a better experience, while using our Service, certain personal information may be required, including your spotify username, Seatgeek concerts that you favorite and your Spotify artists. Location is requested but never stored. Neither is any user behavior while on the app. The app does not share any data with any third party company or other users."
        )}


        { getSection("Service Providers", 
          "We employ the services of third-party services (Spotify, Seatgeek, Google) in order to provide the best user experience possible. These services only have the personal data that you supply to them. We in no way share your data with these services. Any data that these services request is between you and said service and falls under their privacy policy. My Artists contains links to these other services. If you click on one of these third-party links, you will be redirected to them. It is strongly advised that you review the Privacy Policy of these services."
        )}

        { getSection("Changes to This Privacy Policy",
          "This Privacy Policy is not static and will be updated from time to time. Thus, you are advised to review this page periodically for any changes. You will be notified of any changes to this policy."
        )}

        { getSection("Contacting Us", 
          "If you have any questions or suggestions about this Privacy Policy, do not hesitate to email xilernet@gmail.com."
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