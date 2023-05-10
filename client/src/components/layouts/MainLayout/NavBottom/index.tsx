import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { ImNewspaper } from "react-icons/im";
import { AiOutlineMessage } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { FRIENDS_ROUTE, MESSENGER_ROUTE, NEWS_ROUTE, PROFILE_ROUTE } from "../../../../constants/routesPathnames";
import cn from "classnames";

import styles from "./styles.module.scss";

interface ILink {
    icon: JSX.Element;
    path: string;
    name: string;
    text: string;
}

type Props = {
    userId: string;
};

const BottomNav: React.FC<Props> = ({ userId }) => {
    const location = useLocation();

    const linksList: ILink[] = [
        {
            icon: <ImNewspaper className={styles.navIcon} />,
            path: NEWS_ROUTE.PATH,
            name: NEWS_ROUTE.NAME,
            text: "News",
        },
        {
            icon: <AiOutlineMessage className={styles.navIcon} />,
            path: MESSENGER_ROUTE.PATH,
            name: MESSENGER_ROUTE.NAME,
            text: "Messanger",
        },
        {
            icon: <BsPeople className={styles.navIcon} />,
            path: `/${FRIENDS_ROUTE.NAME}/${userId}`,
            name: FRIENDS_ROUTE.NAME,
            text: "Friends",
        },
        {
            icon: <BiUserCircle className={styles.navIcon} />,
            path: `/${PROFILE_ROUTE.NAME}/${userId}`,
            name: PROFILE_ROUTE.NAME,
            text: "My profile",
        },
    ];

    const activeIndex = linksList.findIndex((link) => location.pathname.includes(link.name));

    return (
        <nav className={styles.nav}>
            <ul className={styles.list}>
                {linksList.map((link, index) => (
                    <li key={link.path}>
                        <Link className={cn(styles.navItem, index === activeIndex && styles.active)} to={link.path}>
                            {link.icon}
                            {link.text}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default BottomNav;
