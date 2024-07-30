import * as React from "react"
import Svg, { SvgProps, G, Circle, Rect, Path, Defs } from "react-native-svg"

/* SVGR has dropped some elements not supported by react-native-svg: filter */
const ScannerButton = (props: SvgProps) => (
  <Svg width={68} height={68} fill="none" {...props}>
    <G filter="url(#a)">
      <Circle cx={34} cy={30} r={30} fill="#8FCFFE" />
      <Circle cx={34} cy={30} r={29} stroke="#000" strokeWidth={2} />
    </G>
    <Rect
      width={32}
      height={19.474}
      x={18}
      y={21.526}
      fill="#000"
      stroke="#000"
      strokeWidth={2}
      rx={3}
    />
    <Path
      stroke="#fff"
      strokeWidth={1.5}
      d="M40.805 31.263c0 3.774-3.049 6.83-6.805 6.83s-6.806-3.056-6.806-6.83c0-3.773 3.05-6.829 6.806-6.829 3.756 0 6.805 3.056 6.805 6.83Z"
    />
    <Path
      fill="#000"
      stroke="#000"
      d="M27.074 19v3.053a1 1 0 0 0 1 1h12.482a1 1 0 0 0 1-1V19a1 1 0 0 0-1-1H28.074a1 1 0 0 0-1 1Z"
    />
    <Defs></Defs>
  </Svg>
)
export default ScannerButton
