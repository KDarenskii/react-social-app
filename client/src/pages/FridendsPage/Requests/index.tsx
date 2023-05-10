import React, { useEffect, useState } from "react";
import { IUser } from "../../../models/User";
import Avatar from "../../../components/Avatar";
import { Link } from "react-router-dom";
import { MESSENGER_ROUTE, PROFILE_ROUTE } from "../../../constants/routesPathnames";
import UserService from "../../../service/UserService";
import cn from "classnames";
import { useAppDispatch } from "../../../hooks/helpers/useAppDispatch";
import { Socket } from "socket.io-client";
import { deleteRequest } from "../../../store/user/thunks/deleteRequest";
import EmptyList from "../EmptyList";
import Loader from "../../../components/Loader";
import { useAcceptRequest } from "../../../hooks/friends/useAcceptRequest";

import styles from "./styles.module.scss";

type Props = {
    user: IUser;
    socket: Socket | null;
};

const Requests: React.FC<Props> = ({ user, socket }) => {
    const [requestUsers, setRequestUsers] = useState<IUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useAppDispatch();
    const acceptRequest = useAcceptRequest();

    useEffect(() => {
        setRequestUsers((prev) => prev.filter((request) => user.requests.includes(request.id)));
    }, [user.requests]);

    useEffect(() => {
        socket?.on("removeRequest", (requestId: string) => {
            setRequestUsers((prev) => prev.filter((requestUser) => requestUser.id !== requestId));
        });
    }, [socket]);

    useEffect(() => {
        socket?.on("addRequest", (requestUser: IUser) => {
            setRequestUsers((prev) => [requestUser, ...prev]);
        });
    }, [socket, dispatch]);

    useEffect(() => {
        setIsLoading(true);
        const fetchRequests = async () => {
            try {
                const response = await UserService.getRequests(user.id);
                setRequestUsers(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchRequests();
    }, [user.id]);

    const handleDeclineRequest = async (requestId: string) => {
        await dispatch(deleteRequest({ requestId, userId: user.id }));
    };

    return (
        <>
            {isLoading && <Loader className={styles.loader} />}
            {!isLoading && requestUsers.length < 1 && <EmptyList />}
            {!isLoading && requestUsers.length > 0 && (
                <ul className={styles.requestsList}>
                    {requestUsers.map((requestUser) => (
                        <li className={styles.requestItem} key={requestUser.id}>
                            <Link to={`/${PROFILE_ROUTE.NAME}/${requestUser.id}`}>
                                <Avatar
                                    className={styles.avatar}
                                    src={
                                        user.photo
                                            ? process.env.REACT_APP_SERVER_URL + "/users/" + user.photo
                                            : user.photo
                                    }
                                />
                            </Link>
                            <div className={styles.content}>
                                <Link className={styles.name} to={`/${PROFILE_ROUTE.NAME}/${requestUser.id}`}>
                                    {requestUser.firstName} {requestUser.lastName}
                                </Link>
                                <Link className={styles.messageLink} to={MESSENGER_ROUTE.PATH}>
                                    Write message
                                </Link>
                                <div className={styles.actions}>
                                    <button
                                        className={styles.actionButton}
                                        onClick={() => acceptRequest(user, requestUser)}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        className={cn(styles.actionButton, styles.transparent)}
                                        onClick={() => handleDeclineRequest(requestUser.id)}
                                    >
                                        Decline
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default Requests;
