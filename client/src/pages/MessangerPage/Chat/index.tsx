import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import Avatar from "../../../components/Avatar";
import Message from "./Message";
import { MESSENGER_ROUTE, PROFILE_ROUTE } from "../../../constants/routesPathnames";
import Loader from "../../../components/Loader";
import { useChat } from "./useChat";
import MessageForm from "./MessageForm";

import styles from "./styles.module.scss";

const Chat: React.FC = () => {
    const { checkIsOnline, handleSubmit, isLoading, messageRef, messages, user, friend } = useChat();

    return (
        <div className={styles.chat}>
            {isLoading ? (
                <div className={styles.loaderWrapper}>
                    <Loader className={styles.loader} />
                </div>
            ) : (
                <>
                    <header className={styles.header}>
                        <div className={styles.headerWrapper}>
                            <Link to={MESSENGER_ROUTE.PATH} className={styles.backButton}>
                                <FaChevronLeft className={styles.backIcon} />
                                <span className={styles.backText}>Back</span>
                            </Link>
                            <div className={styles.title}>
                                <Link to={`/${PROFILE_ROUTE.NAME}/${friend.id}`} className={styles.name}>
                                    {friend.firstName} {friend.lastName}
                                </Link>
                                <div className={styles.status}>{checkIsOnline(friend.id) ? "Online" : "Offline"}</div>
                            </div>
                            <Link to={`/${PROFILE_ROUTE.NAME}/${friend.id}`}>
                                <Avatar
                                    className={styles.avatar}
                                    src={
                                        friend.photo
                                            ? process.env.REACT_APP_SERVER_URL + "/users/" + friend.photo
                                            : null
                                    }
                                />
                            </Link>
                        </div>
                    </header>
                    <ul className={styles.messagesList}>
                        {messages.map((message) => (
                            <li className={styles.messageItem} key={message.id} ref={messageRef}>
                                <Message message={message} isOwner={message.senderId === user.id} />
                            </li>
                        ))}
                    </ul>
                    <MessageForm onSubmit={handleSubmit} />
                </>
            )}
        </div>
    );
};

export default Chat;
