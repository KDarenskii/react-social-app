import React from "react";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineMessage } from "react-icons/ai";
import Avatar from "../Avatar";
import { IUser } from "../../models/User";
import { Link } from "react-router-dom";
import { PROFILE_ROUTE } from "../../constants/routesPathnames";
import { useStartConversation } from "../../hooks/useStartConversation";

import styles from "./styles.module.scss";

type Props = {
    friend: IUser;
};

const FriendBadge: React.FC<Props> = ({ friend }) => {
    const startConversation = useStartConversation();

    return (
        <div className={styles.badge}>
            <div className={styles.wrapper}>
                <Avatar
                    className={styles.avatar}
                    isOnline={true}
                    src={friend.photo ? process.env.REACT_APP_SERVER_URL + "/users/" + friend.photo : friend.photo}
                />
                <span className={styles.name}>
                    {friend.firstName}
                </span>
            </div>
            <div className={styles.wrapper}>
                <button className={styles.action} onClick={async () => await startConversation(friend.id)}>
                    <AiOutlineMessage className={styles.actionIcon} />
                </button>
                <Link to={`/${PROFILE_ROUTE.NAME}/${friend.id}`} className={styles.action}>
                    <BiUserCircle className={styles.actionIcon} />
                </Link>
            </div>
        </div>
    );
};

export default FriendBadge;
