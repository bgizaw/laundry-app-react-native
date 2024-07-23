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

// have: list and numbers are updating correctly
// need: firebase to update
// is numComplaints needed?

const OutOfOrderForm = (props: props) => {

    const [numComplaints, setNumComplaints] = useState<number>(0) 
    const [complaint, setComplaint] = useState("total")
    const [dates, setDates] = useState<string[]>([])
    const [readDates, setReadDates] = useState(false)
    const [totalComplaints, setTotalComplaints] = useState<number>(0)
    

    const handleComplaint = async (newComplaint: string) => {
        if (newComplaint != complaint){
            // fetch machine details if new complaint isn't the one already stored
            setComplaint(newComplaint)
            console.log(complaint, " complaint")
        }
        // setComplaint(newComplaint)
        // fetchMachineDetails()
        await fetchMachineDetails(newComplaint);
        // increase dates and numcomplaints
        // let arr = dates
        // arr.push(Date.now().toLocaleString()) 
        // setDates(arr)
        // updateFirebaseComplaints()
        
    }

    // useEffect(() => {
    //     if (complaint != "total"){
    //         updateFirebaseComplaints()
    //     }
    // },[complaint])
    
    const updateFirebaseComplaints = async () => {
        const machineRef = doc(database, props.building, props.machine, "out-of-order", complaint)
        // const machineTotalRef = doc(database, props.building, props.machine, "out-of-order", "total")

        console.log("updateFirebaseComplaints and complaint: " + complaint)
        await updateDoc(machineRef, {
            number: numComplaints,
            dates: dates
   
    })
    //  console.log("triggered")    
        // await updateDoc(machineTotalRef, {
    //      number: totalComplaints
    // })
    }

    const fetchMachineDetails = async (reason : string) => {
        const machineRef = doc(database, props.building, props.machine)
        // console.log("fetch machine details: " + complaint)
        const outOfOrderDocRef = doc(machineRef, 'out-of-order', reason);
        const docSnap = await getDoc(outOfOrderDocRef)
        if (docSnap.exists()) {
            setNumComplaints(docSnap.data()!.number)
            setDates(docSnap.data()!.dates)
            setReadDates(true)
            console.log("in useeffect with data for: " + complaint + " dates: " + docSnap.data()!.dates)
        } else {
            console.log("Document does not exist!")
        }
        
        // onSnapshot(outOfOrderDocRef, snapshot => {
        //     setNumComplaints(snapshot.data()!.number)
        //     setDates(snapshot.data()!.dates)
        //     console.log("in useeffect with data for: " + complaint + " numComplaints: " + snapshot.data()!.number)
        // })
    }

    // updates num companits and dates based on what's already in the firebase
    // useEffect(() => {
    //     const fetchMachineDetails = async () => {
    //         const machineRef = doc(database, props.building, props.machine)
    //         // console.log("fetch machine details: " + complaint)
    //         const outOfOrderDocRef = doc(machineRef, 'out-of-order', complaint);
    //         onSnapshot(outOfOrderDocRef, snapshot => {
    //             setNumComplaints(snapshot.data()!.number)
    //             setDates(snapshot.data()!.dates)
    //             console.log("in useeffect with data for: " + complaint + " numComplaints: " + snapshot.data()!.number)
    //         })// const docSnap = await getDoc(outOfOrderDocRef)

    //         // setNumComplaints(docSnap.data()!.number)
    //         // setDates(docSnap.data()!.dates)
    //     }

    //     fetchMachineDetails()
    // },[complaint])

    // updates the firebase if a new complaint is added
    useEffect(() => {
        if (numComplaints != 0){
            updateFirebaseComplaints()
            console.log("in firebase use effect")
        }
    },[numComplaints])

    useEffect(() => {
        if (readDates){
            setDates(dates => [...dates, Date.now().toLocaleString()])
            // console.log(arr, "arr")
            console.log(dates, "dates")
            setNumComplaints(numComplaints => numComplaints + 1)
        }
        setReadDates(false)

    }, [readDates])

    // const updateMachineDetails = async () => {
    //     const machineRef = doc(database, props.building, props.machine)
          
    //     const outOfOrderDocRef = doc(machineRef, 'out-of-order', complaint);

       
    // }

    //     const outOfOrderDocTotalRef = doc(machineRef, 'out-of-order', "total");
    //     onSnapshot(outOfOrderDocTotalRef, snapshot => {
    //         setTotalComplaints(snapshot.data()!.number + 1)


    // })
    
        

    // now, need to figure out how to do this dynamically, and have the that are changing be specific to them
    // ex -> num Complaints for blocked off note being different from the missing clothes one 
    return (
        <>
        <Button
        title="Blocked Off Note"
        onPress={() => {
            handleComplaint("blockedOffNote")
        }}
      />
      <Button
        title="Clothes went missing"
        onPress={() => {
            handleComplaint("missingClothes")
            console.log(dates, numComplaints)
        }}
      />
      <Button
        title="Clothes have odor"
        onPress={() => {
            handleComplaint("odor")
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