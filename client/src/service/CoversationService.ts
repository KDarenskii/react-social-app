import { AxiosRequestConfig, AxiosResponse } from "axios";
import { authApi } from "../api";
import { IConversation } from "../models/Conversation";

export default class ConversationService {
    static getById = async (id: string, config?: AxiosRequestConfig): Promise<AxiosResponse<IConversation>> => {
        return authApi.get<IConversation>(`/conversations/${id}`, config);
    };
    static getByUserId = async (
        userId: string,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<IConversation[]>> => {
        return authApi.get<IConversation[]>(`/conversations/all/${userId}`, config);
    };
    static startConversation = async (
        { userId, friendId }: { userId: string; friendId: string },
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<IConversation>> => {
        return authApi.post<IConversation>(`/conversations`, { userId, friendId }, config);
    };
}
