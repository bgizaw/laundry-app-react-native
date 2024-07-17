import { Text, View } from "react-native"
import { useGlobalSearchParams } from "expo-router"
import StateForm from "../../../Components/stateForm"
import { useFonts } from "expo-font"

const DryerPage = () => {
  const linkData = useGlobalSearchParams()
  const building: string = linkData.Building?.toString()!
  const dryer: string = linkData.id!.toString()
  const title = building + " " + dryer

  // load fonts
  const [isLoaded] = useFonts({
    "jaldi-bold": require("../../../../assets/fonts/Jaldi-Bold.ttf"),
    "jaldi-regular": require("../../../../assets/fonts/Jaldi-Regular.ttf"),
  })

  return (
    <View>
      <Text style={{ fontSize: 30 }}>{title}</Text>
      <StateForm building={building} machine={dryer} />
    </View>
  )
}

export default DryerPage
