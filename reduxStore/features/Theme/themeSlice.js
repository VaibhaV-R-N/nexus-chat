import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name:"theme",
    initialState:0,
    reducers:{
        toggleDarkMode:(state)=>{
            if(state >=3){
                return 0
            }else{
                return state+1
            }
            
        }
    }
})

export const {toggleDarkMode} = themeSlice.actions

export default themeSlice.reducer