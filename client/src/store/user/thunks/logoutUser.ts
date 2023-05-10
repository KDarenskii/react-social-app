import { createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../../../service/UserService";

export const logoutUser = createAsyncThunk<void, void>(
    "user/logoutUser", 
    async function () {
        await UserService.logout();
        localStorage.removeItem("token");
    }
);
