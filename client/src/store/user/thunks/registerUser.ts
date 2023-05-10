import { createAsyncThunk } from "@reduxjs/toolkit";
import { IRegistrationCredentials } from "../../../models/Credentials";
import UserService from "../../../service/UserService";
import { IUser } from "../../../models/User";

export const registerUser = createAsyncThunk<IUser, IRegistrationCredentials>(
    "user/registerUser",
    async function (credentials) {
        const response = await UserService.register(credentials);
        localStorage.setItem("token", response.data.accessToken);
        return response.data.user;
    }
);
