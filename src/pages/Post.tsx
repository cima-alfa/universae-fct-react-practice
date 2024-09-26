// import { useNavigate, useParams } from "react-router-dom";
// import PostItem from "../components/PostItem";
// import { useEffect, useState } from "react";
// import { toLink } from "../routes";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostItem from "../components/PostItem";

const Post = () => {
    // const navigate = useNavigate();

    // useEffect(() => {
    //     fetch("http://localhost:3000/posts")
    //         .then((res) => res.json())
    //         .then((data) => setPosts(data));
    // }, []);

    type Post = {
        title?: string;
        createdOn?: number;
        user?: string;
        id?: string | number;
        summary?: string;
        content?: string;
    };

    const [post, setPost] = useState<undefined | Post>(undefined);

    const { postId } = useParams();

    useEffect(() => {
        fetch(`http://localhost:3000/posts/${postId}`)
            .then((res) => res.json())
            .then((data) => {
                if (
                    typeof data !== "object" ||
                    Object.entries(data).length <= 1
                ) {
                    setPost({
                        title: "Post not found",
                        content: "The post you are looking for doesn't exist.",
                        id: "notfound",
                    });

                    return;
                }

                setPost(data);
            })
            .catch(() => true);
    }, [postId]);

    return (
        <>
            <PostItem post={post} readButton={false} h1={true} />
        </>
    );
};

export default Post;
