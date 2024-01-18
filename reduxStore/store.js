import { configureStore,combineReducers } from "@reduxjs/toolkit";
import DrawerReducer from "./features/Drawer/drawerSlice";
import ThemeReducer from "./features/Theme/themeSlice";
import UserReducer from "./features/User/userSlice"
import RoomsReducer from "./features/Rooms/roomsSlice"

const rootReducer = combineReducers({
    drawer:DrawerReducer,
    theme:ThemeReducer,
    user:UserReducer,
    rooms:RoomsReducer
})

export const store = configureStore({
    reducer:rootReducer
})