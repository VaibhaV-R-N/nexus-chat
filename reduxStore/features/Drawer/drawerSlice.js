import { createSlice } from "@reduxjs/toolkit";

const drawerSlice = createSlice({
    name:"drawer",
    initialState:{
        open:false
    },
    reducers:{
        toggleOpen : (state)=>{
            state.open = state.open?false:true
        }
    }
})
export const {toggleOpen} = drawerSlice.actions
export default drawerSlice.reducer