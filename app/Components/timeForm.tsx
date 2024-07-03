import { doc, updateDoc } from "firebase/firestore"
import { useState, useEffect } from "react"
import { Button } from "react-native"
import database from "../firebase/firestoreInitialize"

type props = {
  machineType: string
  building: string
  machine: string
}

function TimeForm(props: props) {
  const [time, setTime] = useState(0)

  const updateTime = (time: number) => {
    setTime(time)
  }

  const timeUpdate = async (time: number) => {
    const machineRef = doc(database, props.building, props.machine)
    await updateDoc(machineRef, {
      timeRemaining: time,
    })
  }

  useEffect(() => {
    timeUpdate(time)
  }, [time])

  if (props.machineType === "Washer") {
    return (
      <>
        <Button
          title="23"
          onPress={() => {
            updateTime(23)
          }}
        />
        <Button
          title="26"
          onPress={() => {
            updateTime(26)
          }}
        />
        <Button
          title="29"
          onPress={() => {
            updateTime(29)
          }}
        />
      </>
    )
  } else if (props.machineType === "Dryer") {
  }
}
export default TimeForm
