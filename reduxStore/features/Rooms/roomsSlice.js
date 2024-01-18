import { createSlice } from "@reduxjs/toolkit";


const roomsSlice = createSlice({
    name:"rooms",
    initialState:[],
    reducers:{
        fromServer:(state,action)=>{
            const {roomId,users} = action.payload
            const exinstingRoom = state.find(room=>room.id === roomId)
            if(!exinstingRoom){
                state.push({id:roomId,users})
            }else{
                const updatedRoom = state.map(room=>{
                    if(roomId === room.id){
                        room.users = [...users]
                    }
                    return room
                })

                for(let i=0;i<updatedRoom.length;i++){
                    state[i] = updatedRoom[i]
                }
            }
            
        },
        removeRoom:(state,action)=>{
            const {roomId} = action.payload

            return state.filter((room)=>{
                return room.id !==roomId
            })
           
        }
    }
})

export const {fromServer,removeRoom} = roomsSlice.actions

export default roomsSlice.reducer