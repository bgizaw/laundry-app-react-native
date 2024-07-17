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
    paddingTop: 15,
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
  machineTextContainer: {
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
  machineTextFrame: {
    // backgroundColor: 'yellow',
    width: 110,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  laundryRoomTitle: {
    fontSize: 30,
    backgroundColor: "#FFFFFF",
    textAlign: "center",
    fontFamily: "jaldi-bold",
  },
})

export default styles
