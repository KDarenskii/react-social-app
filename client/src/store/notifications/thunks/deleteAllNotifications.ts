import { createAsyncThunk } from "@reduxjs/toolkit";
import NotificationService from "../../../service/NotificationService";

export const deleteAllNotifications = createAsyncThunk<void, string>(
    "notifications/deleteAllNotifications",
    async function (userId) {
        await NotificationService.removeAll(userId);
    }
);
