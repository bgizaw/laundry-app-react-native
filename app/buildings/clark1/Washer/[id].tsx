// import { Text, View } from "react-native"
// import { useLocalSearchParams } from "expo-router"
// import data from "../../machineInfo.json"
// import { getDocs } from "firebase/firestore"
// import collectionRef from "../firestoreCollectionAccess"

// // get collection data
// getDocs(collectionRef)
//   .then(snapshot => {
//     let buildings = [] as { [field: string]: any }
//     snapshot.docs.forEach(doc => {
//       buildings.push({ ...doc.data(), id: doc.id })
//     })
//     console.log(
//       buildings.find((i: { washerNum: string }) => i.washerNum === "Washer 2")
//     )
//   })
//   .catch(err => {
//     console.log(err.message)
//   })

// const buildingObj = data.find(i => i.building === "Clark I")

// const Clark1WasherPage = () => {
//   const { id } = useLocalSearchParams()
//   console.log(id)
//   return (
//     <View>
//       <Text style={{ fontSize: 30 }}>
//         {buildingObj?.building} {id}
//       </Text>
//     </View>
//   )
// }

// export default Clark1WasherPage
