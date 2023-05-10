import React from "react";
import { INotification } from "../../../../../../models/Notification";
import Notification from "../Notification";
import EmptyList from "../../../../../../pages/FridendsPage/EmptyList";
import cn from "classnames";

import styles from "./styles.module.scss";

type Props = {
    isActive: boolean;
    deleteAllNotifications: () => Promise<void>;
    deleteNotification: (id: string) => Promise<void>;
    notifications: INotification[];
};

const NotificationsMenu = React.forwardRef<HTMLDivElement, Props>(
    ({ isActive, deleteAllNotifications, deleteNotification, notifications }, ref) => {
        return (
            <div className={cn(styles.noticesMenu, isActive && styles.active)} ref={ref}>
                <header className={styles.header}>
                    <h6 className={styles.headerTitle}>Notifications</h6>
                    <button className={styles.markAllButton} onClick={deleteAllNotifications}>
                        Mark all as read
                    </button>
                </header>
                {notifications.length > 0 ? (
                    <ul className={styles.noticesList}>
                        {notifications.map((notice) => (
                            <li key={notice.id}>
                                <Notification notice={notice} deleteNotification={deleteNotification} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <EmptyList />
                )}
            </div>
        );
    }
);

export default NotificationsMenu;
