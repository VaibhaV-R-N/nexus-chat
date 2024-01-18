'use client'
import { Drawer, Stack, Toolbar,Button,Divider, IconButton } from "@mui/material"
import { useSelector,useDispatch } from "react-redux"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material/styles"
import HomeIcon from '@mui/icons-material/Home';
import CreateIcon from '@mui/icons-material/Create';
import ChatIcon from '@mui/icons-material/Chat';
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';
import { usePathname, useRouter } from "next/navigation"
import { setCurrent } from "@/reduxStore/features/User/userSlice"
import { toggleOpen } from "@/reduxStore/features/Drawer/drawerSlice"
import LogoutIcon from '@mui/icons-material/Logout';
import { SocketContext } from "@/context/SocketProvider"
import { useContext, useEffect, useState } from "react"


export default function MuiDrawer() {
    let open = useSelector((state)=>state.drawer.open)
    let [rooms,setRooms] = useState([]) 
   
    const changed =  useSelector(state=>state.user.changed)

    const current = useSelector(state=>state.user.current)
    const dispatch = useDispatch()
    const theme = useTheme()
    const greaterThan500 = useMediaQuery('(min-width:900px)')
    const router = useRouter()
    const pathname = usePathname()
    const username = useSelector(state=>state.user.username)
    const socket = useContext(SocketContext)
    let drawer = null

    useEffect(()=>{
        if(typeof localStorage !==undefined){
            setRooms(JSON.parse(localStorage.getItem('Rooms')))
        }
    },[changed])

    const clickhandler = (route)=>{
        router.push(route)
        if(!greaterThan500)
            dispatch(toggleOpen())
    }

    const leaveRoomHandler = (roomId)=>{
        if(typeof localStorage !==undefined){
            const prevrooms = JSON.parse(localStorage.getItem('Rooms'))
            const updatedrooms = prevrooms.filter(room=>{
                return room.id !== roomId
            })
            localStorage.setItem("Rooms",JSON.stringify(updatedrooms))
            setRooms(updatedrooms)
        }
        dispatch(setCurrent({current:"public"}))
        socket.emit("leaveRoom",{roomId,username})
    }
    
    if(greaterThan500){
        if(pathname==='/chats' && username!=="")
            drawer= (<Drawer 
                variant="temporary"
                anchor="left"
                open={greaterThan500?greaterThan500:open}
                hideBackdrop
                ModalProps={{
                    disableEscapeKeyDown: true,
                    disableEnforceFocus:true
                  }}
                  disableEnforceFocus
                PaperProps={{
                    sx:{
                        width:greaterThan500?250:"100%",
                        backgroundColor:theme.palette.primary.main,
                        zIndex:1201,
                        borderRight:"1px solid",
                        borderColor:theme.palette.secondary.main,
                        boxShadow:0
                    }
                }}
                
            >
                <Toolbar/>
                {greaterThan500?null:<Stack
                    alignItems="flex-start"
                    justifyContent={"center"}
                    gap={2}
        
                    sx={{
                        width:"100%",
                        height:"auto",
                        padding:"1em"
                    }}
                >
                    <Button sx={{
                                    textTransform:"none"
                                }} startIcon={<HomeIcon/>} variant="text"  color={pathname==="/"?"success":"secondary"} size="large"
                                    onClick={()=>{clickhandler('/')}}
                                >Home</Button>
                                <Button sx={{
                                    textTransform:"none"
                                }} startIcon={<CreateIcon/>} variant="text"  color={pathname==="/connect"?"success":"secondary"} size="large"
                                onClick={()=>{clickhandler('/connect')}}
                                >Create/Join</Button>
                                <Button sx={{
                                    textTransform:"none"
                                }} startIcon={<ChatIcon/>} variant="text"  color={pathname==="/chats"?"success":"secondary"} size="large"
                                onClick={()=>{clickhandler('/chats')}}
                                >Chats</Button>
                                <Divider sx={{color:theme.palette.secondary.dark}} flexItem>Rooms</Divider>
                </Stack>
                            
                }
                <Divider sx={{color:theme.palette.secondary.dark}} flexItem>Rooms</Divider>
                <Stack
                    direction={"column"}
                    gap={1}
                    alignItems={"center"}
                    padding={1}
                    height={"50vh"}
                    width={"100%"}
                    sx={{
                        overflowY:"scroll"

                    }}

                >
                    {
                        rooms?.map((room)=>{
                            const roomName = room.id
                            return <Stack width={"100%"} 
                            alignItems={"center"}
                            justifyContent={"space-between"}
                            direction={"row"}
                            key={room.id}
                        >
                            <Button key={room.id} sx={{
                           
                                textTransform:"none"
                                }} startIcon={roomName==="public"?<PublicIcon/>:<LockIcon/>} variant="text"  color={current===room.id?"success":"secondary"} size="large"
                                onClick={()=>{dispatch(setCurrent({current:room.id}))}}
                            >{room.id}</Button>
                            {
                                    room.id!=="public"?
                                    <IconButton size="large" color={current===room.id?"success":"secondary"} onClick={()=>{leaveRoomHandler(room.id)}}>
                                    <LogoutIcon/>
                                    </IconButton>:null
                            }

                        </Stack>
                        })
                    }
                </Stack>
                
            </Drawer>)
    }else{
            drawer = <Drawer 
            variant="temporary"
            anchor="left"
            open={greaterThan500?greaterThan500:open}
            hideBackdrop
            ModalProps={{
               
                disableEscapeKeyDown: true,
                disableEnforceFocus:true
              }}
              
            PaperProps={{
                sx:{
                    width:greaterThan500?250:"100%",
                    backgroundColor:theme.palette.primary.main,
                    zIndex:1202,
                    borderRight:greaterThan500?"1px solid":"none",
                    borderColor:theme.palette.secondary.main,
                    boxShadow:0
                }
            }}
            
        >
            <Toolbar/>
            
            {greaterThan500?null:<Stack
                alignItems="flex-start"
                justifyContent={"center"}
                gap={2}
    
                sx={{
                    width:"100%",
                    height:"auto",
                    padding:"1em"
                }}
            >
                <Button sx={{
                                textTransform:"none"
                            }} startIcon={<HomeIcon/>} variant="text"  color={pathname==="/"?"success":"secondary"} size="large"
                                onClick={()=>{clickhandler('/')}}
                            >Home</Button>
                            <Button sx={{
                                textTransform:"none"
                            }} startIcon={<CreateIcon/>} variant="text"  color={pathname==="/connect"?"success":"secondary"} size="large"
                            onClick={()=>{clickhandler('/connect')}}
                            >Create/Join</Button>
                            {/* <Button sx={{
                                textTransform:"none"
                            }} startIcon={<ChatIcon/>} variant="text"  color={pathname==="/chats"?"success":"secondary"} size="large"
                            onClick={()=>{clickhandler('/chats')}}
                            >Chats</Button> */}
                            
            </Stack>
                        
            }
            <Divider sx={{color:theme.palette.secondary.dark}} flexItem>Rooms</Divider>
            <Stack
                    direction={"column"}
                    gap={1}
                    alignItems={"center"}
                    padding={1}
                    height={"50vh"}
                    width={"100%"}
                    sx={{
                        overflowY:"scroll"

                    }}

                >
                    {
                        rooms?.map((room)=>{
                            const roomName = room.id

                            return <Stack width={"100%"} 
                                alignItems={"center"}
                                justifyContent={"space-between"}
                                direction={"row"}
                                key={room.id}
                            >
                                <Button key={room.id} sx={{
                                
                                    textTransform:"none"
                                    }} startIcon={roomName==="public"?<PublicIcon/>:<LockIcon/>} variant="text"  color={current===room.id && pathname ==="/chats"?"success":"secondary"} size="large"
                                    onClick={()=>{dispatch(setCurrent({current:room.id}))
                                                dispatch(toggleOpen())
                                                router.push("/chats")
                                }}
                                >{room.id}</Button>
                                {
                                    room.id!=="public"?
                                    <IconButton size="large" color={current===room.id && pathname ==="/chats"?"success":"secondary"} onClick={()=>{leaveRoomHandler(room.id)}}>
                                    <LogoutIcon/>
                                    </IconButton>:null
                                }


                            </Stack>
                        })
                    }
                </Stack>
        </Drawer>
    }
    return drawer
}
