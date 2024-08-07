import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingBottom: 35,
    paddingTop: 0,
  },

  machineLink: {
    // backgroundColor: "pink",
    margin: 10,
  },
  machineLogo: {},
  machineText: {
    fontWeight: "bold",
    fontSize: 19,
    color: "#000000",
    textAlign: "center",
    // backgroundColor: 'red'
  },
  laundryRoomTitle: {
    fontSize: 30,
    backgroundColor: "#FFFFFF",
    textAlign: "center",
    fontFamily: "jaldi-bold",
  },
})

export default styles
