import React from "react";
import Avatar from "../../../components/Avatar";
import { HiOutlineUserAdd } from "react-icons/hi";
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader";
import EmptyList from "../EmptyList";
import { PROFILE_ROUTE } from "../../../constants/routesPathnames";
import { useFollow } from "../../../hooks/friends/useFollow";
import { useCandidates } from "./useCandidates";

import styles from "./styles.module.scss";

const Candidates: React.FC = () => {
    const handleFollow = useFollow();
    const { isLoading, users, friends } = useCandidates();

    return (
        <>
            {isLoading && <Loader className={styles.loader} />}
            {!isLoading && users.length < 1 && <EmptyList />}
            {!isLoading && users.length > 0 && (
                <ul className={styles.usersList}>
                    {users.map((candidate) => (
                        <li className={styles.userItem} key={candidate.id}>
                            <Link to={`/${PROFILE_ROUTE.NAME}/${candidate.id}`}>
                                <Avatar
                                    className={styles.avatar}
                                    imageClassName={styles.avatarImage}
                                    src={
                                        candidate.photo
                                            ? process.env.REACT_APP_SERVER_URL + "/users/" + candidate.photo
                                            : candidate.photo
                                    }
                                />
                            </Link>
                            <div className={styles.wrapper}>
                                <div className={styles.info}>
                                    <Link to={`/${PROFILE_ROUTE.NAME}/${candidate.id}`} className={styles.name}>
                                        {candidate.firstName} {candidate.lastName}
                                    </Link>
                                    <div className={styles.subtitle}>
                                        {candidate.friends.filter((friend) => friends.includes(friend)).length} mutural
                                        friends
                                    </div>
                                </div>
                                <button className={styles.addButton} onClick={() => handleFollow(candidate)}>
                                    <HiOutlineUserAdd className={styles.addIcon} />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default Candidates;
