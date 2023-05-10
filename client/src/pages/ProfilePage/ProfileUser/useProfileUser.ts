import { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/helpers/useAppSelector";
import { selectFollowingById, selectFriendById, selectRequestById, selectUser } from "../../../store/user/selectors";
import { IUser } from "../../../models/User";
import { useFollow } from "../../../hooks/friends/useFollow";
import { useUnfollow } from "../../../hooks/friends/useUnfollow";
import { useAcceptRequest } from "../../../hooks/friends/useAcceptRequest";
import { useUnfriend } from "../../../hooks/friends/useUnfriends";
import { useStartConversation } from "../../../hooks/useStartConversation";
import UserService from "../../../service/UserService";

export const useProfileUser = (userId: string) => {
    const currentUser = useAppSelector(selectUser);

    const [user, setUser] = useState<IUser>({} as IUser);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const isOwner = currentUser.id === user.id;

    const isFriend = useAppSelector((state) => selectFriendById(state, user.id));
    const isFollowing = useAppSelector((state) => selectFollowingById(state, user.id));
    const isRequest = useAppSelector((state) => selectRequestById(state, user.id));

    const follow = useFollow();
    const unfollow = useUnfollow();
    const acceptRequest = useAcceptRequest();
    const unfriend = useUnfriend();
    const startConversation = useStartConversation();

    const handleAddFriend = async () => {
        isRequest ? await acceptRequest(currentUser, user) : await follow(user);
    };

    const handleDeleteFriend = async () => {
        isFollowing ? await unfollow(user.id) : unfriend(user.id);
    };

    useEffect(() => {
        (async () => {
            setError(null);
            setIsLoading(true);
            try {
                const response = await UserService.getById(userId);
                setUser(response.data);
            } catch (error) {
                setError("Something went wrong");
            } finally {
                setIsLoading(false);
            }
        })();
    }, [userId]);

    return {
        user,
        handleAddFriend,
        handleDeleteFriend,
        startConversation,
        isOwner,
        isLoading,
        isFriend,
        isFollowing,
        error,
    };
};
