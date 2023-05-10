import { NOTICE } from "../../constants/notice";
import { useSocketContext } from "../../context/socketContext";
import { INotificationDto } from "../../models/Notification";
import { IUser } from "../../models/User";
import { selectUser } from "../../store/user/selectors";
import { followUser } from "../../store/user/thunks/followUser";
import { useAppDispatch } from "../helpers/useAppDispatch";
import { useAppSelector } from "../helpers/useAppSelector";

export const useFollow = () => {
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const { socket } = useSocketContext();

    return async (requestFriend: IUser) => {
        const notification: INotificationDto = {
            firstName: user.firstName,
            lastName: user.lastName,
            type: NOTICE.FRIEND_REQUEST,
            userId: requestFriend.id,
            photoSrc: user.photo,
        };
        try {
            const notificationData = await dispatch(followUser({ userId: user.id, notification })).unwrap();
            socket?.emit("sendNotification", notificationData);
            socket?.emit("sendRequest", user, requestFriend.id);
        } catch (error) {
            console.log(error);
        }
    };
};
