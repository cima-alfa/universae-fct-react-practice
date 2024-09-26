import { Link, useNavigate, useParams } from "react-router-dom";
import PostItem from "../components/PostItem";
import { useEffect, useState } from "react";
import { toLink } from "../routes";
import { useRefresh } from "../hooks";

type PostCollection = {
    to: string;
    urlPagination?: boolean;
    userFunctions?: boolean;
    byUser?: string;
};

const PostCollection = ({
    to,
    urlPagination,
    byUser,
    userFunctions,
}: PostCollection) => {
    const { refresh, setRefresh } = useRefresh();
    const [refreshPagination, setRefreshPagination] = useState(false);
    const [posts, setPosts] = useState([]);
    const [pages, setPages] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageNumbers, setPageNumbers] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const { page: _page } = useParams();
    const [page, setPage] = useState("1");
    const [paginated, setPaginated] = useState(false);

    const handlePaginate = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();

        setPaginated(true);
        setPage((e.target as HTMLElement).dataset.page ?? "1");
    };

    const loadingOff = (delay: number = 250) => {
        setTimeout(() => setLoading(false), delay);
    };

    useEffect(() => {
        if (refresh) {
            setRefresh(false);
            return;
        }

        const _paginated = paginated;

        if (paginated) {
            setPaginated(false);
        }

        setLoading(true);
        setError(null);

        const _pageNumber = parseInt(urlPagination ? _page ?? "1" : page);

        setPageNumber(_pageNumber);

        if (
            urlPagination &&
            (_pageNumber <= 1 || _pageNumber.toString() !== _page) &&
            location.pathname !== toLink(to)
        ) {
            navigate(toLink(to), { replace: true });

            return;
        }

        fetch(
            `http://localhost:3000/posts?_limit=8&_page=${
                _page ?? page ?? 1
            }&_sort=createdOn&_order=desc${
                byUser !== undefined ? `&user=${encodeURI(byUser)}` : ""
            }`
        )
            .then((res) => res.json())
            .then((data) => {
                loadingOff();

                if (data.length < 1) {
                    if (urlPagination) {
                        navigate(toLink(to), { replace: true });
                    } else {
                        setRefreshPagination(true);
                    }

                    return;
                }

                setPosts(data);

                if (_paginated) {
                    const scrollToElement = document.querySelector(
                        "#post-collection"
                    ) as HTMLElement;

                    if (scrollToElement) {
                        window.scroll({
                            behavior: "smooth",
                            top: scrollToElement.offsetTop,
                        });
                    }
                }
            })
            .catch((error) => {
                loadingOff();
                setError(error.message);
            });
    }, [
        page,
        _page,
        navigate,
        to,
        urlPagination,
        byUser,
        paginated,
        refresh,
        setRefresh,
    ]);

    useEffect(() => {
        if (refreshPagination) {
            setRefreshPagination(false);
            return;
        }

        setPages(1);
        setPageNumbers([]);

        fetch(
            `http://localhost:3000/posts${
                byUser !== undefined ? `?user=${encodeURI(byUser)}` : ""
            }`
        )
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
    }, [byUser, refresh, refreshPagination]);

    return (
        <>
            {loading && (
                <div className="[html:has(&)]:overflow-clip fixed inset-0 bg-black bg-opacity-85 text-white grid place-items-center text-2xl text-center font-bold col-span-2">
                    Loading...
                </div>
            )}
            <div
                className={`grid ${
                    posts.length >= 1 ? "md:grid-cols-2" : ""
                } gap-x-8 gap-y-10`}
            >
                {posts.length >= 1 ? (
                    posts.map((post, id) => (
                        <PostItem
                            post={post}
                            key={id}
                            showSummary={true}
                            userFunctions={userFunctions}
                            setRefresh={setRefresh}
                        />
                    ))
                ) : (
                    <>
                        {!error && (
                            <div className="col-span-2">
                                <PostItem />
                            </div>
                        )}

                        {error && (
                            <div className="text-2xl text-center font-bold text-red-800 col-span-2">
                                Could not load posts
                            </div>
                        )}
                    </>
                )}

                {!error && pages > 1 && (
                    <div className="col-span-2">
                        <ul className="flex flex-wrap gap-3 justify-center">
                            {pageNumbers.map((n) => (
                                <li key={n}>
                                    {urlPagination ? (
                                        <Link
                                            onClick={() => setPaginated(true)}
                                            to={toLink(to, {
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
                                    ) : (
                                        <button
                                            onClick={handlePaginate}
                                            data-page={n}
                                            className={`grid place-items-center p-1 rounded-full  w-8 h-8 border-b-2 hover:border-orange-700 hover:bg-orange-400 active:border-orange-800 active:bg-orange-500 transition-colors hover:text-white active:text-white  ${
                                                pageNumber === n
                                                    ? "font-bold bg-orange-300 border-orange-600 text-orange-950 "
                                                    : "bg-gray-300 border-gray-600"
                                            }`}
                                        >
                                            {n}
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
};

export default PostCollection;
