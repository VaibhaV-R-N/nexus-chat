'use client'
import { Button, Paper,TextField,Box,Typography } from "@mui/material"
import {useTheme} from "@mui/material/styles"
import {usePathname} from "next/navigation"
import { useSelector,useDispatch } from "react-redux"
import { useState } from "react"
import { setError, setUsername } from "@/reduxStore/features/User/userSlice"
import { setCurrent } from "@/reduxStore/features/User/userSlice"
import { useContext } from "react"
import { SocketContext } from "@/context/SocketProvider"

import { useRouter } from "next/navigation"


export default function Username() {
    const theme = useTheme()
    const nameAvailable = useSelector(state=>state.user.username)
    const publicKey = useSelector(state=>state.user.publicKey)
    const color = useSelector(state=>state.user.color)
    const pathname = usePathname()
    const dispatch = useDispatch()
    const router = useRouter()
    const socket = useContext(SocketContext)
    const show = !nameAvailable && pathname!="/"
    const [name,setName] = useState("")
    const Mode = useSelector(state=>state.theme)
 
    const colorArray = ["#000000","#fafafa","#212121","#ffe082"]

    const submitHandler = ()=>{
        if(name===""){
            dispatch(setError({error:"Username cannot be empty!"}))
            return
        }
   
        socket.emit("joinRoom",{roomId:"public",password:"public",username:name,color:color,newuser:true,publicKey},(response)=>{
            if(response.ok){
                
                setName("")
                dispatch(setCurrent({current:"public"}))
                router.push('/chats')
                dispatch(setUsername({username:name}))
                dispatch(setError({error:"Joining public room... please wait."}))
            }else{
                dispatch(setError({error:response.error}))
            }
        })
        
        
    }
    
    const component = show? (<Box sx={{
        width:"100%",
        height:"100vh",
        backgroundColor:colorArray[Mode],
        position:"fixed",
        zIndex:1211

    }}>
        <Paper sx={{
            [theme.breakpoints.up('sm')]:{
                width:"40%",
                height:"40%"
            },
            [theme.breakpoints.up('xs')]:{
                width:"70%",
                height:"40%"
            },
            
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            flexDirection:"column",
            gap:"2em",
            left:"50%",
            top:"50%",
            transform:"translate(-50%,-50%)",
            position:'relative',
            backgroundColor:theme.palette.primary.main,
            // border:"1px solid",
            // borderColor:theme.palette.secondary.main,
            zIndex:1203
            
        }}>
           <Typography variant="h6" textAlign={"center"} color={theme.palette.secondary.main} width={"100%"}>Please enter a username.</Typography>

            <TextField label="username" sx={{width:"80%",
                '& .MuiInputBase-input':{
                    color:theme.palette.secondary.main
                },
                '& .MuiInputLabel-root':{
                    color:theme.palette.secondary.dark
                },
                '& .MuiInput-underline:before':{
                    borderBottomColor:theme.palette.secondary.main
                },
                '& .MuiInput-underline:after':{
                    borderBottomColor:theme.palette.secondary.main
                },
                '& .MuiOutlinedInput-root':{
                    '& fieldset':{
                        borderColor:theme.palette.secondary.dark
                    },
                    '&:hover fieldset':{
                        borderColor:theme.palette.secondary.light
                    },
        
                },
                zIndex:1211
        }} onChange={(e)=>{setName(e.target.value)}} value={name} color="secondary"/>
            <Button variant='outlined' color="secondary" size="large" sx={{textTransform:"none"}} onClick={submitHandler}>Submit</Button>
        </Paper>
    </Box>):null

        return component

}
