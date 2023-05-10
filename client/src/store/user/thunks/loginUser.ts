import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICredentials } from "../../../models/Credentials";
import { IUser } from "../../../models/User";
import UserService from "../../../service/UserService";

export const loginUser = createAsyncThunk<IUser, ICredentials>("user/loginUser", async function (credentials) {
    try {
        const response = await UserService.login(credentials);
        localStorage.setItem("token", response.data.accessToken);
        return response.data.user;
    } catch (error) {
        console.log(error);
        throw error;
    }
});
