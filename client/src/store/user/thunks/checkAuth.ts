import { createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../../../service/UserService";
import { IUser } from "../../../models/User";

export const checkAuth = createAsyncThunk<IUser, void>("user/checkAuth", async function () {
    const response = await UserService.refresh();
    localStorage.setItem("token", response.data.accessToken);
    return response.data.user;
});
