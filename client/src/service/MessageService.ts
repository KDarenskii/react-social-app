import { AxiosRequestConfig, AxiosResponse } from "axios";
import { IMessage, IMessageDto } from "../models/Message";
import { authApi } from "../api";

export default class MessageService {
    static getByConversationId = async (
        conversationId: string,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<IMessage[]>> => {
        return authApi.get<IMessage[]>(`/messages/${conversationId}`, config);
    };
    static post = async (message: IMessageDto, config?: AxiosRequestConfig): Promise<AxiosResponse<IMessage>> => {
        return authApi.post<IMessage>("/messages", message, config);
    };
}
