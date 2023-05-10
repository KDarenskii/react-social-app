import { NOTICE } from "../constants/notice";
import { useSocketContext } from "../context/socketContext";
import { IPost } from "../models/IPost";
import { INotificationDto } from "../models/Notification";
import NotificationService from "../service/NotificationService";
import { selectUser } from "../store/user/selectors";
import { useAppSelector } from "./helpers/useAppSelector";

export const useLike = () => {
    const user = useAppSelector(selectUser);
    const { socket } = useSocketContext();

    return async (post: IPost, isLiked: boolean) => {
        const notification: INotificationDto = {
            firstName: user.firstName,
            lastName: user.lastName,
            type: NOTICE.LIKE,
            userId: post.userId,
            photoSrc: user.photo,
        };
        try {
            if (post.userId !== user.id && !isLiked) {
                const response = await NotificationService.add(notification);
                socket?.emit("sendNotification", response.data);
            }
            socket?.emit("sendLike", user.id, post);
        } catch (error) {
            console.log(error);
        }
    };
};
