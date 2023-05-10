import { useCallback, useEffect, useState } from "react";
import { useSocketContext } from "../../context/socketContext";
import { useAppSelector } from "../helpers/useAppSelector";
import { selectUser } from "../../store/user/selectors";
import { IUser } from "../../models/User";
import UserService from "../../service/UserService";

export const useFriends = () => {
    const user = useAppSelector(selectUser);
    const { socket } = useSocketContext();
    const [onlineUsers, setOnlineUsers] = useState<{ id: string; socketId: string }[]>([]);
    const [friends, setFriends] = useState<IUser[]>([]);
    const [onlineFriends, setOnlineFriends] = useState<IUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setFriends((prev) => prev.filter((friend) => user.friends.includes(friend.id)));
    }, [user.friends]);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await UserService.getFriends(user.id);
                setFriends(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFriends();
    }, [user.id]);

    useEffect(() => {
        socket?.on("getOnlineUsers", (onlineUsers: { id: string; socketId: string }[]) => {
            setOnlineUsers(onlineUsers);
        });
    }, [socket, friends]);

    useEffect(() => {
        socket?.emit("sendOnlineUsers");
        socket?.on("addFriend", (friend: IUser) => {
            setFriends((prev) => [friend, ...prev]);
        });
        socket?.on("removeFriend", (friend: IUser) => {
            setFriends((prev) => prev.filter((currFriend) => currFriend.id !== friend.id));
        });
    }, [socket]);

    useEffect(() => {
        const onlineFriends = friends.filter((friend) => onlineUsers.find((onlineUser) => onlineUser.id === friend.id));
        setOnlineFriends([...onlineFriends]);
    }, [onlineUsers, friends]);

    const checkIsOnline = useCallback(
        (friendId: string) => {
            const friend = onlineUsers.find((user) => user.id === friendId);
            return !!friend;
        },
        [onlineUsers]
    );

    return { friends, onlineFriends, checkIsOnline, isLoading };
};
