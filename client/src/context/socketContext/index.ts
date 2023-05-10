import { SetStateAction, Dispatch, createContext, useContext } from "react";
import { Socket } from "socket.io-client";

interface SocketState {
    socket: Socket | null;
    setSocket: Dispatch<SetStateAction<Socket | null>>;
}

export const SocketContext = createContext<SocketState>({} as SocketState);
export const useSocketContext = () => useContext(SocketContext);
