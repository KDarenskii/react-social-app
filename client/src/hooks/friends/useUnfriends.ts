import { useSocketContext } from "../../context/socketContext";
import { selectUser } from "../../store/user/selectors";
import { deleteFriend } from "../../store/user/thunks/deleteFriend";
import { useAppDispatch } from "../helpers/useAppDispatch";
import { useAppSelector } from "../helpers/useAppSelector";

export const useUnfriend = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const { socket } = useSocketContext();

    return async (friendId: string) => {
        await dispatch(deleteFriend({ userId: user.id, friendId }));
        socket?.emit("removeFriend", user, friendId);
    };
};
