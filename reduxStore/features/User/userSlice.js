import { createSlice } from "@reduxjs/toolkit";
import { orange,blue,yellow } from "@mui/material/colors"

const userSlice = createSlice({
    name:"user",
    initialState:{
        username:"",
        current:"",
        message:"",
        image:undefined,
        error:"",
        changed:0,
        color:[orange,blue,yellow][Math.floor(Math.random()*3)][[300,400,500,600,700,800,900][Math.floor(Math.random()*6)]]
    },
    reducers:{
        setUsername:(state,action)=>{
            state.username = action.payload.username
            
        },
        setCurrent:(state,action)=>{
            state.current = action.payload.current
        },
        setMessage:(state,action)=>{
            state.message = action.payload.message
        },
        setError:(state,action)=>{
            state.error = action.payload.error
        },
        setPage:(state,action)=>{
            state.page = action.payload.page
        },
        setImage:(state,action)=>{
            const {image} = action.payload
            state.image = image
        },
        setChanged:(state)=>{
            if(state.changed === 100){
                state.changed = 0
            }else{
                state.changed += 1
            }
        }
    }
})


export const {setUsername,setCurrent,setMessage,setError,setImage,setChanged} = userSlice.actions

export default userSlice.reducer

