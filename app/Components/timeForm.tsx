import { doc, onSnapshot, updateDoc } from "firebase/firestore"
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
  const [timerState, changeTimerState] = useState<boolean | null>(null)

  const [endTime, setEndTime] = useState(0) 

  
  // called within updateTime, uses useState hook to change end time
  const startTimer = (time: number) => {
    console.log("in start timer")
    setEndTime(new Date().getTime()/ 1000 + (time * 60))
      // setEndTime(endTimer)
      // console.log("Now: " + new Date().getTime()/ 1000)
      // console.log("calc" + (new Date().getTime()/ 1000 + (time * 60)))
      // console.log("end time: " + endTime)
  } 

  // goes to this after click time amount
  const updateTime = (time: number) => { 
    setTime(time) // uses useState hook to change time
    console.log("in update time with time: " + time)
    startTimer(time) // calls function to calculate the end time needed
    console.log("called start timer")
    
    
  }
  
  useEffect(() => {
    const fetchMachineDetails = async () => {
      const machineRef = doc(database, props.building, props.machine)
      onSnapshot(machineRef, snapshot => {
        // listens for changes to the database and updates state if the stimerStarted in firestore is changed
        if (snapshot.data()!.status === "available"){
          changeTimerState(false)
          
        } else{
          changeTimerState(snapshot.data()!.timerStarted)
          setEndTime(snapshot.data()!.endTime)
          setTime(snapshot.data()!.cycleLength)
        }
      })
    }
    fetchMachineDetails()
  }, [props.machine])

 useEffect(() => {
        timeUpdate(time)
    
      }, [time])
  
  const timeUpdate = async (time: number) => {
    const machineRef = doc(database, props.building, props.machine)
    await updateDoc(machineRef, {
      endTime: endTime,
      timerStarted: timerState,
      cycleLength: time
    })
  }

  
  const timerStateUpdate = (state: boolean) => {
    changeTimerState(state)
  }

  

  const washerTimeButtons = (
    <>
      <Button
        title="0"
        onPress={() => {
          updateTime(0)
          
          timerStateUpdate(false)
        }}
      />
      <Button
        title="23"
        onPress={() => {
          updateTime(23) // change time and end time
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

  if (props.machineType === "Washer" && (timerState === false || timerState === null)) {
    //if machine is a washer and the timer hasnt been set yet (user hasnt pressed a time button yet)
    return <>{washerTimeButtons}</>
  } else if (props.machineType === "Washer" && timerState === true) {
    //if washer timer button has been clicked
    return (
      <>
        <Text>{((endTime - new Date().getTime() / 1000)) / 60 }</Text>
        <Text>{time}</Text>
        <CountDown
          key={time} //makes countdown display current value of time instead of previous
          until={((endTime - new Date().getTime() / 1000))} //60 seconds in a minute
          timeToShow={["M", "S"]}
        ></CountDown>
      </>
    )
  } else if (props.machineType === "Dryer" && (timerState === false || timerState === null)) {
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
          until={(endTime - new Date().getTime()) * 60} //60 seconds in a minute
          timeToShow={["M", "S"]}
        ></CountDown>
      </>
    )
  }
}
export default TimeForm
