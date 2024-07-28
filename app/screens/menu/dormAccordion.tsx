import { View, Text } from "react-native"
import React from "react"
import { List } from "react-native-paper"
import { Link } from "expo-router"
import styles from "./menuStyles"
import database from "../../firebase/firestoreInitialize"

const dorms: string[] = [
  "Clark I",
  "Frary",
  "Clark III",
  "Dialynas",
  "Sontag",
  "Walton",
  "Walker",
  "Harwood",
  "Lyon",
  "Mudd",
  "Blaisdell",
  "Oldenborg",
  "Smiley",
  "Wig",
]

const DormAccordion = () => {
  return (
    <List.Accordion
      title="Dorms"
      id="dorms"
      // style={styles.dormAccordion}
      titleStyle={styles.dormAccordion}
      style={{
        backgroundColor: "#8FCFFE",
      }}
    >
      {dorms.map(dorm => (
        <Link
          href={`/screens/${dorm}`}
          style={styles.accordionItems}
          key={dorm}
        >
          {dorm}
        </Link>
      ))}
    </List.Accordion>
  )
}

export default DormAccordion
