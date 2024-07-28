import { View, Text } from "react-native"
import React, { useState } from "react"
import { Link } from "expo-router"
import DormAccordion from "./dormAccordion"
import { useFonts } from "expo-font"

const Menu = () => {
  // load fonts
  const [isLoaded] = useFonts({
    "jaldi-bold": require("../../../assets/fonts/Jaldi-Bold.ttf"),
    "jaldi-regular": require("../../../assets/fonts/Jaldi-Regular.ttf"),
  })
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View
        style={{
          alignItems: "center",
          backgroundColor: "yellow",
          width: 300,
          flex: 1,
        }}
      >
        <Link href={"/"}>Home</Link>
        <Link href={"../qrCodeScan/qrCodeScanner"}>Scan</Link>
        <DormAccordion />
      </View>
    </View>
  )
}

export default Menu
