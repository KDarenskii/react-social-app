import React from "react";
import NewsPosts from "./NewsPosts";

import styles from "./styles.module.scss";

const News: React.FC = () => {
    return (
        <div className={styles.pageWrapper}>
            <NewsPosts />
        </div>
    );
};

export default News;
