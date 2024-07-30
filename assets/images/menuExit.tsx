import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const MenuExit = (props: SvgProps) => (
  <Svg width={24} height={23} fill="none" {...props}>
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeWidth={3}
      d="M22 2 2 21M2 2l20 19"
    />
  </Svg>
)
export default MenuExit
