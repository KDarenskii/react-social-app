import { useSocketContext } from "../../context/socketContext";
import { selectUser } from "../../store/user/selectors";
import { unfollowUser } from "../../store/user/thunks/unfollowUser";
import { useAppDispatch } from "../helpers/useAppDispatch";
import { useAppSelector } from "../helpers/useAppSelector";

export const useUnfollow = () => {
    const dispatch = useAppDispatch();
    const { socket } = useSocketContext();
    const user = useAppSelector(selectUser);

    return async (followId: string) => {
        await dispatch(unfollowUser({ userId: user.id, followId }));
        socket?.emit("removeRequest", user.id, followId);
    };
};
