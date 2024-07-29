// buttons that have all the reasons -> link to firebase with the date (in array form)
import { Button, TextInput, View } from "react-native"
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

// figure out what total looks like

const OutOfOrderForm = (props: props) => {

    const [numComplaints, setNumComplaints] = useState<number>(0) 
    const [complaint, setComplaint] = useState("total")
    const [dates, setDates] = useState<Date[]>([])
    const [otherComplaints, setOtherComplaints] = useState<string[]>([])
    const [otherComplaintEntry, setOtherComplaintEntry] = useState<string>("")
    const [readDates, setReadDates] = useState(false)
    const [totalComplaints, setTotalComplaints] = useState<number>(0)
    const [otherText, setOtherText] = useState('')
    const [otherTextInputVisible, setOtherTextInputVisible] = useState(false);
    

    // sets the complaint and calls on fetchMachineDetaills
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

    const handleOther = (otherComplaint: string) => {
        // let currDate = new Date().toDateString()
        let entry: string = otherComplaint + ", " + (new Date())
        setOtherComplaintEntry(entry)
        // "(" + otherComplaint + ", " + (new Date().toDateString()) + ")"
        setComplaint("other")
        fetchMachineDetails("other")
        // return entry
    }

    // gets the information from the firebase
    const fetchMachineDetails = async (reason : string) => {
        const machineRef = doc(database, props.building, props.machine)
        // console.log("fetch machine details: " + complaint)
        const outOfOrderTotalDocRef = doc(machineRef, 'out-of-order', 'total');
        const totalDocSnap = await getDoc(outOfOrderTotalDocRef)
        if (totalDocSnap.exists()){
            setTotalComplaints(totalDocSnap.data()!.number)
        }
        else {
            console.log("Document doesn't exist")
        }
    
        const outOfOrderDocRef = doc(machineRef, 'out-of-order', reason);
        const docSnap = await getDoc(outOfOrderDocRef)
        // after reading info from the firebase, read dates is set to true which triggers a use effect
        if (docSnap.exists()) {
            if (reason == "other"){
                setOtherComplaints(docSnap.data()!.complaint)
            }
            else {
                setDates(docSnap.data()!.dates)
            }
            setNumComplaints(docSnap.data()!.number)
            // setDates(docSnap.data()!.dates)
            setReadDates(true)
            console.log("in useeffect with data for: " + complaint + " dates: " + docSnap.data()!.dates)
        // } else if (docSnap.exists() && reason == "other"){
        //     setOtherComplaints(docSnap.data()!.complaint)
        } else {
            console.log("Document does not exist!")
        }
        
        // onSnapshot(outOfOrderDocRef, snapshot => {
        //     setNumComplaints(snapshot.data()!.number)
        //     setDates(snapshot.data()!.dates)
        //     console.log("in useeffect with data for: " + complaint + " numComplaints: " + snapshot.data()!.number)
        // })
    }

    // if the read dates is set to true (which means that info from firebase is read), increase dates and numcomplaints
    // then call on updatefirebasecomplaints function after everything is set
    useEffect(() => {
        if (readDates){
            if (complaint == "other"){
                setOtherComplaints(otherComplaints => [...otherComplaints, otherComplaintEntry])
            }
            else {
                setDates(dates => [...dates, new Date()])
            }
            setTotalComplaints(totalComplaints => totalComplaints + 1)
            // console.log(arr, "arr")
            console.log(dates, "dates")
            setNumComplaints(numComplaints => numComplaints + 1)
        }
        // set read dates to false after this is done
        setReadDates(false)
        updateFirebaseComplaints();

    }, [readDates])

    // updates the firebase if a new complaint is added
    // useEffect(() => {
    //     if (numComplaints != 0){
    //         updateFirebaseComplaints()
    //         console.log("in firebase use effect")
    //     }
    // },[numComplaints])

    // useEffect(() => {
    //     if (complaint != "total"){
    //         updateFirebaseComplaints()
    //     }
    // },[complaint])
    
    const updateFirebaseComplaints = async () => {
        const complaintMachineRef = doc(database, props.building, props.machine, "out-of-order", complaint)
        // const machineTotalRef = doc(database, props.building, props.machine, "out-of-order", "total")

        console.log("updateFirebaseComplaints and complaint: " + complaint)
        if (complaint == "other"){
            await updateDoc(complaintMachineRef, {
                number: numComplaints,
                complaint: otherComplaints
            })
        }
        else {
            await updateDoc(complaintMachineRef, {
                number: numComplaints,
                dates: dates
            })
        }
        const totalMachineRef = doc(database, props.building, props.machine, 'out-of-order', 'total')
        await updateDoc(totalMachineRef, {
            number: totalComplaints
        })
    //  console.log("triggered")    
        // await updateDoc(machineTotalRef, {
    //      number: totalComplaints
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
    if (props.machineType == "Washer"){
        return (
            <>
            <Button
            title="Machine is blocked off"
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
            title="Clothes have an odor"
            onPress={() => {
                handleComplaint("odor")
            }}
          />
        <View>
            {otherTextInputVisible ? (
            <TextInput
                onChangeText={setOtherText}
                placeholder='Type complaint here'
                value={otherText}
                onSubmitEditing={() => handleOther(otherText)}
            />
            // <Button
            //     title="Submit Complaint"
            // />
        ) : (
            <Button
                title="Other"
                onPress= {() => setOtherTextInputVisible(true)}
            />
        )}
        </View>
        
          {/* <TextInput
            placeholder="Other"
            onChangeText = {onChangeOtherText}
            value= {otherText}
          /> */}
          {/* <Button
            title="Other"
            onPress={() => {
                
            }}
          /> */}
          {/* <Text>{numComplaints}</Text> */}
          {/* <Text>{dates}</Text> */}
        </>
    )}
    else if (props.machineType == "Dryer"){
        return (
            <>
            <Button
            title="Machine is blocked off"
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
            title="Clothes have an odor"
            onPress={() => {
                handleComplaint("odor")
            }}
          />
          <Button
            title="Clothes didn't fully dry"
            onPress={() => {
                handleComplaint("didntDry")
            }}
          />
          <Button
            title="Clothes were burnt"
            onPress={() => {
                handleComplaint("burnt")
            }}
          />
        {/* otherTextInputVisible ? (
            <TextInput
                onChangeText={setOtherText}
                placeholder='Type complaint here'
                value={otherText}
            />
        ) : (
            <Button
                title="Other"
                onPress= {() => setOtherTextInputVisible(true)}
            />
        ) */}
          <Text>{numComplaints}</Text>
          {/* <Text>{dates}</Text> */}
        </>
        )
    }



}

export default OutOfOrderForm