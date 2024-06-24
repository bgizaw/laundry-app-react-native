import { Link, useLocalSearchParams } from "expo-router"
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

const ListofBuildings = buildingNames.map(building => {
  return (
    <Link
      href={{
        pathname: "buildings/[id]",
        params: { id: building },
      }}
      key={building}
      asChild
    >
      <Pressable
        onPress={() => {
          Building.buildingName = building
        }}
      >
        <Text>{building}</Text>
      </Pressable>
    </Link>
  )
})

const Homepage = () => {
  return (
    <View>
      <Text style={{ fontSize: 30 }}>Buildings</Text>
      {ListofBuildings}
    </View>
  )
}

export default Homepage
