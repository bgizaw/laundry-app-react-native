import { View, Text, StyleProp, ViewStyle, Image } from "react-native"
import React from "react"
import { Stack, Navigator, useLocalSearchParams, useGlobalSearchParams } from "expo-router"

const _layout = () => {
  return <Stack>
    <Stack.Screen name='index' options={{headerTitle: 'Home'}}></Stack.Screen>
    <Stack.Screen name='[id]' options={{headerTitle: 'Laundry Room'}}></Stack.Screen>
    <Stack.Screen name='[Building]/Washer/[id]' options={{headerTitle: 'Washer'}}></Stack.Screen>
    <Stack.Screen name='[Building]/Dryer/[id]' options={{headerTitle: 'Dryer'}}></Stack.Screen>
  </Stack>
}

export default _layout
