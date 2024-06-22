import { Link, useLocalSearchParams } from "expo-router"
import { Text, View } from "react-native"
import data from "./buildings/machineInfo.json"
import database from "./buildings/firestoreInitialize"
import { collection } from "firebase/firestore"

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
        pathname: "buildings/building/[id]",
        params: { id: building },
      }}
      key={building}
    >
      {building}
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
