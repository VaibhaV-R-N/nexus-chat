"use client"
import { Button,Paper,TextField,Stack,Typography } from "@mui/material"
import {useTheme} from "@mui/material/styles"
import { useRef } from "react"
import { useContext,useState } from "react"
import { SocketContext } from "@/context/SocketProvider"
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { setCurrent, setError } from "@/reduxStore/features/User/userSlice"

export default function page() {
    const theme = useTheme()
    const username = useSelector(state=>state.user.username)
    const publicKey = useSelector(state=>state.user.publicKey)
    const color = useSelector(state=>state.user.color)
    const roomid = useRef(null)
    const password = useRef(null)
    const socket = useContext(SocketContext)
    const router = useRouter()
    const dispatch = useDispatch()

    const [form,setForm] = useState({
        roomid:"",
        password:""
    })
    const TextFieldStyle = {
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
        width:{
            [theme.breakpoints.up('sm')]:{
                width:"60%"
            },
            [theme.breakpoints.up('xs')]:{
                width:"80%"
            }
        }
    }

    const handleCreate = ()=>{
    
        socket.emit("createRoom",{username:username,roomId:form.roomid,password:form.password,color,publicKey},(response)=>{
            if(response.ok){
                dispatch(setCurrent({current:form.roomid}))
                router.push("/chats")
            }else{
                dispatch(setError({error:response.error}))
            }
        })
        
    }

    const handleJoin = ()=>{
    
        socket.emit("joinRoom",{username:username,roomId:form.roomid,password:form.password,newuser:false,color,publicKey},(response)=>{
            if(response.ok){
                dispatch(setCurrent({current:form.roomid}))
                router.push("/chats")
            }else{
                dispatch(setError({error:response.error}))
            }
        })
        
    }

    return (
        <div className="w-full h-screen relative">
            <Paper
                sx={{
                    width:{
                        [theme.breakpoints.up("sm")]:{width:"40%"},
                        [theme.breakpoints.up("xs")]:{width:"80%"},

                    },
                    height:"auto",
                    padding:"2em",
                    left:"50%",
                    top:"50%",
                    transform:"translate(-50%,-50%)",
                    position:"relative",
                    backgroundColor:theme.palette.primary.main,
                    border:"1px solid",
                    borderColor:theme.palette.secondary.main,
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"center",
                    gap:"2em",
                    flexDirection:"column",
                    zIndex:1200

                }}
                elevation={9}
            >
                <TextField label="RoomId" type="text" color={"secondary"} ref={roomid} sx={{...TextFieldStyle}} value={form.roomid} onChange={(e)=>{setForm({...form,roomid:e.target.value})}}/>
                <TextField label="Password" type="password" color={"secondary"} ref={password} sx={{...TextFieldStyle}} value={form.password} onChange={(e)=>{setForm({...form,password:e.target.value})}}/>
                <Stack sx={{
                    width:"100%"
                }} direction={"row"} alignItems={"center"} justifyContent={"space-evenly"}>
                    <Button variant="outlined" size="large" color="secondary" onClick={handleCreate}>Create</Button>
                    <Button variant="outlined" size="large" color="secondary" onClick={handleJoin}>Join</Button>
                </Stack>

            </Paper>

            <Typography variant="h5" sx={{
                position:'absolute',
                bottom:"1em",
                zIndex:1200
            }}  textAlign={"center"} color={theme.palette.secondary.main} width={"100%"}>Do not share your personal information with anyone  ⚠️</Typography>

        </div>
    )
}
