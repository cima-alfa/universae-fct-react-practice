import { Link, useNavigate, useParams } from "react-router-dom";
import PostItem from "../components/PostItem";
import { useEffect, useState } from "react";
import { toLink } from "../routes";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [pages, setPages] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageNumbers, setPageNumbers] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();
    const { page } = useParams();

    useEffect(() => {
        setLoading(true);
        setError(null);
        setPosts([]);

        let _pageNumber = 1;

        if (typeof page !== "undefined") {
            _pageNumber = parseInt(page);
        }

        setPageNumber(_pageNumber);

        if (
            (_pageNumber <= 1 || _pageNumber.toString() !== page) &&
            location.pathname !== toLink("home")
        ) {
            navigate(toLink("home"), { replace: true });

            return;
        }

        fetch(
            `http://localhost:3000/posts?_limit=8&_page=${
                page ?? 1
            }&_sort=createdOn&_order=desc`
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.length < 1) {
                    navigate(toLink("home"), { replace: true });

                    return;
                }

                setLoading(false);
                setPosts(data);
            })
            .catch((error) => {
                setLoading(false);
                setError(error.message);
            });
    }, [page, navigate]);

    useEffect(() => {
        setPages(1);
        setPageNumbers([]);

        fetch("http://localhost:3000/posts")
            .then((res) => res.json())
            .then((pages) => {
                setPages(Math.ceil(pages.length / 8));

                const _pageNumbers = [];

                for (
                    let index = 1;
                    index <= Math.ceil(pages.length / 8);
                    index++
                ) {
                    _pageNumbers.push(index);
                }

                setPageNumbers(_pageNumbers);
            })
            .catch(() => true);
    }, []);

    return (
        <>
            <h1 className="text-4xl text-center mb-10 font-bold">Blog Posts</h1>

            <div
                className={`grid ${
                    posts.length >= 1 ? "md:grid-cols-2" : ""
                } gap-x-8 gap-y-10`}
            >
                {posts.length >= 1 ? (
                    posts.map((post, id) => (
                        <PostItem post={post} key={id} showSummary={true} />
                    ))
                ) : (
                    <>
                        {!error && (
                            <>
                                {loading ? (
                                    <div className="text-2xl text-center font-bold col-span-2">
                                        Loading...
                                    </div>
                                ) : (
                                    <PostItem />
                                )}
                            </>
                        )}

                        {error && (
                            <div className="text-2xl text-center font-bold text-red-800 col-span-2">
                                Could not load posts
                            </div>
                        )}
                    </>
                )}

                {!error && (
                    <div className="col-span-2">
                        <ul className="flex flex-wrap gap-3 justify-center">
                            {pages > 1 &&
                                pageNumbers.map((n) => (
                                    <li key={n}>
                                        <Link
                                            to={toLink("home", {
                                                page: n <= 1 ? null : n,
                                            })}
                                            className={`grid place-items-center p-1 rounded-full  w-8 h-8 border-b-2 hover:border-orange-700 hover:bg-orange-400 active:border-orange-800 active:bg-orange-500 transition-colors hover:text-white active:text-white  ${
                                                pageNumber === n
                                                    ? "font-bold bg-orange-300 border-orange-600 text-orange-950 "
                                                    : "bg-gray-300 border-gray-600"
                                            }`}
                                        >
                                            {n}
                                        </Link>
                                    </li>
                                ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
};

export default Home;
