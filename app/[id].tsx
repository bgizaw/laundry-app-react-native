import { Link, useLocalSearchParams } from "expo-router"
import { Text, View } from "react-native"
import data from "./machineInfo.json"
import {
  CollectionReference,
  DocumentData,
  collection,
  getDocs,
} from "firebase/firestore"
import database from "./firebase/firestoreInitialize"
import Building from "./Classes/Building"

// create object from json file and create usable variables based on the data
// const currBuilding = Building.buildingName

// const buildingObj = data.find(i => i.building === currBuilding)!
// const numberOfWashers: number = buildingObj.washers && buildingObj.washers
// const numberOfDryers: number = buildingObj.dryers && buildingObj.dryers
// const washers: string[] = []
// const dryers: string[] = []

// // populate washer and dryer arrays
// for (let washerIndex = 1; washerIndex <= numberOfWashers; washerIndex++) {
//   washers.push("Washer " + washerIndex.toString())
// }

// for (let dryerIndex = 1; dryerIndex <= numberOfDryers; dryerIndex++) {
//   dryers.push("Dryer " + dryerIndex.toString())
// }

// create a jsx list of links that each dynamically leads to a page for the specific washer
// const ListWasherLinks = () => {
//   washers.map(washer => {
//     return (
//       <Link
//         href={{
//           pathname: "Washer/[id]",
//           params: { id: washer },
//         }}
//         key={washer}
//       >
//         {washer}
//       </Link>
//     )
//   })
// }

// const ListDryerLinks = dryers.map(dryer => {
//   return (
//     <Link
//       href={{
//         pathname: "buildings/building/" + currBuilding + "/Dryer/[id]",
//         params: { id: dryer },
//       }}
//       key={dryer}
//     >
//       {dryer}
//     </Link>
//   )
// })

const machineCounter = (
  collectionRef: CollectionReference<DocumentData, DocumentData>
) => {
  let washersNum: number = 0
  let dryersNum: number = 0

  async function fetchDocsAndCountMachines() {
    try {
      const querySnapshot = await getDocs(collectionRef)
      let washerCount: number = 0
      let dryerCount: number = 0
      const docs = querySnapshot.docs.map(doc => {
        const machineType = doc.data().machineType
        if (machineType == "washer") {
          washerCount++
        } else if (machineType === "dryer") {
          dryerCount++
        }
      })
      // console.log("numWashers", washerCount)
      // console.log("numDryers", dryerCount)
      // washersNum = washerCount
      // dryersNum = dryerCount
      return await { washerCount, dryerCount }
    } catch (error) {
      console.log("Error:", error)
    }
  }

  // try {
  //   const result = fetchDocsAndCountMachines()
  //   // return {result.washerCount, result.dryerCount}
  //   return result
  // } catch (error) {
  //   console.log("Error:", error)
  // }
  return fetchDocsAndCountMachines()
}

// getDocs(collectionRef).then(snapshot => {
//   snapshot.docs.forEach(doc => {
//     let machineType = doc.data().machineType
//     if (machineType === "washer") {
//       washersNum++
//     } else if (machineType === "dryer") {
//       dryersNum++
//     }
//   })
//   console.log([washersNum, dryersNum])
// })

// console.log("Outside: " + [washersNum, dryersNum])

// })
// .catch(err => {
//   console.log(err.message)
// })
// return WashersNum

const BuildingPage = () => {
  const washers: string[] = []
  const dryers: string[] = []
  let buildingNameObject = useLocalSearchParams()
  let nameOfBuilding = buildingNameObject.id as string

  const TrackBuildingName = (buildingName: string) => {
    let collectionRef = collection(database, buildingName)
    let buildingInstance = new Building(buildingName)
    buildingInstance.database = collectionRef
    return buildingInstance
  }
  // the .then() unpacks the promise returned by machineCounter() and logs it
  machineCounter(TrackBuildingName(nameOfBuilding)!.database!).then(
    machineCount => {
      console.log(machineCount)
    }
    //   for (
    //     let washerId = 1;
    //     washerId <= machineCount?.washerCount!;
    //     washerId++
    //   ) {
    //     buildingInstance!.washersList.push(`Washer ${washerId}`)
    //   }
    //   for (let dryerId = 1; dryerId <= machineCount?.dryerCount!; dryerId++) {
    //     dryers.push(`Washer ${dryerId}`)
    //   }
    // }
  )
  // console.log(buildingInstance!.washersList.length)

  return (
    <View>
      <Text style={{ fontSize: 30 }}>building</Text>
      <Text style={{ fontSize: 20 }}>Washers</Text>
      {/* {ListWasherLinks} */}
      <Link href="/Washer/Washer 1">Washer 1</Link>
      <Text style={{ fontSize: 20 }}>Dryers</Text>
      {/* {ListDryerLinks} */}
    </View>
  )
}

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

export default BuildingPage
