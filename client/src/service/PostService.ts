import { AxiosRequestConfig, AxiosResponse } from "axios";
import { authApi } from "../api";
import { IPost } from "../models/IPost";

export default class PostService {
    static get = (config?: AxiosRequestConfig): Promise<AxiosResponse<IPost[]>> => {
        return authApi.get<IPost[]>(`/posts`, config);
    };
    static getByUserId = (userId: string, config?: AxiosRequestConfig): Promise<AxiosResponse<IPost[]>> => {
        return authApi.get<IPost[]>(`/posts/${userId}`, config);
    };
    static post = async (formData: FormData, config?: AxiosRequestConfig): Promise<AxiosResponse<IPost>> => {
        return authApi.post<IPost>("/posts", formData, config);
    };
    static update = async (post: IPost, config?: AxiosRequestConfig): Promise<AxiosResponse<void>> => {
        return authApi.put<void>(`/posts/${post.id}`, post, config);
    };
    static delete = async (postId: string, config?: AxiosRequestConfig): Promise<AxiosResponse<void>> => {
        return authApi.delete<void>(`/posts/${postId}`, config);
    };
}
