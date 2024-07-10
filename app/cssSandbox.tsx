import { Text, View, StyleSheet } from "react-native"

const Sandbox = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textOne}>Hello</Text>
      <Text style={styles.textTwo}>Biruk</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    backgroundColor: "#ddd",
    // flex: 0,
    flexDirection: "row",
  },
  textOne: {
    backgroundColor: "green",
    padding: 10,
  },
  textTwo: {
    backgroundColor: "yellow",
    padding: 10,
  },
})

export default Sandbox
