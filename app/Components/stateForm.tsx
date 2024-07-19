import { useState, useEffect } from "react"
import database from "../firebase/firestoreInitialize"
import { doc, updateDoc, onSnapshot } from "firebase/firestore"
import TimeForm from "./timeForm"
import { Button, Text, Platform } from "react-native"
import * as Linking from "expo-linking"
import * as WebBrowser from "expo-web-browser"
import OutOfOrderForm from "./outOfOrderForm"

const workOrderLink = `https://pomona.webtma.com/?tkn=zR_pJHKh9JP45Xg9RPojIH2irxyiuxkXCrWY6I1oLlEMORHMSIfRo8C50hsmXjJNq3CC4sh
He74IdVLeZelp9ZkWK50Q_luNhA7JFwQ6Lx2OfJd_pFK2rvhrrqeXGqLQywWvEnvUiNo4WgeJcevA2BSHiAXEKNTLwt39ZqtjT4fFs-oTtdZ1O0gv8UN-bLkhcSL7e
qRIxeuVbG7ytk3eR5US9MexRJDmTpn6bAkOr0OvwjXtkjGGCJz3uj6jDN_6qPl4d7lOptkG5EDbRxzGXg`

// open work order link
async function openInCustomTab(url: string) {
  if (Platform.OS === "android") {
    const { preferredBrowserPackage } =
      await WebBrowser.getCustomTabsSupportingBrowsersAsync()
    await WebBrowser.openBrowserAsync(url, {
      browserPackage: preferredBrowserPackage,
    })
  } else if (Platform.OS === "ios") {
    Linking.openURL(url)
  } else {
    await WebBrowser.openBrowserAsync(url)
  }
}

type props = {
  building: string
  machine: string
}

function StateForm(props: props) {
  const [state, setState] = useState<string | null>(null) //change to props.state when i figure out how to set state to state in firestore database
  const [timerState, changeTimerState] = useState<boolean | null>(null)
  const [endTime, setEndTime] = useState(0)
  const [outOfOrderDisplay, setOutOfOrderDisplay] = useState(false)

  useEffect(() => {
    const fetchMachineState = async () => {
      const machineRef = doc(database, props.building, props.machine)

      onSnapshot(machineRef, snapshot => {
        // listens for changes to the database and updates state if the state in firestore is changed
        setState(snapshot.data()!.status)
      })
    }

    fetchMachineState()
  }, [])

  useEffect(() => {
    if (state) {
      stateUpdate(state)
    }
  }, [state])

  const openOutOfOrderForm = () => {
    return(
    <OutOfOrderForm 
      machineType={props.machine.split(" ")[0]}
      building={props.building}
      machine={props.machine}
    />
    )
  } 

  const updateState = (state: string) => {
    setState(state)
  }

  // update firestore machine data
  const stateUpdate = async (state: string) => {
    const machineRef = doc(database, props.building, props.machine)
    await updateDoc(machineRef, {
      status: state,
    })
  }

  const setStateAvailable = async () => {
    const machineRef = doc(database, props.building, props.machine)
    await updateDoc(machineRef, {
      timerStarted: false,
    })
  }

  if (state === "available" && !outOfOrderDisplay) {
    return (
      <>
        <Button
          title="In-Use"
          onPress={() => {
            updateState("in-use")
          }}
        />
        <Button
          title="Out-Of-Order"
          onPress={() => {
            openInCustomTab(workOrderLink)
            setOutOfOrderDisplay(true)
          }}
        />
      </>
    )
  } else if (state === "available" && outOfOrderDisplay) {
    return (
      <>
        <Button
          title="In-Use"
          onPress={() => {
            updateState("in-use")
          }}
        />
        <OutOfOrderForm 
      machineType={props.machine.split(" ")[0]}
      building={props.building}
      machine={props.machine}
    />
    </>
    )

  } else if (state === "in-use") {
    return (
      <>
        <Text>This machine is in use.</Text>
        <Button
          title="Available"
          onPress={() => {
            updateState("available")
            setStateAvailable()
          }}
        />
        <TimeForm
          machineType={props.machine.split(" ")[0]}
          building={props.building}
          machine={props.machine}
        />
      </>
    )
  } else if (state === "pending") {
    return (
      <>
        <Text>{state}</Text>
        <Button
          title="Available"
          onPress={() => {
            updateState("available")
          }}
        />
        <Button
          title="In-Use"
          onPress={() => {
            updateState("in-use")
          }}
        />
        <Button
          title="Out-Of-Order"
          onPress={() => {
            openInCustomTab(workOrderLink)
            openOutOfOrderForm()
          }}
        />
      </>
    )
  }
}

export default StateForm
