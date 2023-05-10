import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { SocketContext } from ".";
import { useAppDispatch } from "../../hooks/helpers/useAppDispatch";
import { addFriend, addRequest, removeFollowing, removeFriend, removeRequest } from "../../store/user/userSlice";
import { IUser } from "../../models/User";

type Props = {
    children: React.ReactNode;
};

const SocketProvider: React.FC<Props> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        socket?.on("addRequest", (requestUser: IUser) => {
            dispatch(addRequest(requestUser.id));
        });
        socket?.on("addFriend", (friend: IUser) => {
            dispatch(addFriend(friend.id));
            dispatch(removeFollowing(friend.id));
        });
        socket?.on("removeRequest", (requestId) => {
            dispatch(removeRequest(requestId));
        });
        socket?.on("removeFriend", (friend: IUser) => {
            dispatch(removeFriend(friend.id));
        });
    }, [socket, dispatch]);

    return <SocketContext.Provider value={{ socket, setSocket }}>{children}</SocketContext.Provider>;
};

export default SocketProvider;
