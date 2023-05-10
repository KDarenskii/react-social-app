import React from "react";
import ContentLoader from "react-content-loader";

import styles from "./styles.module.scss";

const ConversationLoader: React.FC = () => (
    <ul className={styles.loadersList}>
        <li className={styles.loaderItem}>
            <ContentLoader
                speed={2}
                width={"100%"}
                height={84}
                viewBox="0 0 562 84"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                className={styles.loader}
            >
                <circle cx="45" cy="40" r="25" />
                <rect x="80" y="15" rx="7" ry="7" width="100" height="16" />
                <circle cx="92" cy="53" r="12" />
                <rect x="114" y="46" rx="7" ry="7" width="105" height="13" />
                <rect x="508" y="15" rx="6" ry="6" width="34" height="18" />
            </ContentLoader>
        </li>
        <li className={styles.loaderItem}>
            <ContentLoader
                speed={2}
                width={"100%"}
                height={84}
                viewBox="0 0 562 84"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                className={styles.loader}
            >
                <circle cx="45" cy="40" r="25" />
                <rect x="80" y="15" rx="7" ry="7" width="100" height="16" />
                <circle cx="92" cy="53" r="12" />
                <rect x="114" y="46" rx="7" ry="7" width="105" height="13" />
                <rect x="508" y="15" rx="6" ry="6" width="34" height="18" />
            </ContentLoader>
        </li>
        <li className={styles.loaderItem}>
            <ContentLoader
                speed={2}
                width={"100%"}
                height={84}
                viewBox="0 0 562 84"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                className={styles.loader}
            >
                <circle cx="45" cy="40" r="25" />
                <rect x="80" y="15" rx="7" ry="7" width="100" height="16" />
                <circle cx="92" cy="53" r="12" />
                <rect x="114" y="46" rx="7" ry="7" width="105" height="13" />
                <rect x="508" y="15" rx="6" ry="6" width="34" height="18" />
            </ContentLoader>
        </li>
        <li className={styles.loaderItem}>
            <ContentLoader
                speed={2}
                width={"100%"}
                height={84}
                viewBox="0 0 562 84"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                className={styles.loader}
            >
                <circle cx="45" cy="40" r="25" />
                <rect x="80" y="15" rx="7" ry="7" width="100" height="16" />
                <circle cx="92" cy="53" r="12" />
                <rect x="114" y="46" rx="7" ry="7" width="105" height="13" />
                <rect x="508" y="15" rx="6" ry="6" width="34" height="18" />
            </ContentLoader>
        </li>
    </ul>
);

export default ConversationLoader;
