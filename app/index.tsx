import { Link } from "expo-router"
import { Text, View, Image, ImageBackground, Dimensions, ScrollView } from "react-native"
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

// create class instance with database building collection reference within it
const TrackBuildingName = (buildingName: string) => {
  let buildingInstance = new Building(buildingName)
  try {
    let collectionRef = collection(database, buildingName)
    buildingInstance.database = collectionRef
  } catch (err: any) {
    console.log("Error has occured:" + err.message)
  } finally {
    return buildingInstance
  }
}

// list of linked images, all leading to their respective building page
const ListofBuildings = buildingNames.map(building => {
  return (
    <Link
      href={`/${building}`}
      key={building}
      onPress={() => TrackBuildingName(building)}
      style={[styles.buildingLink, {width: Dimensions.get('window').width/2.5, height: Dimensions.get('window').width/2.5 }]}
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
  console.log(Dimensions.get('window').width)
  return (
    <>
    <ScrollView>
      <View style={styles.container}>{ListofBuildings}</View>
      </ScrollView>
    </>
  )
}

export default Homepage
