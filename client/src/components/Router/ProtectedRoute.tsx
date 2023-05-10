import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ROLES } from "../../constants/roles";
import { useAppSelector } from "../../hooks/helpers/useAppSelector";
import { selectIsAuth, selectUser } from "../../store/user/selectors";
import { LOGIN_ROUTE } from "../../constants/routesPathnames";

type Props = {
    roles: ROLES[];
};

const ProtectedRoute: React.FC<Props> = ({ roles }) => {
    const location = useLocation();
    const user = useAppSelector(selectUser);
    const isAuth = useAppSelector(selectIsAuth);

    if (isAuth) {
        const isAllowedRole = user.roles.some((role) => roles.includes(role));
        return isAllowedRole ? <Outlet /> : <p>403 You do not have permission to access this page</p>;
    }

    return <Navigate to={LOGIN_ROUTE.PATH} state={{ from: location }} replace />;
};

export default ProtectedRoute;
