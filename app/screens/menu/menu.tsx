import { View, Text } from "react-native"
import { Link } from "expo-router"
import DormAccordion from "./dormAccordion"
import { useFonts } from "expo-font"
import styles from "./menuStyles"

const Menu = () => {
  // load fonts
  const [isLoaded] = useFonts({
    "jaldi-bold": require("../../../assets/fonts/Jaldi-Bold.ttf"),
    "jaldi-regular": require("../../../assets/fonts/Jaldi-Regular.ttf"),
  })
  return (
    <View style={styles.pageContainer}>
      <View style={styles.menuContainer}>
        <Link href={"/"} style={styles.textStyle}>
          Home
        </Link>
        <Link href={"../qrCodeScan/qrCodeScanner"} style={styles.textStyle}>
          Scan
        </Link>
        <DormAccordion />
      </View>
    </View>
  )
}

export default Menu
