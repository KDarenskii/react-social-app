import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/helpers/useAppDispatch";
import { useSocketConnect } from "../../hooks/helpers/useSocketConnect";
import { checkAuth } from "../../store/user/thunks/checkAuth";
import { useAppSelector } from "../../hooks/helpers/useAppSelector";
import { selectUserError } from "../../store/user/selectors";

export const useApp = () => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const connectSocket = useSocketConnect();
    const error = useAppSelector(selectUserError);

    useEffect(() => {
        const authenticateUser = async () => {
            setIsLoading(true);
            try {
                const user = await dispatch(checkAuth()).unwrap();
                connectSocket(user.id);
            } catch (error) {
            } finally {
                setIsLoading(false);
            }
        };

        if (localStorage.getItem("token")) {
            authenticateUser();
        } else {
            setIsLoading(false);
        }
    }, [dispatch, connectSocket]);

    return { isLoading, error };
};
