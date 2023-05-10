import { useEffect, useState } from "react";
import { useUnfollow } from "../../../hooks/friends/useUnfollow";
import { IUser } from "../../../models/User";
import UserService from "../../../service/UserService";
import { useSocketContext } from "../../../context/socketContext";

export const useFollowings = (userId: string) => {
    const [followingUsers, setFollowingUsers] = useState<IUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const unfollow = useUnfollow();
    const { socket } = useSocketContext();

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await UserService.getFollowings(userId);
                setFollowingUsers(response.data);
            } catch (error) {
                console.log(error);
                setError("Something went wrong");
            } finally {
                setIsLoading(false);
            }
        })();
    }, [userId]);

    useEffect(() => {
        socket?.on("addFriend", (friend) => {
            setFollowingUsers((prev) => prev.filter((following) => following.id !== friend.id));
        });
        socket?.on("addFollowing", (followingUser: IUser) => {
            setFollowingUsers((prev) => [...prev, followingUser]);
        });
    }, [socket]);

    const handleUnfollow = async (followId: string) => {
        await unfollow(followId);
        setFollowingUsers((prev) => prev.filter((following) => following.id !== followId));
    };

    return { handleUnfollow, followingUsers, isLoading, error };
};
