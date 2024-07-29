import database from "../firebase/firestoreInitialize"
import { doc, updateDoc, onSnapshot, getDoc, collection, query, where } from "firebase/firestore"
import { Button, Text, Platform, View } from "react-native"
import { useState, useEffect } from "react"


// once any documents from firebase out of order form is updated, want to effect change in display
// also, take out the display after 

// how to listen to a collection of firebase -> definetly use snapshot 

type props = {
    machineType: string
    building: string
    machine: string
  }

const OutOfOrderDisplay = (props: props) => {

    const [complaints, setComplaints] = useState<Complaint[]>([]);

    // listens to firebase for updates, once something is added it should take the last elem in the array
    // const namedComplaints = query(colRef, where("id", "!=", "other"), where("id", "!=", "total"))

    interface Complaint {
        date: Date
        complaint: string
    }
    
    useEffect(() => {
        const colRef = collection(database, props.building, props.machine, "out-of-order")
        const unsubscribe = onSnapshot(colRef, (snapshot) => {
            const updateComplaints: Complaint[] = []
            snapshot.docs.forEach((doc) => {
                if (doc.id != "other" && doc.id != "total"){
                    for (let i = 0; i < doc.data().dates.length; i++){
                        updateComplaints.push({date: doc.data().dates[i].toDate(), complaint: doc.id})
                    }
                }
                // console.log(doc.data())
            })

            const sortedArray = sortTime(updateComplaints)

            // updateComplaints.sort((a, b) =>{
            //     const dateA = new Date(a.date).getTime()
            //     const dateB = new Date(b.date).getTime()
            //     return dateB - dateA
            // })
            setComplaints(sortedArray)
        })
        // stops listening to firebase
        return () => unsubscribe()
    }, [])

    const sortTime = (array: Complaint[]) => {
        const ret = array.sort((a, b) =>{
            // const dateA = new Date(a.date).getTime()
            // const dateB = new Date(b.date)
            // console.log(a.date)
            // console.log(dateA)
            // console.log(typeof dateA)
            // const dateA = new Date(a.date)
            // const dateB = new Date(b.date).getTime()
            // const dateA = new Date(a.date)
            // const dateA = Number(a.date)
            // const dateB = Number(b.date)

            // console.log("dateA: " + dateA)
            // console.log("a.date: " + a.date.getTime())
            // console.log

            // console.log("get time: " + a.date.getTime())
            return b.date.getTime() - a.date.getTime()
        })
        // console.log("in sort time")
        console.log(ret)
        return ret
    }


    /**
     * FUNCTIONS:
     * onsnapshot that reads from the firebase
     * text that displays it - maybe an array -> use usestate function
     * return the list
     * 
     */
    
    
    // listen to all the documents in the collection - except other and total
    // when something is updated in the collection, show it
    // do date, then reason
    // function for reading update
    // then get the stying done
    // how to display -> should it be a list?
    
    
    
    return (
        <View>
        <Text>Out of Order Complaints</Text>
        <View>
            {complaints.map((entry, index) => (
                <Text key = {index}>
                    {entry.date.toDateString()} - {entry.complaint}
                </Text>
            ))}
        </View>
        </View>
    )

}

export default OutOfOrderDisplay