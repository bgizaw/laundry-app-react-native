import { Link } from "expo-router"
import { Text, View, Image, StyleSheet, ImageBackground } from "react-native"
import database from "./firebase/firestoreInitialize"
import { collection } from "firebase/firestore"
import Building from "./Classes/Building"
import styles from "./styles"

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
      style={styles.buildingLink}
    >
      <View style={styles.imageContainer}>
        <ImageBackground
          source={require("../assets/dormButton.png")}
          resizeMode="cover"
          style={styles.buildingLogo}
        >
          {/* // <Image source={require("../assets/dormButton.png")}></Image> */}
          <Text style={styles.buildingText}>{building}</Text>
        </ImageBackground>
      </View>
    </Link>
  )
})

const Homepage = () => {
  return (
    <>
      <Text>Buildings</Text>
      <View style={styles.container}>{ListofBuildings}</View>
    </>
  )
}

export default Homepage
