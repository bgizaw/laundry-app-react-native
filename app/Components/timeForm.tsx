import { doc, onSnapshot, updateDoc } from "firebase/firestore"
import { useState, useEffect } from "react"
import { Button, Text, View, Pressable } from "react-native"
import database from "../firebase/firestoreInitialize"
import CountDown from "react-native-countdown-component"
import styles from "./buttonStyles"

type props = {
  machineType: string
  building: string
  machine: string
}

function TimeForm(props: props) {
  const [time, setTime] = useState(0)
  const [timerState, changeTimerState] = useState<boolean | null>(null)
  const [endTime, setEndTime] = useState(0)
  const [status, setStatus] = useState<string | null>(null)

  // called within updateTime, uses useState hook to change end time
  const startTimer = (time: number) => {
    setEndTime(new Date().getTime() / 1000 + time * 60)
  }

  // goes to this after they click time amount
  const updateTime = (time: number) => {
    setTime(time) // uses useState hook to change time
    startTimer(time) // calls function to calculate the end time needed
  }

  useEffect(() => {
    const fetchMachineDetails = async () => {
      const machineRef = doc(database, props.building, props.machine)
      onSnapshot(machineRef, snapshot => {
        // listens for changes to the database and updates state if the timerStarted in firestore is changed
        if (snapshot.data()!.status === "available") {
          // figure out how to get machine to reset when it is set to available
          const machineReset = async () => {
            await updateDoc(machineRef, {
              endTime: 0,
              timerStarted: false,
              cycleLength: 0,
            })
          }
          machineReset()
        } else {
          //change this else to an else if at some point
          changeTimerState(snapshot.data()!.timerStarted)
          setEndTime(snapshot.data()!.endTime)
          setTime(snapshot.data()!.cycleLength)
        }
      })
    }
    fetchMachineDetails()
  }, [])

  useEffect(() => {
    if (timerState != null) {
      timeUpdate(time)
    }
  }, [time])

  const timeUpdate = async (time: number) => {
    const machineRef = doc(database, props.building, props.machine)
    await updateDoc(machineRef, {
      endTime: endTime,
      timerStarted: timerState,
      cycleLength: time,
    })
  }

  const timerStateUpdate = (state: boolean) => {
    changeTimerState(state)
  }

  const statusUpdate = (newstatus: string) => {
    if (newstatus != "" || newstatus != null) {
      setStatus(newstatus)
    }
  }

  useEffect(() => {
    firebaseStatusUpdate(status!)
    // if (status) {
    //   firebaseStatusUpdate(status)
    // }
  }, [status])

  const firebaseStatusUpdate = async (state: string) => {
    const machineRef = doc(database, props.building, props.machine)
    await updateDoc(machineRef, {
      status: state,
    })
  }

  const washerTimeButtons = (
    <>
      <View style={styles.container}>
        {/* <Button
        title="0"
        onPress={() => {
          updateTime(0)
          timerStateUpdate(false)
          console.log("state changed in button")
        }}
      /> */}

        <Pressable
          style={styles.button}
          onPress={() => {
            updateTime(23) // change time and end time
            timerStateUpdate(true)
            statusUpdate("in-use")
          }}
        >
          <Text>23</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => {
            updateTime(26) // change time and end time
            timerStateUpdate(true)
            statusUpdate("in-use")
          }}
        >
          <Text>26</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => {
            updateTime(29) // change time and end time
            timerStateUpdate(true)
            statusUpdate("in-use")
          }}
        >
          <Text>29</Text>
        </Pressable>
      </View>
    </>
  )

  if (
    props.machineType === "Washer" &&
    (timerState === false || timerState === null)
  ) {
    // console.log(timerState, "false")
    //if machine is a washer and the timer hasnt been set yet (user hasnt pressed a time button yet)
    return <>{washerTimeButtons}</>
  } else if (props.machineType === "Washer" && timerState === true) {
    // console.log(timerState, "true")
    //if washer timer button has been clicked
    return (
      <>
        <Text>Countdown</Text>
        <Text>{endTime}</Text>

        <CountDown
          key={time} //makes countdown display current value of time instead of previous
          until={endTime - new Date().getTime() / 1000} //60 seconds in a minute
          timeToShow={["M", "S"]}
          onFinish={() => {
            // if state is in use -> change to pending
            if (status === "in-use") {
              // console.log("205: " + status)
              updateTime(10)
              statusUpdate("pending")
            }
            // this part does not work, tried to figure out why -> when statusUpdates runs and goes from in-use to pending,
            //for some reason, the status here is null
            else if (status === "pending") {
              // console.log("207: " + status)
              updateTime(10)
              statusUpdate("available")
            } else {
              // talk to everyone else, see if they can figure out the issue with it so I don't have to rely on this
              // or see if it's ok to rely on this. is there any circumstances where this is bad?
              // console.log("in else and status is: " + status)
              updateTime(10)
              statusUpdate("available")
            }
          }}
        ></CountDown>
      </>
    )
  } else if (
    props.machineType === "Dryer" &&
    (timerState === false || timerState === null)
  ) {
    return (
      <>
        <View>
          <Pressable
            style={styles.button}
            onPress={() => {
              updateTime(45) // change time and end time
              timerStateUpdate(true)
              statusUpdate("in-use")
            }}
          >
            <Text>45</Text>
          </Pressable>

          <Pressable
            style={styles.button}
            onPress={() => {
              updateTime(70) // change time and end time
              timerStateUpdate(true)
              statusUpdate("in-use")
            }}
          >
            <Text>70</Text>
          </Pressable>
        </View>
      </>
    )
  } else if (props.machineType === "Dryer" && timerState === true) {
    return (
      <>
        <Text>{time}</Text>
        <CountDown
          key={time} //makes countdown display current value of time instead of previous
          until={endTime - new Date().getTime() / 1000} //60 seconds in a minute
          timeToShow={["H", "M", "S"]}
        ></CountDown>
      </>
    )
  }
}
export default TimeForm
