import React from "react"
import { Stack } from "expo-router"

const _layout = () => {
  return <Stack>
    <Stack.Screen name='index' options={{headerTitle: 'Home', headerTitleStyle: {fontFamily: 'jaldi-bold', fontSize: 27}, headerTitleAlign: 'center'}}  ></Stack.Screen>
    <Stack.Screen name='[id]' options={{headerTitle: 'Laundry Room', headerTitleStyle: {fontFamily: 'jaldi-bold', fontSize: 27 }}}></Stack.Screen>
    <Stack.Screen name='[Building]/Washer/[id]' options={{headerTitle: 'Washer', headerTitleStyle: {fontFamily: 'jaldi-bold', fontSize: 27 }}}></Stack.Screen>
    <Stack.Screen name='[Building]/Dryer/[id]' options={{headerTitle: 'Dryer', headerTitleStyle: {fontFamily: 'jaldi-bold', fontSize: 27 }}}></Stack.Screen>
  </Stack>
}

export default _layout
