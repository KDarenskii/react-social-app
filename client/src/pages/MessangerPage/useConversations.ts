import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/helpers/useAppSelector";
import { selectUser } from "../../store/user/selectors";
import { IConversation } from "../../models/Conversation";
import { useAppDispatch } from "../../hooks/helpers/useAppDispatch";
import { logoutUser } from "../../store/user/thunks/logoutUser";
import ConversationService from "../../service/CoversationService";

export const useConversations = () => {
    const user = useAppSelector(selectUser);

    const [conversations, setConversations] = useState<IConversation[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await ConversationService.getByUserId(user.id);
                setConversations(response.data);
            } catch (error) {
                const err = error as any;
                if (err.response.status === 401) {
                    await dispatch(logoutUser());
                }
                setError("Something went wrong");
            } finally {
                setIsLoading(false);
            }
        })();
    }, [user.id, dispatch]);

    return { conversations, isLoading, error, userId: user.id };
};
