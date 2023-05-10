import React from "react";
import Avatar from "../../../components/Avatar";
import { IConversation } from "../../../models/Conversation";
import { useFriends } from "../../../hooks/friends/useFriends";
import { Link } from "react-router-dom";
import { CHAT_ROUTE, MESSENGER_ROUTE } from "../../../constants/routesPathnames";
import { useConversation } from "./useConversation";
import { parseISO } from "../../../helpers/parseISO";

import styles from "./styles.module.scss";

type Props = {
    conversation: IConversation;
    userId: string;
};

const Conversation: React.FC<Props> = ({ conversation, userId }) => {
    const { checkIsOnline } = useFriends();
    const friendId = conversation.members.find((member) => member !== userId) as string;
    const { user } = useConversation(friendId);

    const { id, lastMessage } = conversation;

    const time = conversation.lastUpdateTime ? parseISO(conversation.lastUpdateTime).time : null;

    return (
        <Link className={styles.conversation} to={`/${MESSENGER_ROUTE.NAME}/${CHAT_ROUTE.NAME}/${id}`}>
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <Avatar
                        className={styles.conversationImg}
                        isOnline={checkIsOnline(user.id)}
                        src={user.photo ? process.env.REACT_APP_SERVER_URL + "/users/" + user.photo : null}
                    />
                    <div className={styles.info}>
                        <div className={styles.title}>
                            <h5 className={styles.name}>
                                {user.firstName} {user.lastName}
                            </h5>
                            <div className={styles.time}>{time}</div>
                        </div>
                        <div className={styles.preview}>
                            {lastMessage ? (
                                <>
                                    <Avatar
                                        className={styles.senderAvatar}
                                        imageClassName={styles.senderImg}
                                        src={
                                            lastMessage.photo
                                                ? process.env.REACT_APP_SERVER_URL + "/users/" + lastMessage.photo
                                                : null
                                        }
                                    />
                                    <p className={styles.message}>{lastMessage.text}</p>
                                </>
                            ) : (
                                <p className={styles.message}>You have no messages yet</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Conversation;
