import { Link, useLocalSearchParams } from "expo-router"
import {
  Text,
  View,
  ActivityIndicator,
  ImageBackground,
  Platform,
  Dimensions,
  ScrollView,
} from "react-native"
import { collection, getDocs } from "firebase/firestore"
import database from "../firebase/firestoreInitialize"
import Building from "../Classes/Building"
import { useEffect, useState } from "react"
import styles from "./laundryRoomStyles"
import { useFonts } from "expo-font"

interface WasherDryerObject {
  washerCount: number
  dryerCount: number
}

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

  const [isLoaded] = useFonts({
    "jaldi-bold": require("../../assets/fonts/Jaldi-Bold.ttf"),
    "jaldi-regular": require("../../assets/fonts/Jaldi-Regular.ttf"),
  })

  useEffect(() => {
    const db = TrackBuildingName(nameOfBuilding).database!

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
    return (
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
                      style={[styles.machineText, { fontFamily: "jaldi-bold" }]}
                    >
                      {washer}
                    </Text>
                  </View>
                </View>
              </ImageBackground>
            </Link>
          ))}
          {/* <Text style={{ fontSize: 20 }}>Dryers</Text>
        {dryers.map(dryer => (
          <Link
            key={dryer}
            href={{
              pathname: `./[Building]/Dryer/${dryer}`,
              params: { Building: nameOfBuilding },
            }}
          >
            {dryer}
          </Link>
        ))} */}
        </View>
      </ScrollView>
    )
  }
}

export default BuildingPage
