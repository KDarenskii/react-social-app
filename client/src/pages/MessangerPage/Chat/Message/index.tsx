import React from "react";
import Avatar from "../../../../components/Avatar";
import { IMessage } from "../../../../models/Message";
import { parseISO } from "../../../../helpers/parseISO";
import { Link } from "react-router-dom";
import { PROFILE_ROUTE } from "../../../../constants/routesPathnames";

import styles from "./styles.module.scss";

type Props = {
    message: IMessage;
    isOwner: boolean;
};

const Message: React.FC<Props> = ({ message, isOwner }) => {
    const { time } = parseISO(message.time);

    return (
        <div className={styles.message}>
            <div className={styles.wrapper}>
                <Link to={`/${PROFILE_ROUTE.NAME}/${message.senderId}`}>
                    <Avatar
                        className={styles.avatar}
                        src={message.photo ? process.env.REACT_APP_SERVER_URL + "/users/" + message.photo : null}
                    />
                </Link>
                <div className={styles.content}>
                    <div className={styles.title}>
                        <Link to={`/${PROFILE_ROUTE.NAME}/${message.senderId}`} className={styles.name}>
                            {isOwner ? "You" : `${message.firstName} ${message.lastName}`}
                        </Link>
                        <span className={styles.time}>{time}</span>
                    </div>
                    <div className={styles.text}>{message.text}</div>
                </div>
            </div>
        </div>
    );
};

export default Message;
