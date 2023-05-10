import React from "react";
import Container from "../../../Container";
import { AiOutlineGlobal } from "react-icons/ai";
import Notices from "./Notices";
import UserMenu from "./UserMenu";

import styles from "./styles.module.scss";

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <Container>
                <div className={styles.wrapper}>
                    <div className={styles.titleWrapper}>
                        <h5 className={styles.title}>Social</h5>
                        <AiOutlineGlobal className={styles.titleIcon} />
                    </div>
                    <div className={styles.actionsWrapper}>
                        <Notices />
                        <UserMenu />
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default Header;
