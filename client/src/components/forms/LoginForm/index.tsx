import React from "react";
import Input from "../../ui/Input";
import ActionButton from "../../ui/ActionButton";
import { REGISTRATION_ROUTE } from "../../../constants/routesPathnames";
import { loginValidationSchema } from "./loginValidationSchema";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import FieldError from "../FieldError";

import styles from "./styles.module.scss";

type Props = {
    onSubmit: (values: LoginFormValues) => Promise<void>;
    clearError?: () => void;
};

export interface LoginFormValues {
    email: string;
    password: string;
}

const LoginForm: React.FC<Props> = ({ onSubmit, clearError }) => {
    const navigate = useNavigate();
    const initialState: LoginFormValues = {
        email: "",
        password: "",
    };

    const { handleSubmit, errors, handleChange, handleBlur, values, touched, isSubmitting } = useFormik({
        initialValues: initialState,
        onSubmit,
        validationSchema: loginValidationSchema,
    });

    return (
        <form onSubmit={handleSubmit} onChange={clearError}>
            <label className={styles.label}>
                <Input
                    className={styles.input}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="email"
                    placeholder="Email"
                    disabled={isSubmitting}
                />
                {errors.email && touched.email && <FieldError className={styles.fieldError}>{errors.email}</FieldError>}
            </label>
            <label className={styles.label}>
                <Input
                    className={styles.input}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="password"
                    placeholder="Password"
                    type="password"
                    disabled={isSubmitting}
                />
                {errors.password && touched.password && (
                    <FieldError className={styles.fieldError}>{errors.password}</FieldError>
                )}
            </label>
            <ActionButton className={styles.submitBtn} colorType="info" type="submit" disabled={isSubmitting}>
                Sign in
            </ActionButton>
            <p className={styles.message}>or if you don't have an accout</p>
            <ActionButton
                className={styles.submitBtn}
                onClick={() => navigate(REGISTRATION_ROUTE.PATH)}
                colorType="success"
                type="button"
            >
                Sign up
            </ActionButton>
        </form>
    );
};

export default LoginForm;
