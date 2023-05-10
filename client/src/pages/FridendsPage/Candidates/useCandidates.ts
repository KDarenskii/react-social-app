import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../../../hooks/helpers/useAppSelector";
import { IUser } from "../../../models/User";
import { selectUser } from "../../../store/user/selectors";
import { useSearchParams } from "react-router-dom";
import UserService from "../../../service/UserService";

export const useCandidates = () => {
    const currentUser = useAppSelector(selectUser);
    const [users, setUsers] = useState<IUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [searchParams] = useSearchParams();

    const filteredUsers = useMemo(
        () =>
            users.filter(
                ({ id }) =>
                    id !== currentUser.id &&
                    !currentUser?.friends?.includes(id) &&
                    !currentUser?.followings?.includes(id) &&
                    !currentUser?.requests?.includes(id)
            ),
        [users, currentUser.id, currentUser.friends, currentUser.followings, currentUser.requests]
    );

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                const response = await UserService.getUsers({
                    params: { search: searchParams.get("search") },
                });
                setUsers(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [searchParams]);

    return { users: filteredUsers, isLoading, friends: currentUser.friends };
};
