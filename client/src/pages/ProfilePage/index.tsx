import React from "react";
import ProfileFriendsList from "./ProfileFriendsList";
import ProfilePosts from "./ProfilePosts";
import ProfileUser from "./ProfileUser";
import { useParams } from "react-router-dom";

import styles from "./styles.module.scss";

const ProfilePage: React.FC = () => {
    const { userId = "" } = useParams();

    return (
        <div className={styles.pageWrapper}>
            <ProfileUser userId={userId} className={styles.profile} />
            <ProfileFriendsList className={styles.friendsList} userId={userId} />
            <ProfilePosts userId={userId} />
        </div>
    );
};

export default ProfilePage;
