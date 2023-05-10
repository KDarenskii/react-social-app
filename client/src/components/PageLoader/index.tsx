import React from "react";

import styles from "./styles.module.scss";
import Loader from "../Loader";

const PageLoader: React.FC = () => {
    return (
        <div className={styles.loaderWrapper}>
            <Loader />
        </div>
    );
};

export default PageLoader;
