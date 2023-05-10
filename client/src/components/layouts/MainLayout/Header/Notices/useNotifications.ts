import { useEffect, useRef, useState } from "react";
import { deleteAllNotifications } from "../../../../../store/notifications/thunks/deleteAllNotifications";
import { deleteNotification } from "../../../../../store/notifications/thunks/deleteNotification";
import { addNotification } from "../../../../../store/notifications/notificationsSlice";
import { INotification } from "../../../../../models/Notification";
import { fetchNotifications } from "../../../../../store/notifications/thunks/fetchNotifications";
import { useAppSelector } from "../../../../../hooks/helpers/useAppSelector";
import { selectUser } from "../../../../../store/user/selectors";
import { selectNotifications } from "../../../../../store/notifications/selectors";
import { useAppDispatch } from "../../../../../hooks/helpers/useAppDispatch";
import { useSocketContext } from "../../../../../context/socketContext";
import { useLocation } from "react-router-dom";
import useClickOutside from "../../../../../hooks/helpers/useClickOutside";

export const useNotifications = () => {
    const [isActive, setIsActive] = useState(false);
    const noticesRef = useRef<HTMLDivElement | null>(null);
    useClickOutside(noticesRef, () => setIsActive(false));
    const location = useLocation();

    const { socket } = useSocketContext();
    const dispatch = useAppDispatch();
    const notifications = useAppSelector(selectNotifications);
    const user = useAppSelector(selectUser);

    useEffect(() => {
        const getNotifications = async () => {
            await dispatch(fetchNotifications(user.id));
        };
        getNotifications();
    }, [user.id, dispatch]);

    useEffect(() => {
        socket?.on("getNotification", (notification: INotification) => {
            dispatch(addNotification(notification));
        });
    }, [socket, dispatch]);

    const handleDeleteNotification = async (id: string) => {
        await dispatch(deleteNotification(id));
    };

    const handleDeleteAllNotifications = async () => {
        await dispatch(deleteAllNotifications(user.id));
    };

    useEffect(() => {
        setIsActive(false);
    }, [location]);

    const close = () => {
        setIsActive(false);
    };

    const open = () => {
        setIsActive(true);
    };

    return { isActive, open, close, handleDeleteAllNotifications, handleDeleteNotification, notifications, noticesRef };
};
