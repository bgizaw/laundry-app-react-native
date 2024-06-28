import { Text, View } from "react-native"
import { useLocalSearchParams } from "expo-router"
import data from "../machineInfo.json"
import { getDocs, addDoc } from "firebase/firestore"
// import collectionRef from "../firestoreCollectionAccess"

// get collection data
// getDocs(collectionRef)
//   .then(snapshot => {
//     let washers = [] as { [field: string]: any }
//     snapshot.docs.forEach(doc => {
//       washers.push({ ...doc.data(), id: doc.id })
//     })
//     console.log(
//       washers.find((i: { washerNum: string }) => i.washerNum === "Washer 2")
//     )
//   })
//   .catch(err => {
//     console.log(err.message)
//   })

const buildingObj = data.find(i => i.building === "Clark I")

const Clark1WasherPage = () => {
  const { id } = useLocalSearchParams()

  return (
    <View>
      <Text style={{ fontSize: 30 }}>
        {buildingObj?.building} {id}
      </Text>
    </View>
  )
}

export default Clark1WasherPage
