import { useEffect, useState } from "react";
import { IUser } from "../../models/User";
import UserService from "../../service/UserService";

export const usePost = (userId: string) => {
    const [user, setUser] = useState<IUser>({} as IUser);

    useEffect(() => {
        (async () => {
            try {
                const response = await UserService.getById(userId);
                setUser(response.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [userId]);

    return { user };
};
