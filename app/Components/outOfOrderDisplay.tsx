import database from "../firebase/firestoreInitialize"
import { doc, onSnapshot, collection } from "firebase/firestore"
import { Text, View } from "react-native"
import { useState, useEffect } from "react"
 

type props = {
    machineType: string
    building: string
    machine: string
  }

const OutOfOrderDisplay = (props: props) => {

    const [complaints, setComplaints] = useState<Complaint[]>([]);

    interface Complaint {
        date: Date
        complaint: string
    }
    
    // uses onsnapshot to listen to when the out of order collection is updated
    // once it is updated, website reflects the changes with most recent complaint at the top
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
            })

            updateComplaints.sort((a, b) => {
                return b.date.getTime() - a.date.getTime()
            })

            setComplaints(updateComplaints)
        })
        // stops listening to firebase
        return () => unsubscribe()
    }, [])
    
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