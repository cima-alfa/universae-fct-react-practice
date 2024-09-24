import { useNavigate, useParams } from "react-router-dom";
import PostItem from "../components/PostItem";
import { useEffect, useState } from "react";

const Home = () => {
    const navigate = useNavigate();
    const { page } = useParams();

    useEffect(() => {
        let pageNumber: number = 0;

        if (typeof page !== "undefined") {
            pageNumber = parseInt(page);
        }

        if (
            (pageNumber === 0 || pageNumber.toString() !== page) &&
            location.pathname !== "/"
        ) {
            navigate("/");
        }
    }, [page, navigate]);

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/posts")
            .then((res) => res.json())
            .then((data) => setPosts(data));
    }, []);

    return (
        <>
            <h1 className="text-4xl text-center mb-10 font-bold">Blog Posts</h1>

            <div
                className={`grid ${
                    Object.keys(posts).length !== 0 ? "md:grid-cols-2" : ""
                } gap-x-8 gap-y-10`}
            >
                {Object.keys(posts).length !== 0 ? (
                    posts.map((post, id) => <PostItem post={post} key={id} />)
                ) : (
                    <PostItem post={{ noneFound: true }} />
                )}
            </div>
        </>
    );
};

export default Home;
