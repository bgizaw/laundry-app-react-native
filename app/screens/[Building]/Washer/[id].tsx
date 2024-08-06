import { Text, View, Image, Platform } from "react-native"
import { Link, useGlobalSearchParams } from "expo-router"
import StateForm from "../../../Components/stateForm"
import database from "../../../firebase/firestoreInitialize"
import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useFonts } from "expo-font"
import ScannerButton from "../../../../assets/images/scannerButton"
import StateFormWeb from "../../../Components/stateFormCopy"

const WasherPage = () => {
  const linkData = useGlobalSearchParams()
  const building: string = String(linkData.Building!)
  const washer: string = String(linkData.id!)
  // create page title based on url path
  const title = building + " " + washer

  // load fonts
  const [isLoaded] = useFonts({
    "jaldi-bold": require("../../../../assets/fonts/Jaldi-Bold.ttf"),
    "jaldi-regular": require("../../../../assets/fonts/Jaldi-Regular.ttf"),
  })

  if (Platform.OS === "web") {
    return (
      <>
        <View style={{ backgroundColor: "#FFFFFF" }}>
          <Text style={{ fontSize: 30 }}>{title}</Text>
          <StateFormWeb building={building} machine={washer} />
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
  } else {
    return (
      <>
        <View style={{ flex: 4, backgroundColor: "#FFFFFF" }}>
          <Text style={{ fontSize: 30 }}>{title}</Text>
          <StateFormWeb building={building} machine={washer} />
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
}

export default WasherPage
