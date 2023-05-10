import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import Avatar from "../Avatar";
import cn from "classnames";
import { Link } from "react-router-dom";
import { IPost } from "../../models/IPost";
import { parseISO } from "../../helpers/parseISO";
import { PROFILE_ROUTE } from "../../constants/routesPathnames";

import styles from "./styles.module.scss";
import { usePost } from "./usePost";
import CheckAccess from "../CheckAccess";
import { ROLES } from "../../constants/roles";

type Props = {
    post: IPost;
    handleLike: (post: IPost) => Promise<void>;
    handleDelete: (postId: string) => Promise<void>;
    currentUserId: string;
};

const Post: React.FC<Props> = ({ post, handleLike, handleDelete, currentUserId }) => {
    const { likes, photoSrc, text, userId, date } = post;
    const isLiked = likes.includes(currentUserId);
    const { day, time } = parseISO(date);
    const { user } = usePost(currentUserId);

    return (
        <article className={styles.post}>
            <header className={styles.header}>
                <div className={styles.author}>
                    <Link className={styles.name} to={`/${PROFILE_ROUTE.NAME}/${userId}`}>
                        <Avatar
                            className={styles.avatar}
                            src={user.photo ? process.env.REACT_APP_SERVER_URL + "/users/" + user.photo : null}
                        />
                    </Link>
                    <div className={styles.title}>
                        <Link className={styles.name} to={`/${PROFILE_ROUTE.NAME}/${userId}`}>
                            {user.firstName} {user.lastName}
                        </Link>
                        <div className={styles.time}>
                            {day} at {time}
                        </div>
                    </div>
                </div>
                <CheckAccess allowedRoles={[ROLES.ADMIN]}>
                    <div className={styles.settings}>
                        <BsThreeDots className={styles.settingsIcon} />
                        <ul className={styles.settingsMenu}>
                            <li className={styles.settingsItem} onClick={() => handleDelete(post.id)}>
                                Удалить
                            </li>
                        </ul>
                    </div>
                </CheckAccess>
            </header>
            {text && <p className={styles.text}>{text}</p>}
            {photoSrc && (
                <img className={styles.img} src={process.env.REACT_APP_SERVER_URL + `/posts/${photoSrc}`} alt="" />
            )}
            <footer className={styles.footer}>
                <button
                    className={cn(styles.reactionButton, isLiked && styles.active)}
                    onClick={() => handleLike(post)}
                >
                    {isLiked ? (
                        <AiFillHeart className={cn(styles.likeIcon, styles.active)} />
                    ) : (
                        <AiOutlineHeart className={styles.likeIcon} />
                    )}
                    <div className={cn(styles.reactionCounter, isLiked && styles.active)}>{likes.length}</div>
                </button>
            </footer>
        </article>
    );
};

export default Post;
