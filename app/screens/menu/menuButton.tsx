import { View, Text, Image } from "react-native"
import React from "react"
import { Link } from "expo-router"
import MenuIcon from "../../../assets/images/menuIcon"

const Menu = () => {
  return (
    <View style={{ paddingLeft: 10 }}>
      <Link href={"screens/menu/menu"}>
        <MenuIcon />
      </Link>
    </View>
  )
}

export default Menu
