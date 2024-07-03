import { Text, View } from "react-native"
import { useGlobalSearchParams } from "expo-router"
import data from "../../machineInfo.json"

const buildingObj = data.find(i => i.building === "Clark I")

const DryerPage = () => {
  const linkData = useGlobalSearchParams()
  const building = linkData.Building
  const dryer = linkData.id
  const title = building + " " + dryer

  return (
    <View>
      <Text style={{ fontSize: 30 }}>{title}</Text>
    </View>
  )
}

export default DryerPage
