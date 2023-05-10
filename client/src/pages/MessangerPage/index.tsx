import React from "react";
import Alert from "../../components/Alert";
import { ALERT } from "../../constants/alert";
import EmptyList from "../FridendsPage/EmptyList";
import Conversation from "./Conversation";
import { useConversations } from "./useConversations";
import ConversationLoader from "./ConversationLoader";

import styles from "./styles.module.scss";

const MessangerPage: React.FC = () => {
    const { conversations, error, isLoading, userId } = useConversations();

    return (
        <div className={styles.pageWrapper}>
            <header className={styles.header}>All conversatons</header>
            {error && <Alert type={ALERT.ERROR}>{error}</Alert>}
            {isLoading && <ConversationLoader />}
            {!error && !isLoading && conversations.length > 0 && (
                <ul className={styles.conversationsList}>
                    {conversations.map((conversation) => (
                        <li key={conversation.id}>
                            <Conversation userId={userId} conversation={conversation} />
                        </li>
                    ))}
                </ul>
            )}
            {!error && !isLoading && conversations.length < 1 && <EmptyList message="You have no conversations yet" />}
        </div>
    );
};

export default MessangerPage;
