import React, { useState } from "react";
import RegistrationForm, { RegistrationFormValues } from "../../components/forms/RegistrationForm";
import { useAppDispatch } from "../../hooks/helpers/useAppDispatch";
import { registerUser } from "../../store/user/thunks/registerUser";
import { useNavigate } from "react-router-dom";
import { useSocketConnect } from "../../hooks/helpers/useSocketConnect";
import { NEWS_ROUTE } from "../../constants/routesPathnames";
import Alert from "../../components/Alert";
import { ALERT } from "../../constants/alert";
import { IRegistrationCredentials } from "../../models/Credentials";

import styles from "./styles.module.scss";

const RegistrationPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const connectSocket = useSocketConnect();
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (values: RegistrationFormValues) => {
        setError(null);

        const { firstName, lastName, email, password, confirmPassword } = values;

        const credentials: IRegistrationCredentials = {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim(),
            password: password.trim(),
        };

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const user = await dispatch(registerUser(credentials)).unwrap();
            connectSocket(user.id);
            navigate(NEWS_ROUTE.PATH);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.body}>
                <h2 className={styles.title}>Sign up to React Social</h2>
                {error && (
                    <Alert className={styles.alert} type={ALERT.ERROR}>
                        {error}
                    </Alert>
                )}
                <RegistrationForm onSubmit={handleSubmit} clearError={() => setError(null)} />
            </div>
        </div>
    );
};

export default RegistrationPage;
