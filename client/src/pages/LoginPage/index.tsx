import React, { useState } from "react";
import LoginForm, { LoginFormValues } from "../../components/forms/LoginForm";
import { useAppDispatch } from "../../hooks/helpers/useAppDispatch";
import { loginUser } from "../../store/user/thunks/loginUser";
import Alert from "../../components/Alert";
import { ALERT } from "../../constants/alert";
import { NEWS_ROUTE } from "../../constants/routesPathnames";
import { useFromNavigate } from "../../hooks/helpers/useFromNavigate";
import { useSocketConnect } from "../../hooks/helpers/useSocketConnect";

import styles from "./styles.module.scss";

const LoginPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useFromNavigate();
    const connectSocket = useSocketConnect();
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (values: LoginFormValues) => {
        const { email, password } = values;
        try {
            const user = await dispatch(loginUser({ email: email.trim(), password: password.trim() })).unwrap();
            connectSocket(user.id);
            navigate(NEWS_ROUTE.PATH);
        } catch (error) {
            const err = error as any;
            setError(err?.response?.message ?? "Failed to sign in");
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.body}>
                <h2 className={styles.title}>Sign in to React Social</h2>
                {error && (
                    <Alert className={styles.alert} type={ALERT.ERROR}>
                        {error}
                    </Alert>
                )}
                <LoginForm onSubmit={handleSubmit} clearError={() => setError(null)} />
            </div>
        </div>
    );
};

export default LoginPage;
