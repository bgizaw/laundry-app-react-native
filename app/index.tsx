import { Link } from "expo-router"
import { Text, View, Pressable } from "react-native"
import database from "./firebase/firestoreInitialize"
import {
  collection,
} from "firebase/firestore"
import Building from "./Classes/Building"

const buildingNames = [
  "Sontag",
  "Dialynas",
  "Clark I",
  "Clark III",
  "Walton Commons",
  "Frary",
  "Walker",
  "Smiley",
  "Harwood",
  "Lyon",
  "Mudd",
  "Blaisdell",
  "Oldenborg Room 1",
  "Oldenborg Room 2",
  "Wig",
]

const TrackBuildingName = (buildingName: string) => {
  let collectionRef = collection(database, buildingName)
  let buildingInstance = new Building(buildingName)
  buildingInstance.database = collectionRef
  return buildingInstance
}

const ListofBuildings = buildingNames.map(building => {
  return (
    <Link href={`/${building}`} key={building}>
      <Pressable onPress={() => TrackBuildingName(building)}></Pressable>
      {building}
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
