import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../../../models/User";
import UserService from "../../../service/UserService";

type Params = {
    id: string;
    data: FormData;
};

export const updateUser = createAsyncThunk<IUser, Params>("user/updateuser", async function ({ id, data }) {
    const response = await UserService.update({ id, formData: data });
    return response.data;
});
