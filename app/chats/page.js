'use client'
import { Box,TextField,IconButton,Stack, Toolbar,InputAdornment } from "@mui/material"
import {useTheme} from "@mui/material/styles"
import SendIcon from '@mui/icons-material/Send';
import useMediaQuery from "@mui/material/useMediaQuery"
import { useSelector,useDispatch } from "react-redux";
import Message from "@/components/Message";
import { useRef,useEffect, useMemo } from "react";
import { setError, setImage, setMessage } from "@/reduxStore/features/User/userSlice";
import { SocketContext } from "@/context/SocketProvider";
import { useContext,useState } from "react";
import { getNewMessage } from "@/utils/chatObjects";
import ImageIcon from '@mui/icons-material/Image';

export default function ChatsPage() {
    const theme = useTheme()
    const greaterThan500 = useMediaQuery('(min-width:500px)')
    const current = useSelector(state=>state.user.current)
    const message = useSelector(state=>state.user.message)
    const image = useSelector(state=>state.user.image)
    const [filename,setFileName] = useState("")
    const mycolor = useSelector(state=>state.user.color)
    let [rooms,setRooms] = useState([])  
    let room = rooms.find((room)=>{
      return room.id === current
    })

    const changed = useSelector(state=>state.user.changed)
    const username = useSelector(state=>state.user.username)
    const socket  = useContext(SocketContext)
    const chatref = useRef()
    const inputref = useRef()
    const dispatch = useDispatch()

    useEffect(()=>{
      chatref.current.scrollTop = chatref.current.scrollHeight
    },[rooms])

    useEffect(()=>{
      if(typeof localStorage !== undefined){
        setRooms(JSON.parse(localStorage.getItem("Rooms")))

      }
      
    },[changed,current])

    const generateMessages = useMemo(()=>{
       return room?.messages.map((message,i)=>{
        let file = undefined
        if(message.file){
          
          file = JSON.parse(message.file);
         
        }
        
        return <Message key={i} self={message.username === username} username={message.username} message={message.content} color={message.color} datetime={message.datetime} file={file}/>
      
        }).filter(component=>component)

    },[room?.messages,username])

    const sendMessage = async()=>{

      if(message){
        if(message === filename){
          const newMessage = await getNewMessage(username,message,mycolor,image,current)
         
          socket.emit("fromClient",{roomId:current,message:newMessage})
          dispatch(setMessage({message:""}))
          dispatch(setImage({image:undefined}))
          setFileName("")
          dispatch(setError({error:"Sending Image..."}))
        
        }
        else{
          const newMessage = await getNewMessage(username,message,mycolor,undefined,current)
          socket.emit("fromClient",{roomId:current,message:newMessage})
          dispatch(setMessage({message:""}))
          dispatch(setImage({image:undefined}))
          setFileName("")
        }
      }

      
    }

    const imageSelectionHandler = ()=>{
      inputref.current.showPicker()
    }

    const getJsonifiedImage = (file)=>{

      return new Promise((resolve,reject)=>{
          const reader  = new FileReader()
          reader.onload=(e)=>{
              const base64string = e.target.result
              const dataObject = {filename:file.name,mimetype:file.type,data:base64string}
              resolve(JSON.stringify(dataObject))
          
          }
          reader.onerror = (e)=>{
              reject(e)
          }
          reader.readAsDataURL(file)
      })
 
    }

    const selectedImgSetupHandler = async(e)=>{
      const img = e.target.files[0]
      const filename = img.name
      const types = ["image/jpg","image/jpeg","image/png","image/gif"]
      const mimetype = types.find((type)=>{
        return type === img.type
      })
      if(img.size > 3000000){
        dispatch(setError({error:"Image size exceeds the allowed size which is 3MB..."}))
        dispatch(setImage({image:undefined}))
        setFileName("")
      }else if(!mimetype){
        dispatch(setError({error:"Filetype is not supported!"}))
        dispatch(setImage({image:undefined}))
        setFileName("")
      }else{
        const jsnimg = await getJsonifiedImage(img)
     
        dispatch(setImage({image:jsnimg}))
        setFileName(filename)
        dispatch(setMessage({message:filename}))
      }
    }

    return (
      <>
      <Toolbar/>
      <Box sx={{
        display:"flex",
        alignItems:"center",
        flexDirection:"column",
        justifyContent:"space-evenly",
        position:"relative",
        [theme.breakpoints.up('lg')]:{
          width:"82%",
          left:"18%",
          height:"89vh",
        },
        [theme.breakpoints.up('xs')]:{
          width:"100%",
          left:0,
          height:"93vh",
        },
        zIndex:greaterThan500?1201:1200
      }} > 
          <Stack sx={{
            width:"90%",
            height:"80%",
            overflowY:"scroll",
      
           
          }}
          direction={"column"}
          ref={chatref}
          gap={4}
          >
            {

              generateMessages

            }
          </Stack>
          
            <TextField multiline rows={2} sx={{
              width:"90%",
              height:"auto",
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
            }} label={"Type something..."}
              color="secondary"
              InputProps={{
                endAdornment:(<InputAdornment position="end">
                <IconButton size="large" onClick={async()=>await sendMessage()}><SendIcon color="secondary" sx={{width:"1.2em",height:"1.5em"}}  /></IconButton>
                </InputAdornment>),
                startAdornment:(
                  <InputAdornment position="start">
                  <IconButton size="large" color="secondary" onClick={imageSelectionHandler} ><ImageIcon sx={{width:"1.5em",height:"1.5em"}} /></IconButton>
                  <input type="file"  onChange={async(e)=>{await selectedImgSetupHandler(e)}} ref={inputref} accept="image/png, image/jpg, image/jpeg, image/gif" className="hidden"/>
                  </InputAdornment>
                )
              }}
              value={message}
              onChange={(e)=>{dispatch(setMessage({message:e.target.value}))}}
            />
            
          
      </Box>
      </>
    )
}

