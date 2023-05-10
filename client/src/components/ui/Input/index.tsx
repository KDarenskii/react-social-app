import React from "react";
import cn from "classnames";

import styles from "./styles.module.scss";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<Props> = ({ className, ...rest }) => {
    return <input className={cn(styles.input, className)} {...rest} />;
};

export default Input;
