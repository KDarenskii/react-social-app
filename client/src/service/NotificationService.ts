import { AxiosRequestConfig, AxiosResponse } from "axios";
import { authApi } from "../api";
import { INotification, INotificationDto } from "../models/Notification";

export default class NotificationService {
    static get = async (userId: string, config?: AxiosRequestConfig): Promise<AxiosResponse<INotification[]>> => {
        return authApi.get<INotification[]>(`/notifications/${userId}`, config);
    };
    static add = async (body: INotificationDto, config?: AxiosRequestConfig): Promise<AxiosResponse<INotification>> => {
        return authApi.post("/notifications", body, config);
    };
    static remove = async (id: string, config?: AxiosRequestConfig): Promise<AxiosResponse<void>> => {
        return authApi.delete(`/notifications/${id}`, config);
    };
    static removeAll = async (userId: string, config?: AxiosRequestConfig): Promise<AxiosResponse<void>> => {
        return authApi.delete(`/notifications/all/${userId}`, config);
    };
}
