import { createAsyncThunk } from "@reduxjs/toolkit";
import { INotification } from "../../../models/Notification";
import NotificationService from "../../../service/NotificationService";

export const fetchNotifications = createAsyncThunk<INotification[], string>(
    "notifications/fetchNotifications",
    async function (userId) {
        const response = await NotificationService.get(userId);
        return response.data;
    }
);
