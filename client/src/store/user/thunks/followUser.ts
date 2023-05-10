import { createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../../../service/UserService";
import { INotification, INotificationDto } from "../../../models/Notification";

type Params = {
    userId: string;
    notification: INotificationDto;
};

export const followUser = createAsyncThunk<INotification, Params>(
    "user/followUser",
    async function ({ userId, notification }) {
        const response = await UserService.follow(userId, notification);
        return response.data;
    }
);
