import React from "react";
import PostForm from "../../../components/forms/PostForm";
import Post from "../../../components/Post";
import { useProfilePosts } from "./useProfilePosts";
import Loader from "../../../components/Loader";

import styles from "./styles.module.scss";

type Props = {
    userId: string;
};

const ProfilePosts: React.FC<Props> = ({ userId }) => {
    const { posts, isLoading, isOwner, handleAddPost, handleDelete, handleLike } = useProfilePosts(userId);
    return (
        <>
            {isOwner && <PostForm className={styles.postForm} handleSubmit={handleAddPost} />}
            {isLoading && <Loader className={styles.loader} />}
            {!isLoading && (
                <ul className={styles.postsList}>
                    {posts.map((post) => (
                        <li key={post.id}>
                            <Post
                                post={post}
                                handleDelete={handleDelete}
                                handleLike={handleLike}
                                currentUserId={userId}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default ProfilePosts;
