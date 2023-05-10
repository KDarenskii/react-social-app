import { createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../../../service/UserService";

interface Params {
    userId: string;
    friendId: string;
}

export const deleteFriend = createAsyncThunk<string, Params>(
    "user/deleteFriend",
    async function ({ userId, friendId }) {
        await UserService.deleteFriend({ userId, friendId });
        return friendId;
    }
);
