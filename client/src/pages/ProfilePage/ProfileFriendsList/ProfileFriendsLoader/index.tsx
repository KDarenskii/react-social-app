import React from "react";
import Loader from "../../../../components/Loader";

import styles from "./styles.module.scss";

const ProfileFriendsLoader: React.FC = () => {
    return (
        <div className={styles.loaderWrapper}>
            <Loader className={styles.loader} />
        </div>
    );
};

export default ProfileFriendsLoader;
