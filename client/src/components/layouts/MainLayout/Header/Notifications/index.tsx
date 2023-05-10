import React from "react";
import { BiBell } from "react-icons/bi";
import Responsive from "../../../../Responsive";
import { BREAKPOINT } from "../../../../../constants/sizeBreakpoints";
import NotificationsMenu from "./NotificationsMenu";
import NotificationsSiderbar from "./NotificationsSidebar";
import { useNotifications } from "./useNotifications";
import cn from "classnames";

import styles from "./styles.module.scss";

const Notifications: React.FC = () => {
    const { isActive, close, open, notifications, handleDeleteAllNotifications, handleDeleteNotification, noticesRef } =
        useNotifications();

    return (
        <div className={styles.notices}>
            <button className={cn(styles.noticeButton, isActive && styles.active)} onClick={open}>
                <BiBell className={styles.bellIcon} />
                {notifications.length > 0 && <div className={styles.noticeCounter}>{notifications.length}</div>}
            </button>
            <Responsive breakpoint={BREAKPOINT.MOBILE_MEDIUM}>
                <NotificationsMenu
                    deleteAllNotifications={handleDeleteAllNotifications}
                    deleteNotification={handleDeleteNotification}
                    isActive={isActive}
                    ref={noticesRef}
                    notifications={notifications}
                />
            </Responsive>
            <Responsive breakpoint={BREAKPOINT.MOBILE_MEDIUM} type="min">
                <NotificationsSiderbar
                    deleteAllNotifications={handleDeleteAllNotifications}
                    deleteNotification={handleDeleteNotification}
                    isActive={isActive}
                    notifications={notifications}
                    close={close}
                />
            </Responsive>
        </div>
    );
};

export default Notifications;
