import { View, Text } from "react-native"
import React from "react"
import { List } from "react-native-paper"
import { Link } from "expo-router"

/*
Clark I
Frary
Clark III
Dialynas 
Sontag
Walton
Walker
Harwood
Lyon
Mudd
Blaisdell
Oldenborg
Smiley 
Wig
*/

const DormAccordion = () => {
  return (
    <List.AccordionGroup>
      <List.Accordion title="Dorms" id="1" style={{ width: 300 }}>
        <Link href={"/screens/Clark I"}>Clark I</Link>
        <Link href={"/screens/Frary"}>Frary</Link>
        <Link href={"/screens/Clark III"}>Clark III</Link>
        <Link href={"/screens/Dialynas"}>Dialynas</Link>
        <Link href={"/screens/Sontag"}>Sontag</Link>
        <Link href={"/screens/Walton"}>Walton</Link>
        <Link href={"/screens/Walker"}>Walker</Link>
        <Link href={"/screens/Harwood"}>Harwood</Link>
        <Link href={"/screens/Lyon"}>Lyon</Link>
        <Link href={"/screens/Mudd"}>Mudd</Link>
        <Link href={"/screens/Blaisdell"}>Blaisdell</Link>
        <Link href={"/screens/Oldenborg Room 1"}>Oldenborg Room 1</Link>
        <Link href={"/screens/Oldenborg Room 2"}>Oldenborg Room 2</Link>
        <Link href={"/screens/Smiley"}>Smiley</Link>
        <Link href={"/screens/Wig"}>Wig</Link>
      </List.Accordion>
    </List.AccordionGroup>
  )
}

export default DormAccordion
