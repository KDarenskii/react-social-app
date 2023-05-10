import { useEffect, useState } from "react";
import { useSocketContext } from "../../../context/socketContext";
import { useUnfriend } from "../../../hooks/friends/useUnfriends";
import { IUser } from "../../../models/User";
import UserService from "../../../service/UserService";

export const useFriendsList = (userId: string) => {
    const unfriend = useUnfriend();
    const { socket } = useSocketContext();

    const [friends, setFriends] = useState<IUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await UserService.getFriends(userId);
                setFriends(response.data);
            } catch (error) {
                setError("Something went wrong");
            } finally {
                setIsLoading(false);
            }
        })();
    }, [userId]);

    useEffect(() => {
        socket?.on("removeFriend", (friend: IUser) => {
            setFriends((friends) => friends.filter((currFriend) => currFriend.id !== friend.id));
        });
        socket?.on("addFriend", (friend: IUser) => {
            setFriends((friends) => [friend, ...friends]);
        });
    }, [socket]);

    const handleDeleteFriend = async (friendId: string) => {
        await unfriend(friendId);
        setFriends((friends) => friends.filter((friend) => friend.id !== friendId));
    };

    return { friends, isLoading, error, handleDeleteFriend };
};
