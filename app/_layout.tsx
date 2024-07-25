import React from "react"
import { Link, Stack } from "expo-router"
import { Image, View } from "react-native"
import Menu from "./screens/menu/menuButton"
import PomonaLogo from "../assets/images/pomonaLogo"

const _layout = () => {
  return (
    <Stack
      screenOptions={{
        headerTitleStyle: { fontFamily: "jaldi-bold", fontSize: 27 },
        headerTitleAlign: "center",
        headerRight: () => (
          <Link href={"/"}>
            <PomonaLogo style={{ marginRight: 10 }} />
          </Link>
        ),
        headerLeft: () => <Menu />,
        headerBackVisible: true,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Home",
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="screens/[id]"
        options={{
          headerTitle: "Laundry Room",
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="screens/[Building]/Washer/[id]"
        options={{
          headerTitle: "Washer",
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="screens/[Building]/Dryer/[id]"
        options={{
          headerTitle: "Dryer",
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="screens/qrCodeScan/qrCodeScanner"
        options={{
          headerTitle: "QR Code Scanner",
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="screens/menu/menu"
        options={{
          headerTitle: "Menu",
        }}
      ></Stack.Screen>
    </Stack>
  )
}

export default _layout
