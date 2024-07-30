import { StyleSheet, Dimensions, Platform } from "react-native"

let width: number
if (
  Platform.OS === "web" ||
  Platform.OS === "macos" ||
  Platform.OS === "windows"
) {
  width = Dimensions.get("window").width * 0.1
} else {
  width = Dimensions.get("window").width * 0.4
}
console.log(width)

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "gray",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingBottom: 35,
    paddingTop: 15,
  },

  buildingLink: {
    // backgroundColor: "pink",
    margin: 10,
  },
  buildingLogo: {
    width: width,
    height: width,
  },
  buildingText: {
    fontWeight: "bold",
    fontSize: width / 8, // dynamically sizes text to window size
    color: "#000000",
    textAlign: "center",
    // backgroundColor: 'red'
  },
  buildingTextContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    // backgroundColor: 'blue',
  },
  buildingTextFrame: {
    // backgroundColor: "yellow",
    width: width / 1.5,
    height: width / 1.5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    top: 10,
  },
})

export default styles
