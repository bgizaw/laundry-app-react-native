import { Link } from "expo-router"
import { Text, View, ImageBackground, ScrollView, Image } from "react-native"
import database from "./firebase/firestoreInitialize"
import { collection } from "firebase/firestore"
import Building from "./Classes/Building"
import styles from "./homePageStyles"
import { useFonts } from "expo-font"
import { useEffect } from "react"
import ScannerButton from "../assets/images/scannerButton"

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

//create list of building names based on database
// useEffect(() => {

// }, [])

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
      href={`./screens/${building}`}
      key={building}
      onPress={() => TrackBuildingName(building)}
      style={[styles.buildingLink]}
    >
      <ImageBackground
        source={require("../assets/images/dormButton.png")}
        resizeMode="cover"
        style={[styles.buildingLogo]}
      >
        <View style={styles.buildingTextContainer}>
          <View style={styles.buildingTextFrame}>
            <Text style={[styles.buildingText, { fontFamily: "jaldi-bold" }]}>
              {building}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </Link>
  )
})

// load third party fonts
const Homepage = () => {
  const [isLoaded] = useFonts({
    "jaldi-bold": require("../assets/fonts/Jaldi-Bold.ttf"),
    "jaldi-regular": require("../assets/fonts/Jaldi-Regular.ttf"),
  })
  return (
    <>
      <ScrollView>
        <Text
          style={{
            backgroundColor: "#FFFFFF",
            textAlign: "center",
            padding: 20,
            fontFamily: "jaldi-regular",
            fontSize: 15,
          }}
        >
          Select a dorm to see laundry machine availability or to reserve a
          machine.
        </Text>
        <View style={styles.container}>{ListofBuildings}</View>
      </ScrollView>
      <View
        style={{
          padding: 50,
          flex: 1,
          justifyContent: "flex-end",
          flexDirection: "row",
          backgroundColor: "#FFFFFF",
        }}
      >
        <Link
          href={"./screens/qrCodeScan/qrCodeScanner"}
          style={{
            padding: 40,
            bottom: 30,
            left: 20,
            // flex: 1,
          }}
        >
          <ScannerButton />
        </Link>
      </View>
    </>
  )
}

export default Homepage
