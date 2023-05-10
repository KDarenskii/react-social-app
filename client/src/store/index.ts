import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import notificationsReducer from "./notifications/notificationsSlice";

const rootReducer = combineReducers({
    user: userReducer,
    notifications: notificationsReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];

export default store;
