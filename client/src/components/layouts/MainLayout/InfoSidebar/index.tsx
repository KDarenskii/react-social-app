import React from "react";
import FriendBadge from "../../../FriendBadge";
import { useFriends } from "../../../../hooks/friends/useFriends";
import EmptyList from "../../../../pages/FridendsPage/EmptyList";

import styles from "./styles.module.scss";

const InfoSidebar: React.FC = () => {
    const { onlineFriends } = useFriends();

    return (
        <aside>
            <div className={styles.friendsBody}>
                <h5 className={styles.title}>Friends Online</h5>
                {onlineFriends.length < 1 && <EmptyList />}
                {onlineFriends.length > 0 && (
                    <ul className={styles.friendsList}>
                        {onlineFriends.map((friend) => (
                            <li key={friend.id}>
                                <FriendBadge friend={friend} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </aside>
    );
};

export default InfoSidebar;
