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
import Button2 from "./Components/Button2"


interface WasherDryerObject {
  washerCount: number
  dryerCount: number
}

const BuildingPage = () => {
  const [machines, setMachines] = useState<WasherDryerObject[]>([]);
  let buildingNameObject = useLocalSearchParams()
  let nameOfBuilding = buildingNameObject.id as string

  const TrackBuildingName = (buildingName: string) => {
    let collectionRef = collection(database, buildingName)
    let buildingInstance = new Building(buildingName)
    buildingInstance.database = collectionRef
    return buildingInstance
  }

  useEffect(() => {
    const db = TrackBuildingName(nameOfBuilding).database!;

    getDocs(db)
      .then((snapshot) => {
        let machines: any[] = [];
        snapshot.docs.forEach((doc) => {
          machines.push({ id: doc.id });
        });
        setMachines(machines);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [nameOfBuilding]);

  return (
    <View>
      <Text style={{ fontSize: 30 }}>{nameOfBuilding}</Text>
      <Text style={{ fontSize: 20 }}>Washers</Text>
      {machines.map((machine) => (
        <Link key={machine.id} href={`/Washer/${machine.id}`}>
          {machine.id}
        </Link>
      ))}
      <Text style={{ fontSize: 20 }}>Dryers</Text>
      {/* Add dryer links here if needed */}
    </View>
  );
};

export default BuildingPage;


