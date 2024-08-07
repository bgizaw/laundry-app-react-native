import * as React from "react"
import Svg, { SvgProps, Rect, Path, Text } from "react-native-svg"

const MachineIconRect = ({
  width = 92,
  height = 95,
  text = "unknown",
  ...props
}: SvgProps & { width?: number; height?: number; text?: string }) => {
  // scaling factors
  const scaleX = width / 92
  const scaleY = height / 95

  return (
    <Svg width={width} height={height} fill="none" {...props}>
      <Rect
        width={90 * scaleX}
        height={92.488 * scaleY}
        x={1 * scaleX}
        y={1.512 * scaleY}
        stroke="#000"
        strokeWidth={2 * Math.min(scaleX, scaleY)}
        rx={9 * Math.min(scaleX, scaleY)}
      />
      <Path
        stroke="#000"
        strokeWidth={2 * Math.min(scaleX, scaleY)}
        d={`M${1.078 * scaleX} ${16.752 * scaleY} h${89.844 * scaleX}`}
      />
      <Path
        stroke="#000"
        strokeLinecap="round"
        strokeWidth={7 * Math.min(scaleX, scaleY)}
        d={`M${56.422 * scaleX} ${9.37 * scaleY} h${10.062 * scaleX} M${
          74.75 * scaleX
        } ${9.37 * scaleY} h${10.063 * scaleX}`}
      />
      <Path
        stroke="#000"
        strokeWidth={3 * Math.min(scaleX, scaleY)}
        d={`M${77.563 * scaleX} ${55.51 * scaleY}c0 ${18.186 * scaleY} ${
          -14.184 * scaleX
        } ${32.83 * scaleY} ${-31.563 * scaleX} ${32.83 * scaleY}c${
          -17.379 * scaleX
        } 0 ${-31.563 * scaleX} ${-14.644 * scaleY} ${-31.563 * scaleX} ${
          -32.83 * scaleY
        }c0 ${-18.184 * scaleY} ${14.184 * scaleX} ${-32.83 * scaleY} ${
          31.563 * scaleX
        } ${-32.83 * scaleY}c${17.379 * scaleX} 0 ${31.563 * scaleX} ${
          14.646 * scaleY
        } ${31.563 * scaleX} ${32.83 * scaleY}Z`}
      />
      <Path
        fill="#000"
        stroke="#000"
        strokeLinecap="round"
        strokeWidth={3 * Math.min(scaleX, scaleY)}
        d={`M${33.542 * scaleX} ${74.967 * scaleY}c${-5.26 * scaleX} ${
          1.598 * scaleY
        } ${-12.574 * scaleX} ${-2.219 * scaleY} ${-15.573 * scaleX} ${
          -4.327 * scaleY
        }C${20.724 * scaleX} ${76.668 * scaleY} ${30.187 * scaleX} ${
          88.725 * scaleY
        } ${46 * scaleX} ${88.725 * scaleY}c${15.813 * scaleX} 0 ${
          24.797 * scaleX
        } ${-11.565 * scaleY} ${27.313 * scaleX} ${-17.347 * scaleY}c${
          -2.876 * scaleX
        } ${2.214 * scaleY} ${-9.387 * scaleX} ${6.845 * scaleY} ${
          -17.97 * scaleX
        } ${2.584 * scaleY}c${-10.727 * scaleX} ${-5.327 * scaleY} ${
          -15.226 * scaleX
        } ${-0.992 * scaleY} ${-21.801 * scaleX} ${1.005 * scaleY}Z`}
      />
      <Text
        x={width / 2}
        y={height / 2}
        fontSize={14 * Math.min(scaleX, scaleY)}
        fontWeight="bold"
        fill="#000"
        textAnchor="middle"
        alignmentBaseline="central"
        fontFamily="jaldi-bold"
      >
        {text}
      </Text>
    </Svg>
  )
}

export default MachineIconRect
