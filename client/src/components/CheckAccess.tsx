import React from "react";
import { ROLES } from "../constants/roles";
import { useAppSelector } from "../hooks/helpers/useAppSelector";
import { selectIsAuth, selectUser } from "../store/user/selectors";

type Props = {
    children: React.ReactNode;
    allowedRoles: ROLES[];
};

const CheckAccess: React.FC<Props> = ({ children, allowedRoles }) => {
    const user = useAppSelector(selectUser);
    const isAuth = useAppSelector(selectIsAuth);

    if (isAuth) {
        const isAllowedRole = user.roles.some((role) => allowedRoles.includes(role));
        if (isAllowedRole) return <>{children}</>;
    }

    return null;
};

export default CheckAccess;
