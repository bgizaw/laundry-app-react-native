import { useState, useEffect } from "react"
import database from "../firebase/firestoreInitialize"
import { doc, updateDoc } from "firebase/firestore"
import TimeForm from "./timeForm"
import { Button, Text, Platform } from "react-native"
import * as Linking from 'expo-linking'
import * as WebBrowser from 'expo-web-browser'

const workOrderLink = `https://pomona.webtma.com/?tkn=zR_pJHKh9JP45Xg9RPojIH2irxyiuxkXCrWY6I1oLlEMORHMSIfRo8C50hsmXjJNq3CC4sh
He74IdVLeZelp9ZkWK50Q_luNhA7JFwQ6Lx2OfJd_pFK2rvhrrqeXGqLQywWvEnvUiNo4WgeJcevA2BSHiAXEKNTLwt39ZqtjT4fFs-oTtdZ1O0gv8UN-bLkhcSL7e
qRIxeuVbG7ytk3eR5US9MexRJDmTpn6bAkOr0OvwjXtkjGGCJz3uj6jDN_6qPl4d7lOptkG5EDbRxzGXg`


async function openInCustomTab(url: string) {
  if (Platform.OS === 'android') {
    const { preferredBrowserPackage } = await WebBrowser.getCustomTabsSupportingBrowsersAsync()
    await WebBrowser.openBrowserAsync(url, { browserPackage: preferredBrowserPackage})
} else if (Platform.OS === 'ios') {
  Linking.openURL(url)
}else {
  await WebBrowser.openBrowserAsync(url)
}
}


type props = {
  building: string
  machine: string
  // state: string
}

function StateForm(props: props) {
  const [state, setState] = useState("available") //change to props.state when i figure out how to set state to state in firestore database
  const updateState = (state: string) => {
    setState(state)
    // update firestore machine data
  }

  const stateUpdate = async (state: string) => {
    const machineRef = doc(database, props.building, props.machine)
    await updateDoc(machineRef, {
      status: state,
    })
  }

  useEffect(() => {
    stateUpdate(state)
  }, [state])

  if (state != "In-Use") {
    return (
      <>
      <Text>{state}</Text>
        <Button
          title="Available"
          onPress={() => {
            updateState("Available")
          }}
        />
        <Button
          title="In-Use"
          onPress={() => {
            updateState("In-Use")
          }}
        />
        <Button
          title="Out-Of-Order"
          onPress={() => {
            updateState("Out-Of-Order")
            openInCustomTab(workOrderLink)
          }}
        />
        <Button
          title="Pending"
          onPress={() => {
            updateState("Pending")
          }}
        />
      </>
    )
  } else if (state === "In-Use"){
    return (
      <>
        <Text>This machine is in use.</Text>
        <Button
          title="Available"
          onPress={() => {
            updateState("Available")
          }}
        />
        <TimeForm
          machineType={props.machine.split(" ")[0]}
          building={props.building}
          machine={props.machine}
        />
      </>
    )
  }
}

export default StateForm
