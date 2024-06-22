import { Text, View } from "react-native"
import { useLocalSearchParams } from "expo-router"
import data from "../../machineInfo.json"

const buildingObj = data.find(i => i.building === "Clark I")

const Clark1DryerPage = () => {
  const { id } = useLocalSearchParams()

  return (
    <View>
      <Text style={{ fontSize: 30 }}>
        {buildingObj?.building} {id}
      </Text>
    </View>
  )
}

export default Clark1DryerPage
