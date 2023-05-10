import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/User";
import { registerUser } from "./thunks/registerUser";
import { loginUser } from "./thunks/loginUser";
import { logoutUser } from "./thunks/logoutUser";
import { checkAuth } from "./thunks/checkAuth";
import { followUser } from "./thunks/followUser";
import { unfollowUser } from "./thunks/unfollowUser";
import { postFriend } from "./thunks/postFriend";
import { deleteFriend } from "./thunks/deleteFriend";
import { deleteRequest } from "./thunks/deleteRequest";
import { updateUser } from "./thunks/updateUser";

interface UserState {
    user: IUser;
    isAuth: boolean;
    isLoading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: {} as IUser,
    isAuth: false,
    isLoading: true,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        addRequest(state, action: PayloadAction<string>) {
            state.user.requests.push(action.payload);
        },
        addFriend(state, action: PayloadAction<string>) {
            state.user.friends.push(action.payload);
        },
        addFollowing(state, action: PayloadAction<string>) {
            state.user.followings.push(action.payload);
        },
        removeFollowing(state, action: PayloadAction<string>) {
            state.user.followings = state.user.followings.filter((following) => following !== action.payload);
        },
        removeRequest(state, action: PayloadAction<string>) {
            state.user.requests = state.user.requests.filter((request) => request !== action.payload);
        },
        removeFriend(state, action: PayloadAction<string>) {
            state.user.friends = state.user.friends.filter((friend) => friend !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuth = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                console.log(action);
                state.error = action.error.message ?? "Registration error";
                state.isLoading = false;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuth = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isAuth = false;
                state.user = {} as IUser;
            })
            .addCase(checkAuth.pending, (state) => {
                state.error = null;
                state.isLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuth = true;
                state.user = action.payload;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message?.includes("401") ? null : "Something went wrong";
            })
            .addCase(followUser.fulfilled, (state, action) => {
                state.user.followings.push(action.payload.userId);
            })
            .addCase(unfollowUser.fulfilled, (state, action) => {
                state.user.followings = state.user.followings.filter((following) => following !== action.payload);
            })
            .addCase(postFriend.fulfilled, (state, action) => {
                state.user.requests = state.user.requests.filter((request) => request !== action.payload);
            })
            .addCase(deleteFriend.fulfilled, (state, action) => {
                state.user.friends = state.user.friends.filter((friend) => friend !== action.payload);
            })
            .addCase(deleteRequest.fulfilled, (state, action) => {
                state.user.requests = state.user.requests.filter((request) => request !== action.payload);
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.user = action.payload;
            });
    },
});

export const { addRequest, addFriend, addFollowing, removeFollowing, removeRequest, removeFriend } = userSlice.actions;
export default userSlice.reducer;
