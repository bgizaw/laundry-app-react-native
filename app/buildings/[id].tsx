import { Link, useLocalSearchParams } from "expo-router"
import { Text, View } from "react-native"
import data from "./machineInfo.json"
import Building from "../buildingName"

// goes here after user presses the building they want

// make a function to create a folder if it already does not exisit

// create object from json file and create usable variables based on the data
// const {id} = useLocalSearchParams<{id: string }>()

console.log(window.location.pathname.split('/'))
const currBuilding = window.location.pathname.split('/')[2];
Building.updateBuildingName(currBuilding);
console.log(currBuilding)
// console.log(currentUrl)
// const currBuilding = Building.buildingName // curr building is what the user chose
console.log("static variable check" + Building.buildingName)
console.log("curr building: " + currBuilding) // curr building is null

// const newFolder = (currBuilding) => {
  
// }

const buildingObj = data.find(i => i.building === currBuilding)! // saves stuff from json file
if (!buildingObj) {
  console.error(`Building ${currBuilding} not found in data.`);
} else {
  console.log("Building: " + buildingObj.building);
  console.log("Washer num: " + buildingObj.washers);
  console.log("Dryer num: " + buildingObj.dryers);
}

// console.log("building " + buildingObj.building)
// console.log("washer num" + buildingObj.washers)
// console.log("dryer num" + buildingObj.dryers)
const numberOfWashers: number = 4 //buildingObj.washers 
const numberOfDryers: number = 4 // buildingObj.dryers 
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
        pathname: "buildings/building/" + currBuilding + "/building/Washer/[id]",
        params: { id: washer },
      }}
      key={washer}
    >
      {washer}
    </Link>
  )
})

const ListDryerLinks = dryers.map(dryer => {
  return (
    <Link
      href={{
        pathname: "buildings/" + currBuilding + "/Dryer/[id]",
        params: { id: dryer },
      }}
      key={dryer}
    >
      {dryer}
    </Link>
  )
})

const BuildingPage = () => {
  return (
    <View>
      <Text style={{ fontSize: 30 }}>{ currBuilding }</Text>
      <Text style={{ fontSize: 20 }}>Washers</Text>
      {ListWasherLinks}
      <Text style={{ fontSize: 20 }}>Dryers</Text>
      {ListDryerLinks}
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
