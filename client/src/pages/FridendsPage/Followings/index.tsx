import React from "react";
import { IUser } from "../../../models/User";
import Avatar from "../../../components/Avatar";
import { PROFILE_ROUTE } from "../../../constants/routesPathnames";
import { Link } from "react-router-dom";
import EmptyList from "../EmptyList";
import Loader from "../../../components/Loader";
import { useFollowings } from "./useFollowings";
import { useStartConversation } from "../../../hooks/useStartConversation";

import styles from "./styles.module.scss";

type Props = {
    user: IUser;
};

const Followings: React.FC<Props> = ({ user }) => {
    const { followingUsers, handleUnfollow, isLoading } = useFollowings(user.id);
    const startConversation = useStartConversation();

    return (
        <>
            {isLoading && <Loader className={styles.loader} />}
            {!isLoading && followingUsers.length < 1 && <EmptyList />}
            {!isLoading && followingUsers.length > 0 && (
                <ul className={styles.followingsList}>
                    {followingUsers.map((followingUser) => (
                        <li className={styles.followingItem} key={followingUser.id}>
                            <div className={styles.wrapper}>
                                <Link to={`/${PROFILE_ROUTE.NAME}/${followingUser.id}`}>
                                    <Avatar
                                        className={styles.avatar}
                                        src={
                                            followingUser.photo
                                                ? process.env.REACT_APP_SERVER_URL + "/users/" + followingUser.photo
                                                : followingUser.photo
                                        }
                                    />
                                </Link>
                                <div className={styles.content}>
                                    <Link className={styles.name} to={`/${PROFILE_ROUTE.NAME}/${followingUser.id}`}>
                                        {followingUser.firstName} {followingUser.lastName}
                                    </Link>
                                    <button
                                        className={styles.messageLink}
                                        onClick={() => startConversation(followingUser.id)}
                                    >
                                        Write message
                                    </button>
                                </div>
                            </div>
                            <button className={styles.unfollowButton} onClick={() => handleUnfollow(followingUser.id)}>
                                Unfollow
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default Followings;
