import {Card,CardHeader,CardContent,Typography,Avatar,Box, CardMedia} from "@mui/material"

import {useTheme} from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useSelector } from "react-redux"
import { useEffect,useMemo, useState } from "react"

export default function Message({self,message,username,color,datetime,file}) {
    const theme = useTheme()
    const greaterThan500 = useMediaQuery('(min-width:500px)')
    const selfcolor = useSelector(state=>state.user.color)
    const [imgsrc,setimgsrc] = useState("")

    const selfMemo = useMemo(()=>{return self},[self])
    const messageMemo = useMemo(()=>{return message},[message])
    const usernameMemo = useMemo(()=>{return username},[username])
    const colorMemo = useMemo(()=>{return color},[color])
    const datetimeMemo = useMemo(()=>{return datetime},[datetime])
    const fileMemo = useMemo(()=>{return file},[file])

    
    useEffect(()=>{
        if(fileMemo){
           
                setimgsrc(fileMemo.data)

        }
    },[setimgsrc,fileMemo])

  return (
    <Box width={"100%"} height={"auto"}>
        <Card sx={{
            position:"relative",
            padding:"1em",
            width:greaterThan500?"50%":"80%",
            left:greaterThan500?selfMemo?"50%":"0":selfMemo?"20%":"0",
            height:"auto",
            bgcolor:theme.palette.primary.main,
            display:"flex",
            flexDirection:"column",
            alignItems:selfMemo?"flex-end":"flex-start",
            justifyContent:selfMemo?"flex-end":"flex-start",
            borderRadius:"1em",
       
            
        }} elevation={0}>
            <CardHeader sx={{
                width:"auto",
                height:"1em",
                display:"flex",
                flexDirection:"row",
                alignItems:"center",
                justifyContent:"space-evenly",
                color:theme.palette.success.main
            }}
            
            avatar={
                <Avatar src={usernameMemo!=="Server"?null:"/nexus.png"} sx={{bgcolor:`${usernameMemo==="Server"?"":selfMemo?selfcolor:colorMemo}`,color:theme.palette.primary.main}} >{usernameMemo!=="server"?usernameMemo.charAt(0):null}</Avatar>

            }
            
            title={usernameMemo}
            subheader={datetimeMemo}
            subheaderTypographyProps={{
                color:theme.palette.success.main
            }}
            />
            {
                imgsrc?<CardMedia
                image={imgsrc || null}
                sx={{
                    width:"100%",
                    height:"200px",
                    marginTop:"2em"
                }}
                />:null
            }
            <CardContent sx={{
                 width:"100%",
                 height:"auto",
                 display:"flex",
                 direction:"row",
                 alignItems:selfMemo?"flex-end":"flex-start",
                 justifyContent:selfMemo?"flex-end":"flex-start",
                 padding:"5px",
                 marginTop:"1em"
            }}>
                <Typography sx={{
                    display:"inline-block",
                    width:"auto",
                    maxWidth:"100%",
                    height:"auto",
                    textAlign:"left",
                    wordBreak:"break-word",
                    color:theme.palette.secondary.main,
                    border:"1px solid",
                    borderColor:theme.palette.secondary.main,
                    padding:"0.5em",
                    borderRadius:"1.5em"
                }}>{messageMemo}</Typography>
            </CardContent>

        </Card>
    </Box>
    
  )
}
