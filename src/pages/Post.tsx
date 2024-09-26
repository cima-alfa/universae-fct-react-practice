// import { useNavigate, useParams } from "react-router-dom";
// import PostItem from "../components/PostItem";
// import { useEffect, useState } from "react";
// import { toLink } from "../routes";

import { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostItem from "../components/PostItem";

const Post = () => {
    // const navigate = useNavigate();
    // const { page } = useParams();

    // useEffect(() => {
    //     let pageNumber: number = 0;

    //     if (typeof page !== "undefined") {
    //         pageNumber = parseInt(page);
    //     }

    //     if (
    //         (pageNumber === 0 || pageNumber.toString() !== page) &&
    //         location.pathname !== toLink("home")
    //     ) {
    //         navigate(toLink("home"));
    //     }
    // }, [page, navigate]);

    // const [posts, setPosts] = useState([]);

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

    useLayoutEffect(() => {
        fetch(`http://localhost:3000/posts/${postId}`)
            .then((res) => res.json())
            .then((data) => {
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
