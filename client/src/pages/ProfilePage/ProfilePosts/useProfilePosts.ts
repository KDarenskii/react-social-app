import { useEffect, useState } from "react";
import { IPost } from "../../../models/IPost";
import { selectUser } from "../../../store/user/selectors";
import { useAppSelector } from "../../../hooks/helpers/useAppSelector";
import { useLike } from "../../../hooks/useLike";
import { useSocketContext } from "../../../context/socketContext";
import PostService from "../../../service/PostService";

export const useProfilePosts = (userId: string) => {
    const user = useAppSelector(selectUser);
    const isOwner = user.id === userId;
    const [posts, setPosts] = useState<IPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const sendLike = useLike();
    const { socket } = useSocketContext();

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                const response = await PostService.getByUserId(userId);
                setPosts(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [userId]);

    const handleAddPost = async (event: React.FormEvent<HTMLFormElement>, text: string, photo: File | null) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("text", text);
        formData.append("userId", userId);
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

    return { posts, isLoading, handleAddPost, handleDelete, handleLike, isOwner, userId: user.id };
};
