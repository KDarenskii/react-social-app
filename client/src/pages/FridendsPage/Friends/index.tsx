import React from "react";
import Avatar from "../../../components/Avatar";
import { Link } from "react-router-dom";
import { TbUserOff } from "react-icons/tb";
import EmptyList from "../EmptyList";
import Loader from "../../../components/Loader";
import { PROFILE_ROUTE } from "../../../constants/routesPathnames";
import { IUser } from "../../../models/User";
import { useFriendsList } from "./useFriends";
import { useFriends } from "../../../hooks/friends/useFriends";
import { useStartConversation } from "../../../hooks/useStartConversation";

import styles from "./styles.module.scss";

type Props = {
    user: IUser;
    isOwner?: boolean;
};

const Friends: React.FC<Props> = ({ user, isOwner }) => {
    const { friends, handleDeleteFriend, isLoading } = useFriendsList(user.id);
    const { checkIsOnline } = useFriends();
    const startConversation = useStartConversation();

    return (
        <>
            {isLoading && <Loader className={styles.loader} />}
            {!isLoading && friends.length < 1 && <EmptyList />}
            {!isLoading && friends.length > 0 && (
                <ul className={styles.friendsList}>
                    {friends.map((friend) => (
                        <li className={styles.friendItem} key={friend.id}>
                            <div className={styles.friend}>
                                <div className={styles.wrapper}>
                                    <Link to={`/${PROFILE_ROUTE.NAME}/${friend.id}`}>
                                        <Avatar
                                            className={styles.avatar}
                                            iconClassName={styles.onlineIcon}
                                            isOnline={checkIsOnline(friend.id)}
                                            src={
                                                friend.photo
                                                    ? process.env.REACT_APP_SERVER_URL + "/users/" + friend.photo
                                                    : friend.photo
                                            }
                                        />
                                    </Link>
                                    <div className={styles.content}>
                                        <Link className={styles.name} to={`/${PROFILE_ROUTE.NAME}/${friend.id}`}>
                                            {friend.firstName} {friend.lastName}
                                        </Link>
                                        <div className={styles.actions}>
                                            <button
                                                className={styles.actionBtn}
                                                onClick={() => startConversation(friend.id)}
                                            >
                                                Write message
                                            </button>
                                            {!user.friends.includes(friend.id) && (
                                                <button className={styles.actionBtn}>Add friend</button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {isOwner && (
                                    <button
                                        className={styles.unfollowButton}
                                        onClick={() => handleDeleteFriend(friend.id)}
                                    >
                                        <TbUserOff className={styles.unfollowIcon} />
                                    </button>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default Friends;
