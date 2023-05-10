interface Route {
    NAME: string;
    PATH: string;
}

export const MESSENGER_ROUTE: Route = {
    NAME: "messanger",
    PATH: "/messanger",
};
export const CHAT_ROUTE: Route = {
    NAME: "chat",
    PATH: MESSENGER_ROUTE.PATH + "/chat/:conversationId",
};
export const NEWS_ROUTE: Route = {
    NAME: "news",
    PATH: "/news",
};
export const FRIENDS_ROUTE: Route = {
    NAME: "friends",
    PATH: "/friends/:userId",
};
export const LOGIN_ROUTE: Route = {
    NAME: "login",
    PATH: "/login",
};
export const REGISTRATION_ROUTE: Route = {
    NAME: "registration",
    PATH: "/registration",
};
export const PROFILE_ROUTE: Route = {
    NAME: "profile",
    PATH: "/profile/:userId",
};
export const PROFILE_EDIT_ROUTE: Route = {
    NAME: "edit",
    PATH: "/edit",
};
