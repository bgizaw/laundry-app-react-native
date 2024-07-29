import React from "react"
import { Link, Stack, useRouter } from "expo-router"
import Menu from "./screens/menu/menuButton"
import PomonaLogo from "../assets/images/pomonaLogo"
import MenuExit from "../assets/images/menuExit"
import { Pressable } from "react-native"

const _layout = () => {
  const router = useRouter()

  // every page in the application
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
          headerTitle: "Scan",
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="screens/menu/menu"
        options={{
          headerTitle: "Menu",
          headerLeft: () => (
            <Pressable
              onPress={() => router.back()}
              style={
                { marginLeft: 10 }
                // close menu page when x is clicked
              }
            >
              <MenuExit />
            </Pressable>
          ),
          headerBackVisible: false,
        }}
      ></Stack.Screen>
    </Stack>
  )
}

export default _layout
