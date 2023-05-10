import { AxiosRequestConfig, AxiosResponse } from "axios";
import { ICredentials, IRegistrationCredentials } from "../models/Credentials";
import { IAuthResponse } from "../models/response/AuthResponse";
import { api, authApi } from "../api";
import { IUser } from "../models/User";
import { INotification, INotificationDto } from "../models/Notification";

export default class UserService {
    static register = async (
        credentials: IRegistrationCredentials,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<IAuthResponse>> => {
        return authApi.post<IAuthResponse>("/registration", credentials, config);
    };
    static login = async (
        credentials: ICredentials,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<IAuthResponse>> => {
        return authApi.post<IAuthResponse>("/login", credentials, config);
    };
    static logout = async (config?: AxiosRequestConfig): Promise<AxiosResponse<void>> => {
        return authApi.post<void>("/logout", undefined, config);
    };
    static refresh = async (config?: AxiosRequestConfig): Promise<AxiosResponse<IAuthResponse>> => {
        return api.get<IAuthResponse>("/refresh", { withCredentials: true, ...config });
    };
    static getById = async (userId: string, config?: AxiosRequestConfig): Promise<AxiosResponse<IUser>> => {
        return authApi.get<IUser>(`/users/${userId}`, config);
    };
    static update = async (
        { id, formData }: { id: string; formData: FormData },
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<IUser>> => {
        return authApi.put<IUser>(`/users/${id}`, formData, config);
    };
    static getFriends = async (userId: string, config?: AxiosRequestConfig): Promise<AxiosResponse<IUser[]>> => {
        return authApi.get<IUser[]>(`/friends/${userId}`, config);
    };
    static postFriend = async (
        { userId, friendId }: { userId: string; friendId: string },
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<void>> => {
        return authApi.post<void>(`/friends/${userId}`, { friendId }, config);
    };
    static deleteFriend = async (
        { userId, friendId }: { userId: string; friendId: string },
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<void>> => {
        return authApi.delete(`/friends/${userId}`, { params: { friendId }, ...config });
    };
    static getUsers = async (config?: AxiosRequestConfig): Promise<AxiosResponse<IUser[]>> => {
        return authApi.get<IUser[]>("/users", config);
    };
    static getFollowings = async (userId: string, config?: AxiosRequestConfig): Promise<AxiosResponse<IUser[]>> => {
        return authApi.get<IUser[]>(`/followings/${userId}`, config);
    };
    static follow = async (
        userId: string,
        body: INotificationDto,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<INotification>> => {
        return authApi.put<INotification>(`/followings/${userId}`, body, config);
    };
    static unfollow = async (
        { userId, followId }: { userId: string; followId: string },
        config?: AxiosRequestConfig
    ) => {
        return authApi.delete<void>(`/followings/${userId}`, { params: { followId }, ...config });
    };
    static getRequests = async (userId: string, config?: AxiosRequestConfig): Promise<AxiosResponse<IUser[]>> => {
        return authApi.get<IUser[]>(`/requests/${userId}`, config);
    };
    static deleteRequests = async (
        { userId, requestId }: { userId: string; requestId: string },
        config?: AxiosRequestConfig
    ) => {
        return authApi.delete(`/requests/${userId}`, { params: { requestId }, ...config });
    };
}
