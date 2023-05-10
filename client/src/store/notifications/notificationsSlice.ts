import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { INotification } from "../../models/Notification";
import { fetchNotifications } from "./thunks/fetchNotifications";
import { postNotification } from "./thunks/postNotification";
import { deleteNotification } from "./thunks/deleteNotification";
import { deleteAllNotifications } from "./thunks/deleteAllNotifications";

interface NotificationsState {
    list: INotification[];
}

const initialState: NotificationsState = {
    list: [],
};

const notificationsSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        addNotification(state, action: PayloadAction<INotification>) {
            state.list.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.list = action.payload;
            })
            .addCase(postNotification.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(deleteNotification.fulfilled, (state, action) => {
                state.list = state.list.filter((notice) => notice.id !== action.payload);
            })
            .addCase(deleteAllNotifications.fulfilled, (state, action) => {
                state.list = [];
            });
    },
});

export const { addNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;
