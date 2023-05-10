import React, { useState, useRef, useCallback } from "react";
import Post from "../../../components/Post";
import PostForm from "../../../components/forms/PostForm";
import { usePosts } from "./usePosts";
import Alert from "../../../components/Alert";
import { ALERT } from "../../../constants/alert";
import Loader from "../../../components/Loader";

import styles from "./styles.module.scss";

const NewsPosts: React.FC = () => {
    const [page, setPage] = useState(0);
    const { handleAddPost, handleDelete, handleLike, posts, userId, isLoading, error, hasMore } = usePosts(page);

    const observer = useRef<IntersectionObserver | null>(null);
    const lastPostRef = useCallback(
        (node: HTMLLIElement) => {
            if (isLoading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prevPage) => prevPage + 1);
                }
            });
            if (node) observer.current?.observe(node);
        },
        [isLoading, hasMore]
    );

    return (
        <>
            <PostForm className={styles.form} handleSubmit={handleAddPost} />
            <ul className={styles.postsList}>
                {posts.map((post, index) => (
                    <React.Fragment key={post.id}>
                        {posts.length === index + 1 ? (
                            <li ref={lastPostRef}>
                                <Post
                                    post={post}
                                    handleLike={handleLike}
                                    handleDelete={handleDelete}
                                    currentUserId={userId}
                                />
                            </li>
                        ) : (
                            <li>
                                <Post
                                    post={post}
                                    handleLike={handleLike}
                                    handleDelete={handleDelete}
                                    currentUserId={userId}
                                />
                            </li>
                        )}
                    </React.Fragment>
                ))}
            </ul>
            {isLoading && <Loader className={styles.loader} />}
            {error && <Alert type={ALERT.ERROR}>{error}</Alert>}
            {!error && !isLoading && !hasMore && (
                <p className={styles.endListMessage}>There is no more content to show you</p>
            )}
        </>
    );
};

export default NewsPosts;
