import { Text, View } from "react-native"
import { useGlobalSearchParams } from "expo-router"
import StateForm from "../../Components/stateForm"

const WasherPage = () => {
  const linkData = useGlobalSearchParams()
  const building: string = linkData.Building?.toString()!
  const washer: string = linkData.id!.toString()
  const title = building + " " + washer
  return (
    <View>
      <Text style={{ fontSize: 30 }}>{title}</Text>
      <StateForm building={building} machine={washer} />
    </View>
  )
}

export default WasherPage
