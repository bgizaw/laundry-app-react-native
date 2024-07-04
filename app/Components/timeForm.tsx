import { doc, updateDoc } from "firebase/firestore"
import { useState, useEffect } from "react"
import { Button, Text } from "react-native"
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

//timer
const [timer, setTimer] = useState(0)

useEffect(() => {
  const startTime = Date.now()

  const updateElapsedTime = () => { 
    if (time > 0 && timer <= time) {
      setTimer((startTime - Date.now()) * -1)
    }
  }

  const interval = setInterval(updateElapsedTime, 1000)

  return () => clearInterval(interval)
}, [time])




//

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
      <Text>{Math.floor(timer/1000)}</Text>
      <Text>{time}</Text>
        <Button
          title="0"
          onPress={() => {
            updateTime(0)
          }}
        />
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
    return(
    <>
    <Text>{time}</Text>
    <Button
      title="45"
      onPress={() => {
        updateTime(45)
      }}
    />
    </>
    )
  }
}
export default TimeForm
