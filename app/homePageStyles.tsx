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
    paddingBottom: 35,
    paddingTop: 15
  },

  buildingLink: {
    // backgroundColor: "pink",
    margin: 10,
  
  },
  buildingLogo: {
    // padding: 10,
    // width: 160,
    // height: 160,

  },
  buildingText: {
    fontWeight: 'bold',
    fontSize: 19,
    color: '#000000',
    textAlign: 'center'
    // backgroundColor: 'red'
  },
  buildingTextContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    // backgroundColor: 'blue',
  },
  buildingTextFrame: {
    // backgroundColor: 'yellow',
    width: 110,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center'
  }

  
})

export default styles
