import { Link } from "expo-router"
import { Text, View } from "react-native"
import data from "./buildings/machineInfo.json"

for (let buildingIndex = 0; buildingIndex <= data.length; buildingIndex++) {
  let currentBuilding = data[buildingIndex]
}

// const ListofBuildings = data.map(building => {
//     return (
//       <Link
//         href={{
//           pathname: "buildings/[id]",
//           params: { id: building },
//         }}
//         key={building}
//       >
//         {building}
//       </Link>
//     )
//   })

const Homepage = () => {
  return (
    <View>
      <Text style={{ fontSize: 30 }}>Buildings</Text>
      <Link href="buildings/clark1">Clark I</Link>
    </View>
  )
}

console.log(Homepage)

export default Homepage
