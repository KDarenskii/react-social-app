import { useEffect, useRef, useState } from "react";
import { IConversation } from "../../../models/Conversation";
import { useSocketContext } from "../../../context/socketContext";
import { useAppSelector } from "../../../hooks/helpers/useAppSelector";
import { useParams } from "react-router-dom";
import { selectUser } from "../../../store/user/selectors";
import { useFriends } from "../../../hooks/friends/useFriends";
import MessageService from "../../../service/MessageService";
import { IMessage, IMessageDto } from "../../../models/Message";
import ConversationService from "../../../service/CoversationService";
import { IUser } from "../../../models/User";
import UserService from "../../../service/UserService";

export const useChat = () => {
    const { conversationId = "" } = useParams();

    const [conversation, setConversation] = useState<IConversation>({} as IConversation);
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [friend, setFriend] = useState<IUser>({} as IUser);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const user = useAppSelector(selectUser);

    const { socket } = useSocketContext();
    const { checkIsOnline } = useFriends();

    const messageRef = useRef<HTMLLIElement | null>(null);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            setError(null);
            try {
                const conversationResponse = await ConversationService.getById(conversationId);
                const friendId = conversationResponse.data.members.find((member) => member !== user.id);
                if (!friendId) return;
                const [messageResponse, friendResponse] = await Promise.all([
                    MessageService.getByConversationId(conversationId),
                    UserService.getById(friendId),
                ]);
                setMessages(messageResponse.data);
                setConversation(conversationResponse.data);
                setFriend(friendResponse.data);
                messageRef?.current?.scrollIntoView();
            } catch (error) {
                setError("Something went wrong");
            } finally {
                setIsLoading(false);
            }
        })();
    }, [conversationId, user.id]);

    useEffect(() => {
        messageRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, value: string) => {
        event.preventDefault();
        const messageDto: IMessageDto = {
            conversationId: conversation.id,
            senderId: user.id,
            receiverId: friend.id,
            text: value,
            photo: user.photo,
            firstName: user.firstName,
            lastName: user.lastName,
        };

        try {
            const response = await MessageService.post(messageDto);
            setMessages((messages) => [...messages, response.data]);
            socket?.emit("sendMessage", response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        socket?.on("getMessage", (message: IMessage) => {
            const { receiverId, senderId } = message;
            const isMember = conversation.members?.every((member) => [receiverId, senderId].includes(member));
            if (isMember && message.senderId !== user.id) {
                setMessages((messages) => [...messages, message]);
            }
        });
    }, [socket, conversation.members, user.id]);

    return { handleSubmit, messages, isLoading, error, messageRef, checkIsOnline, user, friend };
};
