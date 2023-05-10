import { io } from "socket.io-client";
import { useSocketContext } from "../../context/socketContext";
import { useCallback } from "react";

export const useSocketConnect = () => {
    const { setSocket } = useSocketContext();

    const connect = useCallback(
        (userId: string) => {
            const socket = io(process.env.REACT_APP_SOCKET_SERVER_URL || "http://localhost:9000");
            socket.emit("addUser", userId);
            setSocket(socket);
        },
        [setSocket]
    );

    return connect;
};
