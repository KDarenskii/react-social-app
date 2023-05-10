import React, { LabelHTMLAttributes } from "react";
import cn from "classnames";

import styles from "./styles.module.scss";

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
    text?: string;
    textClassName?: string;
}

const Label: React.FC<Props> = ({ text, textClassName, className, children, ...rest }) => {
    return (
        <label className={cn(styles.label, className)} {...rest}>
            {text && <p className={cn(styles.labelText, textClassName)}>{text}</p>}
            {children}
        </label>
    );
};

export default Label;
