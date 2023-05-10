import React from "react";
import { useFriends } from "../../../hooks/friends/useFriends";
import Avatar from "../../../components/Avatar";
import { GrLocation } from "react-icons/gr";
import { IoIosSchool } from "react-icons/io";
import ActionButton from "../../../components/ui/ActionButton";
import { Link } from "react-router-dom";
import { MESSENGER_ROUTE, PROFILE_EDIT_ROUTE } from "../../../constants/routesPathnames";
import { FiUserCheck, FiUserPlus } from "react-icons/fi";
import { useProfileUser } from "./useProfileUser";
import Loader from "../../../components/Loader";
import Alert from "../../../components/Alert";
import { ALERT } from "../../../constants/alert";
import cn from "classnames";

import styles from "./styles.module.scss";

type Props = {
    userId: string;
    className?: string;
};

const ProfileUser: React.FC<Props> = ({ userId, className }) => {
    const {
        handleAddFriend,
        handleDeleteFriend,
        startConversation,
        user,
        isOwner,
        isFollowing,
        isFriend,
        isLoading,
        error,
    } = useProfileUser(userId);
    const { checkIsOnline } = useFriends();

    return (
        <>
            {isLoading && (
                <div className={styles.loaderWrapper}>
                    <Loader />
                </div>
            )}
            {error && (
                <Alert className={styles.alert} type={ALERT.ERROR}>
                    {error}
                </Alert>
            )}
            {!isLoading && !error && (
                <div className={cn(styles.body, className)}>
                    <Avatar
                        className={styles.avatar}
                        iconClassName={styles.onlineIcon}
                        isOnline={checkIsOnline(user.id)}
                        src={user.photo ? process.env.REACT_APP_SERVER_URL + "/users/" + user.photo : user.photo}
                    />
                    <div className={styles.profile}>
                        <h3 className={styles.name}>
                            {user.firstName} {user.lastName}
                        </h3>
                        {user.status && <p className={styles.status}>{user.status}</p>}
                        <ul className={styles.description}>
                            {user.birthdate && (
                                <li>{new Date().getFullYear() - parseInt(user.birthdate.substring(0, 4))} y.o.</li>
                            )}
                            {user.city && (
                                <li className={styles.city}>
                                    <GrLocation className={styles.descriptionIcon} />
                                    {user.city}
                                </li>
                            )}
                            {user.studiedAt && (
                                <li className={styles.education}>
                                    <IoIosSchool className={styles.descriptionIcon} />
                                    {user.studiedAt}
                                </li>
                            )}
                        </ul>
                    </div>
                    {!isOwner ? (
                        <div className={styles.actions}>
                            <Link className={styles.messageLink} to={MESSENGER_ROUTE.PATH}>
                                <ActionButton
                                    className={styles.messageBtn}
                                    onClick={() => startConversation(user.id)}
                                    colorType="custom"
                                >
                                    Message
                                </ActionButton>
                            </Link>
                            {isFriend || isFollowing ? (
                                <button className={styles.friendBtn} onClick={handleDeleteFriend}>
                                    <FiUserCheck className={styles.friendIcon} />
                                </button>
                            ) : (
                                <button className={styles.friendBtn} onClick={handleAddFriend}>
                                    <FiUserPlus className={styles.friendIcon} />
                                </button>
                            )}
                        </div>
                    ) : (
                        <Link className={styles.editLink} to={PROFILE_EDIT_ROUTE.PATH}>
                            <ActionButton className={styles.editBtn} colorType="light" size="sm">
                                Edit profile
                            </ActionButton>
                        </Link>
                    )}
                </div>
            )}
        </>
    );
};

export default ProfileUser;
