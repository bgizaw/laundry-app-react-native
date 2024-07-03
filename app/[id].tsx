import { Link, useLocalSearchParams } from "expo-router"
import { Alert, Text, View } from "react-native"
import data from "./machineInfo.json"
import {
  CollectionReference,
  DocumentData,
  collection,
  getDocs,
} from "firebase/firestore"
import database from "./firebase/firestoreInitialize"
import Building from "./Classes/Building"
import { useEffect, useState } from "react"
// import Button2 from "./Components/Button2"

interface WasherDryerObject {
  washerCount: number
  dryerCount: number
}

const BuildingPage = () => {
  const [loading, setLoading] = useState(true)
  const [machines, setMachines] = useState<{ id: string }[]>([])
  let buildingNameObject = useLocalSearchParams()
  let nameOfBuilding = buildingNameObject.id as string

  const TrackBuildingName = (buildingName: string) => {
    let collectionRef = collection(database, buildingName)
    let buildingInstance = new Building(buildingName)
    buildingInstance.database = collectionRef
    return buildingInstance
  }

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

  let washers: string[] = []
  let dryers: string[] = []

  machines.forEach(machine => {
    if (machine.id.includes("Washer")) {
      washers.push(machine.id)
    } else if (machine.id.includes("Dryer")) {
      dryers.push(machine.id)
    }
  })
  if (loading) {
    return <Text>...Loading...</Text>
  } else {
    return (
      <View>
        <Text style={{ fontSize: 30 }}>{nameOfBuilding}</Text>
        <Text style={{ fontSize: 20 }}>Washers</Text>
        {washers.map(washer => (
          <Link
            key={washer}
            href={{
              pathname: `[Building]/Washer/${washer}`,
              params: { Building: nameOfBuilding },
            }}
          >
            {washer}
          </Link>
        ))}
        <Text style={{ fontSize: 20 }}>Dryers</Text>
        {dryers.map(dryer => (
          <Link
            key={dryer}
            href={{
              pathname: `[Building]/Dryer/${dryer}`,
              params: { Building: nameOfBuilding },
            }}
          >
            {dryer}
          </Link>
        ))}
      </View>
    )
  }
}

export default BuildingPage
