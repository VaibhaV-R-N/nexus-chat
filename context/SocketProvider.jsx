'use client'
import { createContext,useEffect,useState } from "react";
import io from "socket.io-client"
import { useDispatch } from "react-redux";
export const SocketContext = createContext()

import CryptoJS from "crypto-js";
import {setChanged, setError } from "@/reduxStore/features/User/userSlice";


export default function SocketProvider({children}) {
    const [socket,setSocket] = useState()
    const dispatch = useDispatch()
  
  

    useEffect(()=>{

        const sock = io("wss://onyx-time-parka.glitch.me/",{
            headers:{
                "user-agent":"mozilla"
            }
        })
   
        localStorage.setItem("Rooms",JSON.stringify([]))

        sock.on("fromServer",(data)=>{
            
            const {messages,roomId,password} = data
          
            let Rooms = JSON.parse(localStorage.getItem("Rooms"))

            let foundRoom = Rooms.find(room=>room.id===roomId)

            if(!foundRoom){
                if(roomId === "public"){
                    
                    Rooms.push({id:roomId,messages:messages})
                }else{
                    if(messages.username === "Server"){
                        Rooms.push({id:roomId,messages:[messages]})
                    }else{
                      
                        const decrypted = CryptoJS.AES.decrypt(messages.content,process.env.NEXT_PUBLIC_PIKACHU).toString(CryptoJS.enc.Utf8)
                        messages.content = decrypted
                        Rooms.push({id:roomId,messages:[messages]})

                    }
                }
            }else{
                if(roomId === "public"){
                    foundRoom.messages.push(messages[messages.length-1])
                }else{
                    if(messages.username === "Server"){
                        foundRoom.messages.push(messages)
                    }else{
                  
                        const decrypted = CryptoJS.AES.decrypt(messages.content,process.env.NEXT_PUBLIC_PIKACHU).toString(CryptoJS.enc.Utf8)
                        messages.content = decrypted
                        foundRoom.messages.push(messages)
                    }
                }

                Rooms = Rooms.map(room=>{
                    if(room.id===roomId){
                        return foundRoom
                    }
                    return room
                })
            }
            
            try {
                localStorage.setItem("Rooms",JSON.stringify(Rooms))
            } catch (error) {
                localStorage.clear()
                Rooms = Rooms.map(room=>{
                    room.messages = room.messages.filter(msg=>!msg.file)
                    if(room.messages.length>=2)
                        room.messages = [...room.messages.slice(room.messages.length-2,room.messages.length)]
                    return room
                })
                localStorage.setItem("Rooms",JSON.stringify(Rooms))
                dispatch(setError({error:"Clearing some messages..."}))
            }
           

            dispatch(setChanged())

        })

        setSocket(sock)

    },[])

    
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}
