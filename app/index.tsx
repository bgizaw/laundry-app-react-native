import { Link } from "expo-router"
import { Text, View, Image, StyleSheet, ImageBackground } from "react-native"
import database from "./firebase/firestoreInitialize"
import { collection } from "firebase/firestore"
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
    <Link
      href={`/${building}`}
      key={building}
      onPress={() => TrackBuildingName(building)}
    >
      <View>
        <ImageBackground
          source={require("../assets/dormButton.png")}
          resizeMode="cover"
        >
          {/* // <Image source={require("../assets/dormButton.png")}></Image> */}
          <Text>{building}</Text>
        </ImageBackground>
      </View>
    </Link>
  )
})

const Homepage = () => {
  return (
    <>
      <Text>Buildings</Text>
      <View className="bg-black justify-start">{ListofBuildings}</View>
    </>
  )
}

export default Homepage
