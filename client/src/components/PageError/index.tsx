import React from "react";
import Alert from "../Alert";
import { ALERT } from "../../constants/alert";

import styles from "./styles.module.scss";

type Props = {
    message: string;
};

const PageError: React.FC<Props> = ({ message }) => {
    return (
        <div className={styles.alertWrapper}>
            <Alert type={ALERT.ERROR}>{message}</Alert>
        </div>
    );
};

export default PageError;
