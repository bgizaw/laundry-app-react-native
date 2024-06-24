import { Link, useLocalSearchParams } from "expo-router"
import { Text, View } from "react-native"
import data from "./machineInfo.json"
import Building from "../buildingName"

// create object from json file and create usable variables based on the data
const currBuilding = Building.buildingName

const buildingObj = data.find(i => i.building === currBuilding)!
const numberOfWashers: number = buildingObj.washers && buildingObj.washers
const numberOfDryers: number = buildingObj.dryers && buildingObj.dryers
const washers: string[] = []
const dryers: string[] = []

// populate washer and dryer arrays
for (let washerIndex = 1; washerIndex <= numberOfWashers; washerIndex++) {
  washers.push("Washer " + washerIndex.toString())
}

for (let dryerIndex = 1; dryerIndex <= numberOfDryers; dryerIndex++) {
  dryers.push("Dryer " + dryerIndex.toString())
}

// create a jsx list of links that each dynamically leads to a page for the specific washer
const ListWasherLinks = washers.map(washer => {
  return (
    <Link
      href={{
        pathname: "buildings/" + currBuilding + "/building/Washer/[id]",
        params: { id: washer },
      }}
      key={washer}
    >
      {washer}
    </Link>
  )
})

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

const BuildingPage = () => {
  return (
    <View>
      <Text style={{ fontSize: 30 }}>building</Text>
      <Text style={{ fontSize: 20 }}>Washers</Text>
      {ListWasherLinks}
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
