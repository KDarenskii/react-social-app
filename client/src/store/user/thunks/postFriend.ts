import { createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../../../service/UserService";

interface Params {
    userId: string;
    friendId: string;
}

export const postFriend = createAsyncThunk<string, Params>("user/postFriend", async function ({ userId, friendId }) {
    await UserService.postFriend({ userId, friendId });
    return friendId;
});
