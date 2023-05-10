import { useEffect, useState } from "react";
import { IUser } from "../../../models/User";
import UserService from "../../../service/UserService";

export const useProfileFriends = (userId: string) => {
    const [friends, setFriends] = useState<IUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await UserService.getFriends(userId, { params: { limit: 5 } });
                setFriends(response.data);
            } catch (error) {
                setError("Something went wrong");
            } finally {
                setIsLoading(false);
            }
        })();
    }, [userId]);

    return { friends, isLoading, error };
};
