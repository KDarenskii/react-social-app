import { createAsyncThunk } from "@reduxjs/toolkit";
import NotificationService from "../../../service/NotificationService";

export const deleteNotification = createAsyncThunk<string, string>(
    "notifications/deleteNotification",
    async function (id) {
        await NotificationService.remove(id);
        return id;
    }
);
