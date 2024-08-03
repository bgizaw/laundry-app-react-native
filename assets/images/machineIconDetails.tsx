import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const MachineIconDetails = (props: SvgProps) => (
  <Svg width={92} height={95} fill="none" {...props}>
    <Path stroke="#000" strokeWidth={2} d="M1.078 16.752h89.844" />
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeWidth={7}
      d="M56.422 9.37h10.062M74.75 9.37h10.063"
    />
    <Path
      stroke="#000"
      strokeWidth={3}
      d="M77.563 55.51c0 18.186-14.184 32.83-31.563 32.83-17.379 0-31.563-14.644-31.563-32.83 0-18.184 14.184-32.83 31.563-32.83 17.379 0 31.563 14.646 31.563 32.83Z"
    />
    <Path
      fill="#000"
      stroke="#000"
      strokeLinecap="round"
      strokeWidth={3}
      d="M33.542 74.967c-5.26 1.598-12.574-2.219-15.573-4.327C20.724 76.668 30.187 88.725 46 88.725c15.813 0 24.797-11.565 27.313-17.347-2.876 2.214-9.387 6.845-17.97 2.584-10.727-5.327-15.226-.992-21.801 1.005Z"
    />
  </Svg>
)
export default MachineIconDetails
