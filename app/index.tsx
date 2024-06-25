import { Link, useLocalSearchParams } from "expo-router"
import { useState } from 'react'
import { Text, View, Pressable } from "react-native"
import data from "./buildings/machineInfo.json"
import database from "./buildings/firestoreInitialize"
import { collection } from "firebase/firestore"
import Building from "./buildingName"

const buildingNames = [
  "Sontag",
  "Dialynas",
  "Clark I",
  "Clark III",
  "Walton Commons",
  "Frary",
  "Smiley",
  "Harwood",
  "Lyon",
  "Mudd",
  "Blaisdell",
  "Oldenborg Room 1",
  "Oldenborg Room 2",
  "Wig",
]


// creates a list of buildings. for each building, a link is dynamically created with all the routing
const ListofBuildings = buildingNames.map(building => {
  return (
    <Link
      href={{
        pathname: "buildings/[id]",
        params: { id: building },
      }}
      key={building} // need this for react
      asChild // makes sure that the child component (Pressable) behaves as a clickable link
    > 
      <Pressable // when you press the building, it makes an object and saves the building name within the object
        onPress={() => {
          Building.updateBuildingName(building)
          // console.log("pressed building " + building)
          // console.log("updated static " + Building.buildingName)
        }}
      > 
        <Text>{building}</Text> 
      </Pressable>
    </Link>
  )
})

// homepage displays the list of the buildings
const Homepage = () => {
  return (
    <View>
      <Text style={{ fontSize: 30 }}>Buildings</Text>
      {ListofBuildings} 
    </View>
  )
}

export default Homepage
