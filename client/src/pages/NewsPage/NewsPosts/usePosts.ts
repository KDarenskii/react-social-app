import { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/helpers/useAppSelector";
import { selectUser } from "../../../store/user/selectors";
import { useLike } from "../../../hooks/useLike";
import { useSocketContext } from "../../../context/socketContext";
import PostService from "../../../service/PostService";
import { IPost } from "../../../models/IPost";
import axios, { Canceler } from "axios";

const LIMIT = 2;

export const usePosts = (page: number) => {
    const user = useAppSelector(selectUser);
    const [posts, setPosts] = useState<IPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasMore, setHasMore] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const sendLike = useLike();
    const { socket } = useSocketContext();

    useEffect(() => {
        let cancel: Canceler;
        (async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await PostService.get({
                    cancelToken: new axios.CancelToken((c) => (cancel = c)),
                    params: {
                        page,
                        limit: LIMIT,
                        userId: user.id,
                    },
                });
                setPosts((prevPosts) => [...prevPosts, ...response.data]);
                setHasMore(response.data.length > 0);
            } catch (error) {
                if (axios.isCancel(error)) return;
                setError("Something went wrong");
            } finally {
                setIsLoading(false);
            }
        })();
        return () => cancel();
    }, [page, user.id]);

    const handleAddPost = async (event: React.FormEvent<HTMLFormElement>, text: string, photo: File | null) => {
        event.preventDefault();
        if (!text.trim() && !photo) return;

        const formData = new FormData();
        formData.append("text", text.trim());
        formData.append("userId", user.id);
        if (photo) formData.append("photo", photo);

        try {
            const response = await PostService.post(formData);
            setPosts((posts) => [response.data, ...posts]);
        } catch (error) {
            console.log(error);
        }
    };

    const handleLike = async (post: IPost) => {
        const updatedPost: IPost = JSON.parse(JSON.stringify(post));
        const isLiked = post.likes.includes(user.id);
        if (isLiked) {
            updatedPost.likes = updatedPost.likes.filter((like) => like !== user.id);
        } else {
            updatedPost.likes.push(user.id);
        }
        try {
            await Promise.all([PostService.update(updatedPost), sendLike(post, isLiked)]);
            setPosts((posts) => posts.map((currPost) => (currPost.id === post.id ? { ...updatedPost } : currPost)));
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (postId: string) => {
        try {
            await PostService.delete(postId);
            setPosts((posts) => posts.filter((post) => post.id !== postId));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        socket?.on("getLike", (senderId: string, post: IPost) => {
            if (post.likes.includes(senderId)) {
                setPosts((posts) =>
                    posts.map((currPost) =>
                        currPost.id === post.id
                            ? { ...currPost, likes: currPost.likes.filter((like) => like !== senderId) }
                            : currPost
                    )
                );
            } else {
                setPosts((posts) =>
                    posts.map((currPost) =>
                        currPost.id === post.id ? { ...currPost, likes: [...currPost.likes, senderId] } : currPost
                    )
                );
            }
        });
    }, [socket]);

    return { posts, handleAddPost, handleDelete, handleLike, userId: user.id, isLoading, error, hasMore };
};
