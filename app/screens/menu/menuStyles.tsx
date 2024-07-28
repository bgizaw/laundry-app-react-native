import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    // alignItems: "center",
    backgroundColor: "#8FCFFE",
    // overflow: "scroll",
  },
  menuContainer: {
    // alignItems: "center",
    // width: 300,
    flex: 1,
    marginTop: 20,
    overflow: "scroll",
  },
  dormAccordion: {
    // width: 300,
    backgroundColor: "#8FCFFE",
    fontFamily: "jaldi-bold",
    fontSize: 31,
    flex: 1,
    marginLeft: 20,
  },
  textStyle: {
    fontSize: 31,
    fontFamily: "jaldi-bold",
    paddingLeft: 37,
    marginTop: 10,
    marginBottom: 10,
  },
  accordionItems: {
    fontSize: 20,
    fontFamily: "jaldi-bold",
    marginLeft: 55,
  },
})

export default styles
