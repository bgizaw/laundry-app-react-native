import { count, doc, updateDoc } from "firebase/firestore"
import { useState, useEffect } from "react"
import { Button, Text } from "react-native"
import database from "../firebase/firestoreInitialize"
import CountDown from 'react-native-countdown-component'

type props = {
  machineType: string
  building: string
  machine: string
}

function TimeForm(props: props) {
  const [time, setTime] = useState(0)
  // const [countdownKey, setCountdownKey] = useState(0)
  // i noticed that the implementation using useState allows the timer to restart when you click the same time 
  // again, but this doesnt happen when the key is set to time since time doesn't change in this case

  const updateTime = (time: number) => {
    setTime(time)
    // setCountdownKey(prevKey => prevKey + 1)
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


  if (props.machineType === "Washer" && time > 0) {
    return (
      <>
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
        <Text>{time}</Text>
        <CountDown
        key={time}
        until={time * 60} //60 seconds in a minute
        timeToShow={['M', 'S']}></CountDown>
      </>
    )
  } else if (props.machineType === "Washer") {
    return (
      <>
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
        <Text>{time}</Text>
      </>
    )
  }
  
  else if (props.machineType === "Dryer") {
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
