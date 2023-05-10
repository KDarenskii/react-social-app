import { RootState } from "..";

export const selectNotifications = (state: RootState) => state.notifications.list;
