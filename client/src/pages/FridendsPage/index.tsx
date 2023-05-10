import React, { useState } from "react";
import ActionButton from "../../components/ui/ActionButton";
import cn from "classnames";
import { selectUser } from "../../store/user/selectors";
import { useAppSelector } from "../../hooks/helpers/useAppSelector";
import Friends from "./Friends";
import Candidates from "./Candidates";
import CandidatesSearch from "./CandidatesSearch";
import Followings from "./Followings";
import Requests from "./Requests";
import { useSocketContext } from "../../context/socketContext";
import { useParams } from "react-router-dom";

import styles from "./styles.module.scss";

const FriendsPage: React.FC = () => {
    const user = useAppSelector(selectUser);
    const { userId = "" } = useParams();
    const isOwner = user.id === userId;

    const { socket } = useSocketContext();

    const [isSearching, setIsSearching] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className={styles.pageWrapper}>
            <header className={styles.header}>
                {isOwner ? (
                    <>
                        <div className={styles.headerWrapper}>
                            {!isSearching && (
                                <div className={styles.tabs}>
                                    <button
                                        className={cn(styles.tabButton, activeTab === 0 && styles.active)}
                                        onClick={() => setActiveTab(0)}
                                    >
                                        Friends: {user.friends.length}
                                    </button>
                                    <button
                                        className={cn(styles.tabButton, activeTab === 1 && styles.active)}
                                        onClick={() => setActiveTab(1)}
                                    >
                                        Followings: {user.followings.length}
                                    </button>
                                    <button
                                        className={cn(styles.tabButton, activeTab === 2 && styles.active)}
                                        onClick={() => setActiveTab(2)}
                                    >
                                        Requests: {user.requests.length}
                                    </button>
                                </div>
                            )}
                            <ActionButton
                                className={styles.findButton}
                                colorType="success"
                                onClick={() => setIsSearching((prev) => !prev)}
                            >
                                {isSearching ? "My friends" : "Find friends"}
                            </ActionButton>
                        </div>
                        {isSearching && <CandidatesSearch wrapperClassName={styles.searchWrapper} />}
                    </>
                ) : (
                    <div className={styles.title}>All friends</div>
                )}
            </header>
            {isOwner ? (
                isSearching ? (
                    <Candidates />
                ) : (
                    <>
                        {activeTab === 0 && <Friends user={user} isOwner={isOwner} />}
                        {activeTab === 1 && <Followings user={user} />}
                        {activeTab === 2 && <Requests user={user} socket={socket} />}
                    </>
                )
            ) : (
                <Friends user={user} isOwner={isOwner} />
            )}
        </div>
    );
};

export default FriendsPage;
