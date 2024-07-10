import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    backgroundColor: "gray",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    display: "flex",
    overflow: "scroll",
  },
  imageContainer: {
    // flex: 2,
    // marginBottom: 70,
    // marginRight: 50,
    // marginTop: 40,
    alignContent: "center",
    backgroundColor: "green",
  },
  image: {
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  buildingLink: {
    padding: 80,
    backgroundColor: "pink",
    margin: 10,
    flex: 1,
  },
  buildingLogo: {
    // width: 100,
  },
  buildingText: {},
})

export default styles
