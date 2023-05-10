import React from "react";

import styles from "./styles.module.scss";

type Props = {
    message?: string;
};

const EmptyList: React.FC<Props> = ({ message }) => {
    return <div className={styles.content}>{message ?? "List is currently empty"}</div>;
};

export default EmptyList;
