import { useEffect, useState } from "react";
import { IUser } from "../../../models/User";
import UserService from "../../../service/UserService";

export const useConversation = (friendId: string) => {
    const [user, setUser] = useState<IUser>({} as IUser);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await UserService.getById(friendId);
                setUser(response.data);
            } catch (error) {
                setError("Something went wrong");
            } finally {
                setIsLoading(false);
            }
        })();
    }, [friendId]);

    return { user, isLoading, error };
};
