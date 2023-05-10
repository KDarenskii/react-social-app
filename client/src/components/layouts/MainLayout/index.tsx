import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Container from "../../Container";
import NavSidebar from "./NavSidebar";
import InfoSidebar from "./InfoSidebar";
import { CHAT_ROUTE } from "../../../constants/routesPathnames";
import { useAppSelector } from "../../../hooks/helpers/useAppSelector";
import { selectUser } from "../../../store/user/selectors";
import Responsive from "../../Responsive";
import { BREAKPOINT } from "../../../constants/sizeBreakpoints";
import BottomNav from "./NavBottom";

import styles from "./styles.module.scss";

const MainLayout: React.FC = () => {
    const location = useLocation();
    const user = useAppSelector(selectUser);

    return (
        <div className={styles.layout}>
            <Header />
            <Container>
                <div className={styles.wrapper}>
                    <Responsive breakpoint={BREAKPOINT.MOBILE}>
                        <NavSidebar userId={user.id} />
                    </Responsive>
                    <main className={styles.main}>
                        <Outlet />
                    </main>
                    <Responsive breakpoint={BREAKPOINT.TABLET}>
                        <InfoSidebar />
                    </Responsive>
                </div>
            </Container>
            {!location.pathname.includes(CHAT_ROUTE.NAME) && (
                <Responsive breakpoint={BREAKPOINT.MOBILE} type="min">
                    <BottomNav userId={user.id} />
                </Responsive>
            )}
        </div>
    );
};

export default MainLayout;
