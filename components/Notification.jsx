'use client'
import { setError } from "@/reduxStore/features/User/userSlice"
import { Snackbar } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { useTheme } from "@mui/material/styles"

export default function Notification() {
    const error = useSelector(state=>state.user.error)
    const theme = useTheme()
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
        color={theme.palette.success.main}
        // sx={{
        //   backgroundColor:theme.palette.success.main,
        //   color:theme.palette.primary.main
        // }}
        open={error!==""}
        autoHideDuration={2000}
        message={error}
        onClose={closeHandler}
    />
  )
}
