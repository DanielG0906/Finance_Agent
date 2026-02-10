import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ScreenWrapper from "@/app/ScreenWrapper";

const profile = () => {
  return (
      <ScreenWrapper withSystemButton={true}>
    <View >
      <Text>profile</Text>
    </View>
      </ScreenWrapper>
  )
}

export default profile;

const styles = StyleSheet.create({})
