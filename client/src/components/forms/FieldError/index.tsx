import React from "react";
import cn from "classnames";

import styles from "./styles.module.scss";

type Props = {
    children: React.ReactNode;
    className?: string;
};

const FieldError: React.FC<Props> = ({ children, className }) => {
    return <p className={cn(styles.error, className)}>{children}</p>;
};

export default FieldError;
