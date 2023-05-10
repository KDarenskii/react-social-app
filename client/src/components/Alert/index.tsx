import React from "react";
import cn from "classnames";
import { ALERT } from "../../constants/alert";

import styles from "./styles.module.scss";

type Props = {
    children: React.ReactNode;
    type: ALERT;
    className?: string;
};

const Alert: React.FC<Props> = ({ type, children, className }) => {
    return <div className={cn(styles.alert, styles[type], className)}>{children}</div>;
};

export default Alert;
