import { Text, View } from "react-native"
import { useGlobalSearchParams } from "expo-router"
import StateForm from "../../Components/stateForm"
import database from "../../firebase/firestoreInitialize"
import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"

const WasherPage = () => {
  // const [status, setStatus] = useState("default")

  const linkData = useGlobalSearchParams()
  const building: string = linkData.Building?.toString()!
  const washer: string = linkData.id!.toString()
  const title = building + " " + washer

  // const machineState = async (callback: React.Dispatch<React.SetStateAction<string>>) => {
  //   const machineRef = doc(database, building, washer)
  //   const machineSnapshot = await getDoc(machineRef)
  //   if (machineSnapshot.exists()) {
  //     callback(machineSnapshot.data().status)
  //   } else {
  //     callback("invalid")
  //   }
  // }

  // useEffect(() => {
  //   machineState(setStatus)
  //   console.log(status)
  // }, [])

  return (
    <View>
      <Text style={{ fontSize: 30 }}>{title}</Text>
      <StateForm building={building} machine={washer} />
    </View>
  )
}

export default WasherPage
