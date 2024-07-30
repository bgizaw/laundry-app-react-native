import { Link, useLocalSearchParams } from "expo-router"
import {
  Text,
  View,
  ActivityIndicator,
  ImageBackground,
  Platform,
  Dimensions,
  ScrollView,
  Image,
} from "react-native"
import { collection, getDocs } from "firebase/firestore"
import database from "../firebase/firestoreInitialize"
import Building from "../Classes/Building"
import { useEffect, useState } from "react"
import styles from "./laundryRoomStyles"
import { useFonts } from "expo-font"
import ScannerButton from "../../assets/images/scannerButton"

const TrackBuildingName = (buildingName: string) => {
  let collectionRef = collection(database, buildingName)
  let buildingInstance = new Building(buildingName)
  buildingInstance.database = collectionRef
  return buildingInstance
}

const BuildingPage = () => {
  const [loading, setLoading] = useState(true)
  const [machines, setMachines] = useState<{ id: string }[]>([])
  let buildingNameObject = useLocalSearchParams()
  let nameOfBuilding = buildingNameObject.id as string

  // load fonts
  const [isLoaded] = useFonts({
    "jaldi-bold": require("../../assets/fonts/Jaldi-Bold.ttf"),
    "jaldi-regular": require("../../assets/fonts/Jaldi-Regular.ttf"),
  })

  useEffect(() => {
    const db = TrackBuildingName(nameOfBuilding).database!

    // put all washers and dryers within building collection in a list
    getDocs(db)
      .then(snapshot => {
        let machines: any[] = []
        snapshot.docs.forEach(doc => {
          machines.push({ id: doc.id })
        })
        setMachines(machines)
        setLoading(false)
      })
      .catch(err => {
        console.log(err.message)
      })
  }, [])

  // height and width of icons will be based on screen size (icons are squares so width can represent height as well)
  let width: number
  if (
    Platform.OS === "web" ||
    Platform.OS === "macos" ||
    Platform.OS === "windows"
  ) {
    width = Dimensions.get("window").width * 0.1
  } else {
    width = Dimensions.get("window").width * 0.4
  }

  // create and populate lists for washers and dryers with respective machine names
  let washers: string[] = []
  let dryers: string[] = []

  // populate washer and dryer lists
  machines.forEach(machine => {
    if (machine.id.includes("Washer")) {
      washers.push(machine.id)
    } else if (machine.id.includes("Dryer")) {
      dryers.push(machine.id)
    }
  })

  // loading screen
  if (loading) {
    return (
      <>
        <ActivityIndicator />
        <Text>Loading</Text>
      </>
    )
  } else {
    // washer and dryer logos that link to each individual washer and dryer page
    return (
      <>
        <ScrollView>
          <Text style={styles.laundryRoomTitle}>{nameOfBuilding}</Text>
          <View style={styles.container}>
            {washers.map(washer => (
              <Link
                key={washer}
                href={{
                  pathname: `./[Building]/Washer/${washer}`,
                  params: { Building: nameOfBuilding },
                }}
                style={styles.machineLink}
              >
                <ImageBackground
                  source={require("../../assets/images/dormButton.png")}
                  resizeMode="cover"
                  style={[styles.machineLogo, { width: width, height: width }]}
                >
                  <View style={styles.machineTextContainer}>
                    <View style={styles.machineTextFrame}>
                      <Text
                        style={[
                          styles.machineText,
                          { fontFamily: "jaldi-bold" },
                        ]}
                      >
                        {washer}
                      </Text>
                    </View>
                  </View>
                </ImageBackground>
              </Link>
            ))}

            {dryers.map(dryer => (
              <Link
                key={dryer}
                href={{
                  pathname: `./[Building]/Dryer/${dryer}`,
                  params: { Building: nameOfBuilding },
                }}
                style={styles.machineLink}
              >
                <ImageBackground
                  source={require("../../assets/images/dormButton.png")}
                  resizeMode="cover"
                  style={[styles.machineLogo, { width: width, height: width }]}
                >
                  <View style={styles.machineTextContainer}>
                    <View style={styles.machineTextFrame}>
                      <Text
                        style={[
                          styles.machineText,
                          { fontFamily: "jaldi-bold" },
                        ]}
                      >
                        {dryer}
                      </Text>
                    </View>
                  </View>
                </ImageBackground>
              </Link>
            ))}
          </View>
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
            href={"./qrCodeScan/qrCodeScanner"}
            style={{ padding: 30, bottom: 30, left: 20 }}
          >
            <ScannerButton />
          </Link>
        </View>
      </>
    )
  }
}

export default BuildingPage
