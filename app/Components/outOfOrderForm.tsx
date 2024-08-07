// buttons that have all the reasons -> link to firebase with the date (in array form)
import { Button, TextInput, View, TouchableOpacity } from "react-native"
import { doc, updateDoc, onSnapshot, getDoc } from "firebase/firestore"
import database from "../firebase/firestoreInitialize"
import { useState, useEffect } from "react"
import { Text } from "react-native"
import { requireOptionalNativeModule } from "expo"
import styles from "./buttonStyles"

type props = {
    machineType: string
    building: string
    machine: string
  }

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
            setComplaint(newComplaint)
        }

        await fetchMachineDetails(newComplaint);
    }

    const handleOther = (otherComplaint: string) => {
        let entry: string = otherComplaint + ", " + (new Date())
        setOtherComplaintEntry(entry)
        setComplaint("other")
        fetchMachineDetails("other")
    }

    // gets the information from the firebase
    const fetchMachineDetails = async (reason : string) => {
        const machineRef = doc(database, props.building, props.machine)
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
            setReadDates(true)
            console.log("in useeffect with data for: " + complaint + " dates: " + docSnap.data()!.dates)
        } else {
            console.log("Document does not exist!")
        }
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
            setNumComplaints(numComplaints => numComplaints + 1)
        }
        // set read dates to false after this is done
        setReadDates(false)
        updateFirebaseComplaints();

    }, [readDates])
    
    const updateFirebaseComplaints = async () => {
        const complaintMachineRef = doc(database, props.building, props.machine, "out-of-order", complaint)

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
    }
        

    if (props.machineType == "Washer"){
        return (
            <>
        <View style = {styles.container}>
            <TouchableOpacity
                style = {styles.button}
                onPress={() => {
                    handleComplaint("blockedOffNote")
                }}>
            <Text>Machine is blocked off</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style = {styles.button}
            onPress={() => {
                handleComplaint("missingClothes")
                console.log(dates, numComplaints)
            }}>
            <Text>Clothes went missing</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style = {styles.button}
            onPress={() => {
                handleComplaint("odor")
            }}>
            <Text>Clothes have an odor</Text>
        </TouchableOpacity>

        <View>
            {otherTextInputVisible ? (
            <TextInput
                onChangeText={setOtherText}
                placeholder='Type complaint here'
                value={otherText}
                onSubmitEditing={() => handleOther(otherText)}
            />
        ) : (
            <TouchableOpacity
            style = {styles.button}
                onPress= {() => setOtherTextInputVisible(true)}>
                <Text>Other</Text>
            </TouchableOpacity>
        )}
        </View>
        </View>
        </>
    )}
    else if (props.machineType == "Dryer"){
        return (
            <>
            <View style = {styles.container}>
            <TouchableOpacity
                style = {styles.button}
                onPress={() => {
                    handleComplaint("blockedOffNote")
                }}>
            <Text>Machine is blocked off</Text>
        </TouchableOpacity>

          <TouchableOpacity
            style = {styles.button}
            onPress={() => {
                handleComplaint("missingClothes")
                console.log(dates, numComplaints)
            }}>
            <Text>Clothes went missing</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style = {styles.button}
            onPress={() => {
                handleComplaint("odor")
            }}>
            <Text>Clothes have an odor</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style = {styles.button}
            
            onPress={() => {
                handleComplaint("didntDry")
            }}>
            <Text>Clothes didn't fully dry</Text>
        </TouchableOpacity>


        <TouchableOpacity
            style = {styles.button}
            onPress={() => {
                handleComplaint("burnt")
            }}>
            <Text>Clothes were burnt</Text>
        </TouchableOpacity>

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
          </View>
        </>
        )
    }



}

export default OutOfOrderForm