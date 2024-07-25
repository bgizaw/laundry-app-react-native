import React, { useState, useEffect } from "react"
import { Text, View, StyleSheet, Button, Linking } from "react-native"
import { CameraView, Camera, BarcodeScanningResult } from "expo-camera"
import { useRouter } from "expo-router"

function QrCodeScanner() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [scanned, setScanned] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === "granted")
    }

    getCameraPermissions()
  }, [])

  // everything I want to happen when qr code is scanned
  const handleBarCodeScanned = (type: string, data: string) => {
    if (!scanned) {
      setScanned(true)
      // alert(`Bar code with type ${type} and data ${data} has been scanned!`)

      const url = new URL(data)
      const pathSegments = url.pathname.split("/").filter(Boolean)

      if (pathSegments.length >= 3) {
        const [building, machineType, machineId] = pathSegments.slice(-3)
        router.push(`../${building}/${machineType}/${machineId}`)
      } else {
        alert("Invalid QR Code")
      }
    }
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={({ type, data }) => handleBarCodeScanned(type, data)}
        // onBarcodeScanned={({type, data}) => console.log(type, data)}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
})

export default QrCodeScanner
