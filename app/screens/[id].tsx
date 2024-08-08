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
import { collection, getDocs, onSnapshot } from "firebase/firestore"
import database from "../firebase/firestoreInitialize"
import Building from "../Classes/Building"
import { useEffect, useState } from "react"
import styles from "./laundryRoomStyles"
import { useFonts } from "expo-font"
import ScannerButton from "../../assets/images/scannerButton"
import MachineIcon from "../../assets/images/machineIcon"
import CountDown from "react-native-countdown-component"
import React from "react"

const TrackBuildingName = (buildingName: string) => {
  let collectionRef = collection(database, buildingName)
  let buildingInstance = new Building(buildingName)
  buildingInstance.database = collectionRef
  return buildingInstance
}

interface StatesType {
  [key: string]: string // Adjust the type of the value as needed
}

interface EndTimesObj {
  [key: string]: number // Adjust the type of the value as needed
}

const BuildingPage = () => {
  const [loading, setLoading] = useState(true)
  const [machines, setMachines] = useState<{ id: string }[]>([])
  const [states, setStates] = useState<StatesType>({})
  const [endTimes, setEndTimes] = useState<EndTimesObj>({})

  const stateHues = {
    available: "#9BFFBD",
    inUse: "#FF6B6B",
    pending: "#A4A4A4",
    outOfOrder: "#FFB629",
  }

  let buildingNameObject = useLocalSearchParams()
  let nameOfBuilding = buildingNameObject.id as string

  // load fonts
  const [isLoaded] = useFonts({
    "jaldi-bold": require("../../assets/fonts/Jaldi-Bold.ttf"),
    "jaldi-regular": require("../../assets/fonts/Jaldi-Regular.ttf"),
  })

  useEffect(() => {
    const buildingCollection = TrackBuildingName(nameOfBuilding).database!

    // put all washers and dryers within building collection in a list

    getDocs(buildingCollection)
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

    // track machine states
    const stateUpdates = onSnapshot(buildingCollection, snapshot => {
      snapshot.docs.forEach(doc => {
        // Object.assign(states, { [doc.id]: doc.data().status })
        setStates(prevStates => ({
          ...prevStates,
          [doc.id]: doc.data().status,
        }))
      })
      console.log(states)
    })

    const timeUpdates = onSnapshot(buildingCollection, snapshot => {
      snapshot.docs.forEach(doc => {
        // Object.assign(states, { [doc.id]: doc.data().status })
        setEndTimes(prevEndTimes => ({
          ...prevEndTimes,
          [doc.id]: doc.data().endTime,
        }))
      })
      console.log(endTimes)
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

  // retreive the fill color based on the state passed in
  const stringStateToFillValue = (stringState: string) => {
    if (stringState === "available") {
      return stateHues.available
    } else if (stringState === "in-use") {
      return stateHues.inUse
    } else if (stringState === "out-of-order") {
      return stateHues.outOfOrder
    } else if (stringState === "pending") {
      return stateHues.pending
    }
  }

  // return list of linked washer logos
  const washerLogos = () => {
    return washers.map(washer => (
      <React.Fragment key={washer}>
        <Link
          href={{
            pathname: `./[Building]/Washer/${washer}`,
            params: { Building: nameOfBuilding },
          }}
          style={styles.machineLink}
        >
          <View>
            <Text
              style={{
                fontFamily: "jaldi-bold",
                fontSize: 25,
                textAlign: "center",
              }}
            >
              {washer}
            </Text>
            <MachineIcon
              fill={stringStateToFillValue(states[washer])}
              key={states[washer]}
              width={width}
              height={width}
              text={states[washer]}
              building={nameOfBuilding}
              machine={washer}
            />
            {/* <CountDown
              until={120}
              timeToShow={["M", "S"]}
              style={{
                position: "absolute",
                top: 100,
                bottom: 0,
                left: 0,
                right: 0,
              }}
              digitStyle={{ backgroundColor: stateHues.available }}
            ></CountDown> */}
          </View>
        </Link>
      </React.Fragment>
    ))
  }

  // return list of linked dryer logos
  const dryerLogos = () => {
    return dryers.map(dryer => (
      <React.Fragment key={dryer}>
        <Link
          href={{
            pathname: `./[Building]/Dryer/${dryer}`,
            params: { Building: nameOfBuilding },
          }}
          style={styles.machineLink}
        >
          <View>
            <Text
              style={{
                fontFamily: "jaldi-bold",
                fontSize: 25,
                textAlign: "center",
              }}
            >
              {dryer}
            </Text>
            <MachineIcon
              fill={stringStateToFillValue(states[dryer])}
              key={states[dryer]}
              width={width}
              height={width}
              text={states[dryer]}
              building={nameOfBuilding}
              machine={dryer}
            />
          </View>
        </Link>
      </React.Fragment>
    ))
  }

  // loading screen
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator />
        <Text style={{ textAlign: "center" }}>Loading</Text>
      </View>
    )
  } else {
    // washer and dryer logos that link to each individual washer and dryer page
    return (
      <>
        <ScrollView>
          <Text style={styles.laundryRoomTitle}>{nameOfBuilding}</Text>
          <View style={styles.container}>
            {washerLogos()}

            {dryerLogos()}
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
