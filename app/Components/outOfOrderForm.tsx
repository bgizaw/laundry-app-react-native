// buttons that have all the reasons -> link to firebase with the date (in array form)
import { Button } from "react-native"
import { doc, updateDoc, onSnapshot, getDoc } from "firebase/firestore"
import database from "../firebase/firestoreInitialize"
import { useState, useEffect } from "react"
import { Text } from "react-native"
import { requireOptionalNativeModule } from "expo"

type props = {
    machineType: string
    building: string
    machine: string
  }

const OutOfOrderForm = (props: props) => {

    var [numComplaints, setNumComplaints] = useState<number>(0) 
    const [complaint, setComplaint] = useState("total")
    const [dates, setDates] = useState<string[]>([])
    const [totalComplaints, setTotalComplaints] = useState<number>(0)
    


    const updateComplaints = async () => {
        const machineRef = doc(database, props.building, props.machine, "out-of-order", complaint)
        const machineTotalRef = doc(database, props.building, props.machine, "out-of-order", "total")

        await updateDoc(machineRef, {
            number: numComplaints,
            dates: dates
   
    })
     console.log("triggered")    
        // await updateDoc(machineTotalRef, {
    //      number: totalComplaints
    // })
    }

    useEffect(() => {
        const fetchMachineDetails = async () => {
        const machineRef = doc(database, props.building, props.machine)
        const outOfOrderDocRef = doc(machineRef, 'out-of-order', complaint);
        const docSnap = await getDoc(outOfOrderDocRef)

        setNumComplaints(docSnap.data()!.number)
        setDates(docSnap.data()!.dates)
        }


    },[])

    useEffect(() => {
        if (complaint != "total"){
            updateComplaints()
        }
    },[complaint])

    // const updateMachineDetails = async () => {
    //     const machineRef = doc(database, props.building, props.machine)
          
    //     const outOfOrderDocRef = doc(machineRef, 'out-of-order', complaint);

       
    // }

    //     const outOfOrderDocTotalRef = doc(machineRef, 'out-of-order', "total");
    //     onSnapshot(outOfOrderDocTotalRef, snapshot => {
    //         setTotalComplaints(snapshot.data()!.number + 1)


    // })
    
        

    return (
        <>
        <Button
        title="Blocked Off Note"
        onPress={() => {
            setNumComplaints(numComplaints + 1)
            let arr = dates
            arr.push(new Date().toDateString()) 
            setDates(arr)
            console.log(dates, numComplaints)
            
        
        }}
      />
        <Button
        title="23"
        onPress={() => {
        
        }}
      />
      <Text>{numComplaints}</Text>
      <Text>{dates}</Text>
    </>
    )



}

export default OutOfOrderForm