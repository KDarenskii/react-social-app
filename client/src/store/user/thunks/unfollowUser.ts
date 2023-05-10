import { createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../../../service/UserService";

type Params = {
    userId: string;
    followId: string;
};

export const unfollowUser = createAsyncThunk<string, Params>("user/unfollowUser", async function ({ userId, followId }) {
    await UserService.unfollow({ userId, followId });
    return followId;
});
