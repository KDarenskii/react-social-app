import { useNavigate } from "react-router-dom";
import ConversationService from "../service/CoversationService";
import { selectUser } from "../store/user/selectors";
import { useAppSelector } from "./helpers/useAppSelector";
import { CHAT_ROUTE, MESSENGER_ROUTE } from "../constants/routesPathnames";

export const useStartConversation = () => {
    const user = useAppSelector(selectUser);
    const navigate = useNavigate();
    return async (friendId: string) => {
        const response = await ConversationService.startConversation({ userId: user.id, friendId });
        navigate(`/${MESSENGER_ROUTE.NAME}/${CHAT_ROUTE.NAME}/${response.data.id}`);
    };
};
