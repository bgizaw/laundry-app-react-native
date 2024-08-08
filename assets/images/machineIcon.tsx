import { doc, onSnapshot } from "firebase/firestore"
import * as React from "react"
import { useEffect, useState } from "react"
import { View } from "react-native"
import CountDown from "react-native-countdown-component"
import Svg, { SvgProps, Rect, Path, Text } from "react-native-svg"
import database from "../../app/firebase/firestoreInitialize"

const MachineIconRect = ({
  width = 92,
  height = 95,
  text,
  building,
  machine,
  ...props
}: SvgProps & {
  width?: number
  height?: number
  text: string
  building: string
  machine: string
}) => {
  const [endTime, setEndTime] = useState<number>(0)

  useEffect(() => {
    const fetchMachineDetails = async () => {
      const machineRef = await doc(database, building, machine)
      onSnapshot(machineRef, snapshot => {
        console.log("before set send time", endTime)
        // use this end time to set the until time for the countdown
        setEndTime(snapshot.data()!.endTime)
        console.log("after set end time", endTime)
        console.log(snapshot.id, snapshot.data())
      })
    }
    fetchMachineDetails()
  }, [])

  const timerLength = endTime - Date.now()

  // scaling factors
  const scaleX = width / 92
  const scaleY = height / 95

  const stateHues = {
    available: "#9BFFBD",
    inUse: "#FF6B6B",
    pending: "#A4A4A4",
    outOfOrder: "#FFB629",
  }

  const stringStateToFillValue = (stringState: string) => {
    if (stringState === "available") {
      return stateHues.available
    } else if (stringState === "in-use") {
      return stateHues.inUse
    } else if (stringState === "out-of-order") {
      return stateHues.outOfOrder
    } else if (stringState === "pending") {
      return stateHues.pending
    }
  }

  const backgroundColor = stringStateToFillValue(text)

  return (
    <View style={{ position: "relative" }}>
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
      </Svg>
      <View
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CountDown
          until={endTime - Date.now()}
          timeToShow={["M", "S"]}
          digitStyle={{
            backgroundColor: backgroundColor,
          }}
          timeLabels={{ m: undefined, s: undefined }}
          showSeparator
          size={width / 10}
          digitTxtStyle={{ fontSize: width / 7, color: "#000000" }}
        />
      </View>
    </View>
  )
}

{
  /* <Text
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
        </Text> */
}

export default MachineIconRect
