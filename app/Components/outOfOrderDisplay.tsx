import database from "../firebase/firestoreInitialize"
import { doc, onSnapshot, collection } from "firebase/firestore"
import { Text, View, StyleSheet } from "react-native"
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

    const complaintName = (complaint: string) => {
        if (complaint == "missingClothes"){
            return "Clothes went missing"
        }
        else if (complaint == "odor"){
            return "Clothes have an odor"
        }
        else if (complaint == "blockedOffNote"){
            return "Machine is blocked off"
        }
        else if (complaint == "didntDry"){
            return "Clothes didn't fully dry"
        }
        else if (complaint == "burnt"){
            return "Clothes were burnt"
        }
        else {
            return ""
        }
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
                        const twoWeeks = 2 * 7 * 24 * 60 * 60 * 1000
                        const timeDiff = (new Date().getTime()) - doc.data().dates[i].toDate().getTime()
                        if (timeDiff < twoWeeks){
                            updateComplaints.push({date: doc.data().dates[i].toDate(), complaint: complaintName(doc.id)})
                        }
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
        <Text style={styles.title}> Out of Order Complaints </Text>
        <View style={styles.list}>
            {complaints.map((entry, index) => (
                <Text key = {index}>
                    <Text style={styles.date}>{entry.date.toDateString()}:  </Text>
                    <Text style={styles.complaint}>{entry.complaint}</Text>
                </Text>
            ))}
        </View>
        </View>
    )

}

const styles = StyleSheet.create({
    // container: {
    //     padding: 20
    // },
    title: {
        color: "#FF8A00",
        fontSize: 30,
        fontFamily: "jaldi-bold",
        // padding: 20
        paddingTop: 20,
        paddingLeft: 20

    },
    list: {
        backgroundColor: 'rgba(255, 138, 0, 0.1)',
        // padding: 20,
        paddingTop: 10,
        paddingLeft: 27,
        paddingBottom: 20
    },
    date: {
        color: "#FF8A00",
        fontSize: 22,
        fontFamily: "jaldi-bold"
    },
    complaint: {
        fontFamily: "jaldi-regular",
        fontSize: 18
    }


})

export default OutOfOrderDisplay