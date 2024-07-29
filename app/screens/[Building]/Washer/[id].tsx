import { Text, View, Image } from "react-native"
import { Link, useGlobalSearchParams } from "expo-router"
import StateForm from "../../../Components/stateForm"
import database from "../../../firebase/firestoreInitialize"
import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useFonts } from "expo-font"
import ScannerButton from "../../../../assets/images/scannerButton"

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

  return (
    <>
      <View>
        <Text style={{ fontSize: 30 }}>{title}</Text>
        <StateForm building={building} machine={washer} />
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

export default WasherPage
