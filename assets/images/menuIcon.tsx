import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const MenuIcon = (props: SvgProps) => (
  <Svg width={28} height={37} fill="none" {...props}>
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeWidth={3}
      d="M3 10h22M3 18h22M3 26h22"
    />
  </Svg>
)
export default MenuIcon
