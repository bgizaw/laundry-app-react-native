import { Link, useLocalSearchParams } from "expo-router"
import { Text, View } from "react-native"
import {
  CollectionReference,
  DocumentData,
  collection,
  getDocs,
} from "firebase/firestore"
import database from "./firebase/firestoreInitialize"
import Building from "./Classes/Building"

const MachineCounter = (
  collectionRef: CollectionReference<DocumentData, DocumentData>
) => {
  async function fetchDocsAndCountMachines() {
    try {
      const querySnapshot = await getDocs(collectionRef)
      let washerCount: number = 0
      let dryerCount: number = 0
      const docs = querySnapshot.docs.map(doc => {
        const machineType = doc.data().machineType
        if (machineType == "washer") {
          washerCount++
        } else if (machineType === "dryer") {
          dryerCount++
        }
      })
      let room: WasherDryerObject = {
        washerCount: washerCount,
        dryerCount: dryerCount,
      }

      return room
    } catch (error) {
      console.log("Error:", error)
    }
  }

  return fetchDocsAndCountMachines()
}

interface WasherDryerObject {
  washerCount: number
  dryerCount: number
}

const BuildingPage = (machines: WasherDryerObject) => {
  let buildingNameObject = useLocalSearchParams()
  let nameOfBuilding = buildingNameObject.id as string

  const TrackBuildingName = (buildingName: string) => {
    let collectionRef = collection(database, buildingName)
    let buildingInstance = new Building(buildingName)
    buildingInstance.database = collectionRef
    return buildingInstance
  }

  const ListWasherLinks = (machines: WasherDryerObject) => {
    let washers = []
    for (let washerId = 0; washerId <= machines?.washerCount!; washerId++) {
      washers.push(
        <Link href={`Washer/Washer ${washerId}`}>{`Washer ${washerId}`}</Link>
      )
    }
    return washers
  }

  const machineCount = async () => {
    MachineCounter(TrackBuildingName(nameOfBuilding).database!).then(machines =>
      console.log(machines)
    )
  }

  return (
    <View>
      <Text style={{ fontSize: 30 }}>building</Text>
      <Text style={{ fontSize: 20 }}>Washers</Text>
      <Text>{machines.dryerCount}</Text>
      <Link href="/Washer/Washer 1">Washer 1</Link>
      <Text style={{ fontSize: 20 }}>Dryers</Text>
    </View>
  )
}

export default BuildingPage
