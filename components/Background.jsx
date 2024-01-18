'use client'
import { useSelector } from "react-redux"

export default function Background() {
  const Mode = useSelector(state=>state.theme)
 
  const colorArray = ["#000000","#fafafa","#212121","#ffe082"]
  return (
    <div style={{
      backgroundColor:colorArray[Mode]
    }} className={`w-screen z-0 h-screen fixed`}></div>
  )
}
