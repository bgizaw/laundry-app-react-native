import { Text, View } from "react-native"
import { useGlobalSearchParams } from "expo-router"
import StateForm from "../../Components/stateForm"

const DryerPage = () => {
  const linkData = useGlobalSearchParams()
  const building: string = linkData.Building?.toString()!
  const dryer: string = linkData.id!.toString()
  const title = building + " " + dryer

  return (
    <View>
      <Text style={{ fontSize: 30 }}>{title}</Text>
      <StateForm building={building} machine={dryer}/>
    </View>
  )
}

export default DryerPage
