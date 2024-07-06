import { Link } from "expo-router"
import { Text, View, Pressable, Image, StyleSheet } from "react-native"
import database from "./firebase/firestoreInitialize"
import {
  collection,
} from "firebase/firestore"
import Building from "./Classes/Building"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})

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
      <Pressable onPress={() => TrackBuildingName(building)}>
        <Image source={require('../assets/dormButton.png')}></Image>
      </Pressable>
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
