'use client'
import { setError } from "@/reduxStore/features/User/userSlice"
import { Snackbar } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"

export default function Notification() {
    const error = useSelector(state=>state.user.error)
    const dispatch = useDispatch()
    const closeHandler = ()=>{
        dispatch(setError({error:""}))
    }
  return (
    <Snackbar
        anchorOrigin={{
            vertical:"bottom",
            horizontal:"center"
        }}
        
        open={error!==""}
        autoHideDuration={3000}
        message={error}
        onClose={closeHandler}
    />
  )
}
