import { createAsyncThunk } from "@reduxjs/toolkit";
import { INotification, INotificationDto } from "../../../models/Notification";
import NotificationService from "../../../service/NotificationService";

export const postNotification = createAsyncThunk<INotification, INotificationDto>(
    "notifications/postNotifications",
    async function (notificationData) {
        const response = await NotificationService.add(notificationData);
        return response.data;
    }
);
