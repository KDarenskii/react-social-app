import React from "react";
import Input from "../../ui/Input";
import ActionButton from "../../ui/ActionButton";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../../../constants/routesPathnames";
import { useFormik } from "formik";
import FieldError from "../FieldError";
import { registrationValidationSchema } from "./registrationValidationSchema";

import styles from "./styles.module.scss";

type Props = {
    onSubmit: (values: RegistrationFormValues) => Promise<void>;
    clearError?: () => void;
};

export interface RegistrationFormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const RegistrationForm: React.FC<Props> = ({ onSubmit, clearError }) => {
    const navigate = useNavigate();

    const initialState: RegistrationFormValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    const { handleBlur, handleChange, handleSubmit, values, errors, touched, isSubmitting } = useFormik({
        initialValues: initialState,
        onSubmit,
        validationSchema: registrationValidationSchema,
    });

    return (
        <form onSubmit={handleSubmit} onChange={clearError}>
            <label className={styles.label}>
                <Input
                    className={styles.input}
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="First name"
                    disabled={isSubmitting}
                />
                {errors.firstName && touched.firstName && (
                    <FieldError className={styles.fieldError}>{errors.firstName}</FieldError>
                )}
            </label>
            <label className={styles.label}>
                <Input
                    className={styles.input}
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Last name"
                    disabled={isSubmitting}
                />
                {errors.lastName && touched.lastName && (
                    <FieldError className={styles.fieldError}>{errors.lastName}</FieldError>
                )}
            </label>
            <label className={styles.label}>
                <Input
                    className={styles.input}
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Email"
                    disabled={isSubmitting}
                />
                {errors.email && touched.email && <FieldError className={styles.fieldError}>{errors.email}</FieldError>}
            </label>
            <label className={styles.label}>
                <Input
                    className={styles.input}
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Password"
                    type="password"
                    disabled={isSubmitting}
                />
                {errors.password && touched.password && (
                    <FieldError className={styles.fieldError}>{errors.password}</FieldError>
                )}
            </label>
            <label className={styles.label}>
                <Input
                    className={styles.input}
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Confirm password"
                    type="password"
                    disabled={isSubmitting}
                />
            </label>
            <ActionButton className={styles.submitBtn} colorType="info" type="submit" disabled={isSubmitting}>
                Sign up
            </ActionButton>
            <p className={styles.message}>or if you already have an accout</p>
            <ActionButton
                className={styles.submitBtn}
                onClick={() => navigate(LOGIN_ROUTE.PATH)}
                colorType="success"
                type="button"
            >
                Sign in
            </ActionButton>
        </form>
    );
};

export default RegistrationForm;
