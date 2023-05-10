import { createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../../../service/UserService";

interface Params {
    userId: string;
    requestId: string;
}

export const deleteRequest = createAsyncThunk<string, Params>(
    "user/deleteRequest",
    async function ({ userId, requestId }) {
        await UserService.deleteRequests({ userId, requestId });
        return requestId;
    }
);
