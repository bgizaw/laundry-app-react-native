import { Text, View, Image } from "react-native"
import { Link, useGlobalSearchParams } from "expo-router"
import StateForm from "../../../Components/stateForm"
import { useFonts } from "expo-font"
import ScannerButton from "../../../../assets/images/scannerButton"

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
    <>
      <View>
        <Text style={{ fontSize: 30 }}>{title}</Text>
        <StateForm building={building} machine={dryer} />
      </View>
      <View
        style={{
          padding: 50,
          flex: 1,
          justifyContent: "flex-end",
          flexDirection: "row",
          backgroundColor: "#FFFFFF",
        }}
      >
        <Link
          href={"../../qrCodeScan/qrCodeScanner"}
          style={{ padding: 30, bottom: 30, left: 20 }}
        >
          <ScannerButton />
        </Link>
      </View>
    </>
  )
}

export default DryerPage
