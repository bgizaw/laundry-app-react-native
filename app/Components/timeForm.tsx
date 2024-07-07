import { doc, updateDoc } from "firebase/firestore"
import { useState, useEffect } from "react"
import { Button, Text } from "react-native"
import database from "../firebase/firestoreInitialize"
import CountDown from "react-native-countdown-component"

type props = {
  machineType: string
  building: string
  machine: string
}

function TimeForm(props: props) {
  const [time, setTime] = useState(0)
  const [timerState, changeTimerState] = useState(false)

  const updateTime = (time: number) => {
    setTime(time)
  }

  const timeUpdate = async (time: number) => {
    const machineRef = doc(database, props.building, props.machine)
    await updateDoc(machineRef, {
      timeRemaining: time,
    })
  }

  const timerStateUpdate = (state: boolean) => {
    changeTimerState(state)
  }

  useEffect(() => {
    timeUpdate(time)
  }, [time])

  const washerTimeButtons = (
    <>
      <Button
        title="0"
        onPress={() => {
          updateTime(0)
          timerStateUpdate(true)
        }}
      />
      <Button
        title="23"
        onPress={() => {
          updateTime(23)
          timerStateUpdate(true)
        }}
      />
      <Button
        title="26"
        onPress={() => {
          updateTime(26)
          timerStateUpdate(true)
        }}
      />
      <Button
        title="29"
        onPress={() => {
          updateTime(29)
          timerStateUpdate(true)
        }}
      />
    </>
  )

  if (props.machineType === "Washer" && timerState === false) {
    //if machine is a washer and the timer hasnt been set yet (user hasnt pressed a time button yet)
    return <>{washerTimeButtons}</>
  } else if (props.machineType === "Washer" && timerState === true) {
    //if washer timer button has been clicked
    return (
      <>
        <Text>{time}</Text>
        <CountDown
          key={time} //makes countdown display current value of time instead of previous
          until={time * 60} //60 seconds in a minute
          timeToShow={["M", "S"]}
        ></CountDown>
      </>
    )
  } else if (props.machineType === "Dryer" && timerState === false) {
    return (
      <>
        <Text>{time}</Text>
        <Button
          title="45"
          onPress={() => {
            updateTime(45)
            timerStateUpdate(true)
          }}
        />
      </>
    )
  } else if (props.machineType === "Dryer" && timerState === true) {
    return (
      <>
        <Text>{time}</Text>
        <CountDown
          key={time} //makes countdown display current value of time instead of previous
          until={time * 60} //60 seconds in a minute
          timeToShow={["M", "S"]}
        ></CountDown>
      </>
    )
  }
}
export default TimeForm
