import { Link } from "expo-router"
import { Text, View, Pressable, Image, StyleSheet, Linking } from "react-native"
import database from "./firebase/firestoreInitialize"
import { collection } from "firebase/firestore"
import Building from "./Classes/Building"
import Sandbox from "./cssSandbox"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "yellow",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  buildingLink: {
    backgroundColor: "pink",
    flexDirection: "row",
    padding: 10,
    flex: 1,
  },
  buildingText: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "lightgray",
    justifyContent: "center",
    width: "auto",
    display: "flex",
  },
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
    <Link
      href={`/${building}`}
      key={building}
      onPress={() => TrackBuildingName(building)}
      style={styles.buildingLink}
    >
      <View>
        <View>
          <Image source={require("../assets/dormButton.png")}></Image>
          <View style={styles.buildingText}>
            <Text>{building}</Text>
          </View>
        </View>
      </View>
    </Link>
  )
})

// homepage displays the list of the buildings
const Homepage = () => {
  return (
    <>
      <Text
        style={{
          fontSize: 30,
          backgroundColor: "gray",
          padding: 10,
        }}
      >
        Buildings
      </Text>
      <View style={styles.container}>{ListofBuildings}</View>
    </>
  )
}

export default Homepage
