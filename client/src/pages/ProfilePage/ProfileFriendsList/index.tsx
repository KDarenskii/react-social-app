import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../../../components/Avatar";
import { FRIENDS_ROUTE, PROFILE_ROUTE } from "../../../constants/routesPathnames";
import { useProfileFriends } from "./useProfileFriends";
import ProfileFriendsLoader from "./ProfileFriendsLoader";
import Alert from "../../../components/Alert";
import { ALERT } from "../../../constants/alert";
import cn from "classnames";

import styles from "./styles.module.scss";

type Props = {
    userId: string;
    className?: string;
};

const ProfileFriendsList: React.FC<Props> = ({ userId, className }) => {
    const { friends, isLoading, error } = useProfileFriends(userId);

    return (
        <>
            {isLoading && <ProfileFriendsLoader />}
            {error && (
                <Alert className={styles.alert} type={ALERT.ERROR}>
                    {error}
                </Alert>
            )}
            {!isLoading && !error && (
                <div className={cn(styles.body, className)}>
                    <Link className={styles.title} to={`/${FRIENDS_ROUTE.NAME}/${userId}`}>
                        <h5>Friends {friends.length}</h5>
                    </Link>
                    <ul className={styles.list}>
                        {friends.map((friend) => (
                            <li className={styles.friendItem} key={friend.id}>
                                <Link className={styles.friendLink} to={`/${PROFILE_ROUTE.NAME}/${friend.id}`}>
                                    <Avatar
                                        className={styles.avatar}
                                        src={
                                            friend.photo
                                                ? process.env.REACT_APP_SERVER_URL + "/users/" + friend.photo
                                                : friend.photo
                                        }
                                    />
                                    <div className={styles.name}>{friend.firstName}</div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default ProfileFriendsList;
