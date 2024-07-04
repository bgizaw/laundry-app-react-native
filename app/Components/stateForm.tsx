import { useState, useEffect } from "react"
import { Button, Text } from "react-native"
import database from "../firebase/firestoreInitialize"
import { doc, updateDoc } from "firebase/firestore"
import TimeForm from "./timeForm"

type props = {
  building: string
  machine: string
}

function StateForm(props: props) {
  const [state, setState] = useState("Available")
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
