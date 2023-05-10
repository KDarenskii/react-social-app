import React from "react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import cn from "classnames";

import "react-datepicker/dist/react-datepicker.css";
import styles from "./styles.module.scss";

const DateInput: React.FC<ReactDatePickerProps> = ({ onChange, className, ...rest }) => {
    return (
        <DatePicker
            {...rest}
            className={cn(styles.input, className)}
            shouldCloseOnSelect={true}
            onChange={(date, event) => onChange(date, event)}
            dateFormat="dd/MM/yyyy"
            autoComplete="none"
        />
    );
};

export default DateInput;
