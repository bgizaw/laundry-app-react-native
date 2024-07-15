import { StyleSheet } from "react-native"


const styles = StyleSheet.create({
  container: {
    // backgroundColor: "gray",
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingBottom: 35
  },
  imageContainer: {
    // backgroundColor: "green",
  },
  buildingLink: {
    backgroundColor: "pink",
    // width: 160,
    // height: 160,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  
  },
  buildingLogo: {
    padding: 10,
    width: 160,
    height: 160,
    marginTop: 20,

  },
  buildingText: {
    fontFamily: 'Jaldi',
    fontWeight: 'bold'
  },

  
})

export default styles
