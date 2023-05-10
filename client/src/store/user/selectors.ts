import { RootState } from "..";

export const selectUserError = (state: RootState) => state.user.error;
export const selectUser = (state: RootState) => state.user.user;
export const selectIsAuth = (state: RootState) => state.user.isAuth;
export const selectUserIsLoading = (state: RootState) => state.user.isLoading;
export const selectFriendById = (state: RootState, friendId: string) =>
    state.user.user.friends.find((friend) => friend === friendId) ?? null;
export const selectFollowingById = (state: RootState, followingId: string) =>
    state.user.user.followings.find((following) => following === followingId) ?? null;
export const selectRequestById = (state: RootState, requestId: string) =>
    state.user.user.requests.find((request) => request === requestId) ?? null;
