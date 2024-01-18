'use client'
import { AppBar,Toolbar,Box,Button,IconButton,Stack, Typography } from "@mui/material"
import { toggleOpen } from "@/reduxStore/features/Drawer/drawerSlice";
import { toggleDarkMode } from "@/reduxStore/features/Theme/themeSlice";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles"
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import HomeIcon from '@mui/icons-material/Home';
import CreateIcon from '@mui/icons-material/Create';
import ChatIcon from '@mui/icons-material/Chat';
import MenuIcon from '@mui/icons-material/Menu';

import { useSelector,useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function Navbar() {



    const dispatch = useDispatch()
    const greaterThan500 = useMediaQuery("(min-width:900px)")
    const Mode = useSelector(state=>state.theme)
    const pathname = usePathname()
    const theme = useTheme()
    const router = useRouter()
    const clickhandler = (route)=>{
        router.push(route)
    }

    return (
        <Box display={"flex"} sx={{
            width:"100%",
            height:"auto"
        }}>
            <AppBar sx={{
                width:"100%",
                height:"auto",
                zIndex:1203,
                boxShadow:0
            }}

            position="fixed">
                <Toolbar 
                    sx={{
                        borderBottom:"1px solid",
                        borderColor:theme.palette.secondary.dark,
                        width:"100%",
                        height:"100%"
                    }}
                    
                >
                    <IconButton style={{
                        display:greaterThan500?"none":"block"
                    }} onClick={()=>{dispatch(toggleOpen())}}>
                        <MenuIcon color="secondary" sx={{
                            width:50,
                            height:50
                        }} />
                    </IconButton>
                    <Typography variant={greaterThan500?"h4":"h5"} color={theme.palette.secondary.main} >𝓝𝓮𝔁𝓾𝓼</Typography>
                    <Stack 
                        sx={{
                            width:"100%",
                            height:"100%",
                        }}
                        direction="row"
                        alignItems="center"
                        justifyContent="flex-end"
                        gap={4}
                        width={"100%"}
                    >

                    {greaterThan500?<>
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
                    </>:null}
                        
                        
                        
                        <IconButton  onClick={()=>{dispatch(toggleDarkMode())}}>
                            {Mode%2===0?
                                <LightModeIcon
                                sx={{
                                    width:25,
                                    height:"100%"
                                }}

                                color="secondary"
                                />:<DarkModeIcon
                                sx={{
                                    width:25,
                                    height:"100%"
                                }}

                                color="secondary"
                                />    
                            }
                            
                        </IconButton>
                        
                    </Stack>
                    
                </Toolbar>
            </AppBar>
            
        </Box>
    )
}
