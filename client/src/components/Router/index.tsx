import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
    NEWS_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    MESSENGER_ROUTE,
    FRIENDS_ROUTE,
    PROFILE_ROUTE,
    CHAT_ROUTE,
    PROFILE_EDIT_ROUTE,
} from "../../constants/routesPathnames";
import MainLayout from "../layouts/MainLayout";
import LoginPage from "../../pages/LoginPage";
import RegistrationPage from "../../pages/RegistrationPage";
import NewsPage from "../../pages/NewsPage";
import MessangerPage from "../../pages/MessangerPage";
import FriendsPage from "../../pages/FridendsPage";
import ProtectedRoute from "./ProtectedRoute";
import { ROLES } from "../../constants/roles";
import ProfilePage from "../../pages/ProfilePage";
import Chat from "../../pages/MessangerPage/Chat";
import EditProfilePage from "../../pages/EditProfilePage";

const Router: React.FC = () => {
    return (
        <Routes>
            <Route element={<ProtectedRoute roles={[ROLES.USER, ROLES.ADMIN]} />}>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Navigate to={NEWS_ROUTE.PATH} />} />
                    <Route path={MESSENGER_ROUTE.PATH}>
                        <Route index element={<MessangerPage />} />
                        <Route path={CHAT_ROUTE.PATH} element={<Chat />} />
                    </Route>
                    <Route path={NEWS_ROUTE.PATH} element={<NewsPage />} />
                    <Route path={FRIENDS_ROUTE.PATH} element={<FriendsPage />} />
                    <Route path={PROFILE_ROUTE.PATH} element={<ProfilePage />} />
                    <Route path={PROFILE_EDIT_ROUTE.PATH} element={<EditProfilePage />} />
                </Route>
            </Route>
            <Route path={LOGIN_ROUTE.PATH} element={<LoginPage />} />
            <Route path={REGISTRATION_ROUTE.PATH} element={<RegistrationPage />} />
        </Routes>
    );
};

export default Router;
