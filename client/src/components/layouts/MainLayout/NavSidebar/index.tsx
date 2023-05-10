import React from "react";
import { BiUserCircle } from "react-icons/bi";
import { ImNewspaper } from "react-icons/im";
import { AiOutlineMessage } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FRIENDS_ROUTE, MESSENGER_ROUTE, NEWS_ROUTE, PROFILE_ROUTE } from "../../../../constants/routesPathnames";

import styles from "./styles.module.scss";

type Props = {
    userId: string;
};

const NavSidebar: React.FC<Props> = ({ userId }) => {
    return (
        <aside>
            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    <li className={styles.navItem}>
                        <Link className={styles.link} to={`/${PROFILE_ROUTE.NAME}/${userId}`}>
                            <BiUserCircle className={styles.navIcon} />
                            My profile
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link className={styles.link} to={NEWS_ROUTE.PATH}>
                            <ImNewspaper className={styles.navIcon} />
                            News
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link className={styles.link} to={MESSENGER_ROUTE.PATH}>
                            <AiOutlineMessage className={styles.navIcon} />
                            Messenger
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link className={styles.link} to={`/${FRIENDS_ROUTE.NAME}/${userId}`}>
                            <BsPeople className={styles.navIcon} />
                            Friends
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default NavSidebar;
