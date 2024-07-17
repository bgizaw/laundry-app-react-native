import React from "react"
import { Stack } from "expo-router"
import { Image } from "react-native"

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Home",
          headerTitleStyle: { fontFamily: "jaldi-bold", fontSize: 27 },
          headerTitleAlign: "center",
          headerRight: () => (
            <Image
              source={require("../assets/images/pomonaLogo.png")}
              style={{ marginRight: 10 }}
            ></Image>
          ),
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="screens/[id]"
        options={{
          headerTitle: "Laundry Room",
          headerTitleStyle: { fontFamily: "jaldi-bold", fontSize: 27 },
          headerTitleAlign: "center",
          headerRight: () => (
            <Image
              source={require("../assets/images/pomonaLogo.png")}
              style={{ marginRight: 10 }}
            ></Image>
          ),
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="screens/[Building]/Washer/[id]"
        options={{
          headerTitle: "Washer",
          headerTitleStyle: { fontFamily: "jaldi-bold", fontSize: 27 },
          headerTitleAlign: "center",
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="screens/[Building]/Dryer/[id]"
        options={{
          headerTitle: "Dryer",
          headerTitleStyle: { fontFamily: "jaldi-bold", fontSize: 27 },
          headerTitleAlign: "center",
        }}
      ></Stack.Screen>
    </Stack>
  )
}

export default _layout
