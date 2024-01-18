'use client'
import { Typography,Button, Toolbar } from "@mui/material"
import { useTheme } from  "@mui/material/styles"
import Image from "next/image"
import { useEffect } from "react"
import { useState } from "react"
import { FaLock,FaStar,FaImage } from "react-icons/fa";
import { MdPublic,MdOutlinePublicOff } from "react-icons/md";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Home() {
  const [isClient,setIsClient]= useState(false)
  const greaterThan500 = useMediaQuery("(min-width:900px)")

  useEffect(()=>{
    setIsClient(true)
  },[])

  const getPadding = ()=>{
    return greaterThan500?"200px":"0"
  }
  const theme = useTheme()
  return <div className="w-full h-auto relative z-10 p-2 flex flex-col gap-5 items-center justify-center">
      {isClient?<>
        <Toolbar/>
        <Typography variant="h3" paddingLeft={getPadding()} paddingRight={getPadding()} textAlign={"center"} color="secondary" width={"100%"}>Welcome to <span style={{color:theme.palette.success.main}}>Nexus Chat</span>  Where Connections Take Flight!</Typography>
        <Typography variant="h5" paddingLeft={getPadding()} paddingRight={getPadding()} textAlign={"center"} color="secondary" width={"100%"}><span style={{color:theme.palette.success.main}}>Discover</span>.<span style={{color:theme.palette.success.main}}>Create</span>.<span style={{color:theme.palette.success.main}}>Connect</span>.</Typography>

        <Image alt="group of people" src="/group.png" style={{width:greaterThan500?"25%":"50%"}} className=" h-96 object-contain rounded-xl" width={500} height={500}/>
      </>:null
      }
      <Typography variant="h3" paddingLeft={getPadding()} paddingRight={getPadding()} textAlign={"center"} color={theme.palette.success.main} width={"100%"}>Key Features ✨</Typography>

      <div className="w-full lg:w-1/2 h-auto flex flex-col p-2 gap-20">
        <div style={{border:"1px solid", borderColor:theme.palette.success.main}} className="w-full h-auto flex flex-col p-6 rounded-lg gap-5">
            <div className="w-full h-auto flex  flex-row items-center justify-center gap-2">
                  <FaLock style={{
                    color:theme.palette.success.main
                  }} className="h-18 w-18"/>
                  <p style={{
                    color:theme.palette.success.main
                  }} className="text-3xl text-center">Anonymity</p>
            </div>
            <div className="w-full h-auto flex  flex-row items-center justify-between gap-2">
                  <FaStar style={{
                    color:theme.palette.success.main
                  }} className="h-18 w-18"/>
                  <p style={{
                    color:theme.palette.secondary.main
                  }} className="text-xl w-2/3 text-center ">No database is used hence no data is stored.</p>
            </div>

            <div className="w-full h-auto flex  flex-row items-center justify-between gap-2">
                  <FaStar style={{
                    color:theme.palette.success.main
                  }} className="h-18 w-18"/>
                  <p style={{
                    color:theme.palette.secondary.main
                  }} className="text-xl w-2/3 text-center ">No login is required.</p>
            </div>

            <div className="w-full h-auto flex  flex-row items-center justify-between gap-2">
                  <FaStar style={{
                    color:theme.palette.success.main
                  }} className="h-18 w-18"/>
                  <p style={{
                    color:theme.palette.secondary.main
                  }} className="text-xl w-2/3 text-center ">Private room text messages are encrypted</p>
            </div>
        </div>
        
        <div style={{border:"1px solid", borderColor:theme.palette.success.main}} className="w-full h-auto flex flex-col p-6 rounded-lg gap-5">
            <div className="w-full h-auto flex  flex-row items-center justify-center gap-2">
                  <FaImage style={{
                    color:theme.palette.success.main
                  }} className="h-18 w-18"/>
                  <p style={{
                    color:theme.palette.success.main
                  }} className="text-3xl text-center">Text and Image Sharing</p>
            </div>
            <div className="w-full h-auto flex  flex-row items-center justify-between gap-2">
                
                  <p style={{
                    color:theme.palette.secondary.main
                  }} className="text-xl w-full    text-justify">Express yourself beyond words. Share your favorite memes, cherished moments, or latest discoveries with our seamless text and image sharing feature. Nexus Chat is not just a platform; it&apos;s your canvas for creativity.</p>
            </div>
        </div>
        
        <div style={{border:"1px solid", borderColor:theme.palette.success.main}} className="w-full h-auto flex flex-col p-6 rounded-lg gap-5">
            <div className="w-full h-auto flex  flex-row items-center justify-center gap-2">
                  <MdPublic style={{
                    color:theme.palette.success.main
                  }} className="h-18 w-18"/>
                  <p style={{
                    color:theme.palette.success.main
                  }} className="text-3xl text-center">Public room</p>
            </div>
            <div className="w-full h-auto flex  flex-row items-center justify-between gap-2">
                
                  <p style={{
                    color:theme.palette.secondary.main
                  }} className="text-xl w-full    text-justify">Engage in discussions, share thoughts, or simply hang out with a diverse community of like-minded individuals. Connect with people from all corners of the globe and broaden your horizons.</p>
            </div>
        </div>
        
        <div style={{border:"1px solid", borderColor:theme.palette.success.main}} className="w-full h-auto flex flex-col p-6 rounded-lg gap-5">
            <div className="w-full h-auto flex  flex-row items-center justify-center gap-2">
                  <MdOutlinePublicOff style={{
                    color:theme.palette.success.main
                  }} className="h-18 w-18"/>
                  <p style={{
                    color:theme.palette.success.main
                  }} className="text-3xl text-center">Private room</p>
            </div>
            <div className="w-full h-auto flex  flex-row items-center justify-between gap-2">
                
                  <p style={{
                    color:theme.palette.secondary.main
                  }} className="text-xl w-full  text-justify"> Elevate your chatting experience by creating your private rooms. Invite friends, colleagues, or anyone you want into your exclusive space. Customize the settings to make it your own – it&apos;s like having a virtual living room tailored to your tastes.</p>
            </div>
        </div>
        <Typography variant="h6" textAlign={"center"} color={theme.palette.secondary.main} width={"100%"}>Created by <span style={{color:theme.palette.success.main}}>Vaibhav R Nayak ✨</span></Typography>

      </div>
      
  </div>
}
