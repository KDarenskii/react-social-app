import React from "react";
import { BsFillCameraFill } from "react-icons/bs";
import cn from "classnames";

import styles from "./styles.module.scss";

type Props = {
    src?: string | null;
    className?: string;
    imageClassName?: string;
    iconClassName?: string;
    isOnline?: boolean;
};

const Avatar: React.FC<Props> = ({ className, imageClassName, iconClassName, src, isOnline }) => {
    return (
        <div className={cn(styles.avatar, className)}>
            {src ? (
                <img className={cn(styles.img, imageClassName)} src={src} alt="Avatar" />
            ) : (
                <BsFillCameraFill className={cn(styles.placeholder, imageClassName)} />
            )}
            {isOnline && <div className={cn(styles.onlineIcon, iconClassName)}></div>}
        </div>
    );
};

export default Avatar;
