import React from "react";
import Loader from "../../../../components/Loader";

import styles from "./styles.module.scss";

type Props = {
    className?: string;
};

const ProfileFriendsLoader: React.FC<Props> = ({ className }) => {
    return (
        <div className={styles.loaderWrapper}>
            <Loader className={styles.loader} />
        </div>
    );
};

export default ProfileFriendsLoader;
