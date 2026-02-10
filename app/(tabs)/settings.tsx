import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ScreenWrapper from "@/app/ScreenWrapper";

const settings = () => {
  return (
      <ScreenWrapper withSystemButton={true}>
    <View >
      <Text>settings</Text>
    </View>
          </ScreenWrapper>
  )
}

export default settings;

const styles = StyleSheet.create({})
