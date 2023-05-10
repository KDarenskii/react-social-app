import React from "react";
import { INotification } from "../../../../../../models/Notification";
import Notification from "../Notification";
import cn from "classnames";

import styles from "./styles.module.scss";
import { AiOutlineLeft } from "react-icons/ai";
import EmptyList from "../../../../../../pages/FridendsPage/EmptyList";

type Props = {
    isActive: boolean;
    deleteAllNotifications: () => Promise<void>;
    deleteNotification: (id: string) => Promise<void>;
    notifications: INotification[];
    close: () => void;
};

const NotificationsSiderbar: React.FC<Props> = ({
    isActive,
    deleteAllNotifications,
    deleteNotification,
    notifications,
    close,
}) => {
    return (
        <aside className={cn(styles.sidebar, isActive && styles.active)}>
            <header className={styles.header}>
                <button className={styles.backBtn} onClick={close}>
                    <AiOutlineLeft className={styles.backIcon} />
                </button>
                <h6 className={styles.title}>Notifications</h6>
                <button className={styles.clearBtn} onClick={deleteAllNotifications}>
                    Clear all
                </button>
            </header>
            <ul className={styles.list}>
                {notifications.length > 0 ? (
                    <>
                        {notifications.map((notice) => (
                            <li key={notice.id}>
                                <Notification notice={notice} deleteNotification={deleteNotification} />
                            </li>
                        ))}
                    </>
                ) : (
                    <EmptyList message="You have no notifications" />
                )}
            </ul>
        </aside>
    );
};

export default NotificationsSiderbar;
