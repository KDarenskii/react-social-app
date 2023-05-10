import React from "react";
import cn from "classnames";

import styles from "./styles.module.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    colorType: "success" | "danger" | "info" | "warning" | "light" | "custom";
    size?: "lg" | "sm";
}

const ActionButton: React.FC<Props> = ({ className, children, colorType, size, ...rest }) => {
    return (
        <button className={cn(styles.button, styles[colorType], size && styles[size], className)} {...rest}>
            {children}
        </button>
    );
};

export default ActionButton;
