import React, { useRef, useState } from "react";
import Avatar from "../../../../Avatar";
import { useAppSelector } from "../../../../../hooks/helpers/useAppSelector";
import { selectUser } from "../../../../../store/user/selectors";
import { FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { BsChevronCompactDown } from "react-icons/bs";
import useClickOutside from "../../../../../hooks/helpers/useClickOutside";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, PROFILE_ROUTE } from "../../../../../constants/routesPathnames";
import { useSocketContext } from "../../../../../context/socketContext";
import { useAppDispatch } from "../../../../../hooks/helpers/useAppDispatch";
import { logoutUser } from "../../../../../store/user/thunks/logoutUser";
import cn from "classnames";

import styles from "./styles.module.scss";

const UserMenu: React.FC = () => {
    const user = useAppSelector(selectUser);
    const [isActive, setIsActive] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    useClickOutside(menuRef, () => setIsActive(false));
    const { socket } = useSocketContext();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        navigate(LOGIN_ROUTE.PATH);
        await dispatch(logoutUser());
        socket?.disconnect();
    };

    return (
        <div
            className={cn(styles.menu, isActive && styles.active)}
            onClick={() => setIsActive((prev) => !prev)}
            ref={menuRef}
        >
            <Avatar
                className={styles.avatar}
                src={user.photo ? process.env.REACT_APP_SERVER_URL + "/users/" + user.photo : user.photo}
            />
            <BsChevronCompactDown className={styles.arrowIcon} />
            <ul className={cn(styles.menuList, isActive && styles.active)}>
                <li>
                    <Link className={styles.menuItemWrapper} to={`/${PROFILE_ROUTE.NAME}/${user.id}`}>
                        <CgProfile className={cn(styles.itemIcon, styles.profileIcon)} />
                        Profile
                    </Link>
                </li>
                <li onClick={handleLogout}>
                    <div className={styles.menuItemWrapper}>
                        <FiLogOut className={cn(styles.itemIcon, styles.logoutIcon)} />
                        Log out
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default UserMenu;
