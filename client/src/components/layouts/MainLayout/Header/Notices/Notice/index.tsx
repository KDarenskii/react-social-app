import React from "react";
import Avatar from "../../../../../Avatar";
import { INotification } from "../../../../../../models/Notification";
import cn from "classnames";
import { TiUserAdd } from "react-icons/ti";
import { NOTICE } from "../../../../../../constants/notice";
import { AiFillHeart, AiOutlineEye } from "react-icons/ai";

import styles from "./styles.module.scss";

type Props = {
    notice: INotification;
    deleteNotification: (id: string) => Promise<void>;
};

const Notification: React.FC<Props> = ({ notice, deleteNotification }) => {
    return (
        <div className={styles.notification}>
            <div className={styles.photoWrapper}>
                <Avatar
                    className={styles.avatar}
                    src={
                        notice.photoSrc
                            ? process.env.REACT_APP_SERVER_URL + "/users/" + notice.photoSrc
                            : notice.photoSrc
                    }
                />
                {notice.type === NOTICE.FRIEND_REQUEST && <TiUserAdd className={styles.noticeIcon} />}
                {notice.type === NOTICE.FRIEND_ACCEPT && <TiUserAdd className={cn(styles.noticeIcon, styles.accept)} />}
                {notice.type === NOTICE.LIKE && <AiFillHeart className={cn(styles.noticeIcon, styles.like)} />}
            </div>
            <div className={styles.info}>
                <h5 className={styles.title}>
                    <span className={styles.name}>
                        {notice.firstName} {notice.lastName}
                    </span>{" "}
                    {notice.type === NOTICE.FRIEND_REQUEST && "wants to be your friend"}
                    {notice.type === NOTICE.FRIEND_ACCEPT && "accepted your friend request"}
                    {notice.type === NOTICE.LIKE && "reacted to your post"}
                </h5>
                <div className={styles.date}>{new Date(notice.date).toLocaleString()}</div>
            </div>
            <button className={styles.markButton} onClick={() => deleteNotification(notice.id)}>
                <AiOutlineEye className={styles.markIcon} />
            </button>
        </div>
    );
};

export default Notification;
