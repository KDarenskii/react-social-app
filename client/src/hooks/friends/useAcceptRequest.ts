import { useSocketContext } from "../../context/socketContext";
import { IUser } from "../../models/User";
import { postFriend } from "../../store/user/thunks/postFriend";
import { useAppDispatch } from "../helpers/useAppDispatch";

export const useAcceptRequest = () => {
    const dispatch = useAppDispatch();
    const { socket } = useSocketContext();

    return async (user: IUser, requestUser: IUser) => {
        await dispatch(postFriend({ friendId: requestUser.id, userId: user.id }));
        socket?.emit("sendFriend", user, requestUser);
    };
};
