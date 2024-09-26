import { Link } from "react-router-dom";
import { toLink } from "../routes";
import Markdown from "react-markdown";
import { auth } from "../auth";

type Post = {
    title?: string;
    createdOn?: number;
    user?: string;
    id?: string | number;
    summary?: string;
    content?: string;
};

const PostItem = ({
    post,
    showSummary = false,
    readButton = true,
    userFunctions = false,
    h1 = false,
    setRefresh = undefined,
}: {
    post?: Post;
    showSummary?: boolean;
    readButton?: boolean;
    userFunctions?: boolean;
    h1?: boolean;
    setRefresh?: CallableFunction;
}) => {
    if (post) {
        const date = new Date(post.createdOn as number);
        const content = (
            <Markdown
                components={{
                    a: ({ children, href, title }) => {
                        return (
                            <a
                                children={children}
                                href={href}
                                title={title}
                                target="_blank"
                                rel={
                                    href &&
                                    new URL(href, location.origin).origin ===
                                        location.origin
                                        ? undefined
                                        : "nofollow"
                                }
                            />
                        );
                    },
                }}
            >
                {post.content}
            </Markdown>
        );

        const handleDelete = (id?: number | string, title?: string) => {
            if (confirm(`Delete post "${title}"?`)) {
                fetch(`http://localhost:3000/posts/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + auth()?.accessToken,
                    },
                })
                    .then(() => setRefresh && setRefresh(true))
                    .catch(() => true);
            }
        };

        const handleFocusForm = () => {
            (
                document.querySelector(
                    "#post-form input[name='title']"
                ) as HTMLElement
            )?.focus();
        };

        return (
            <div className="bg-orange-100 px-5 py-3 rounded-lg shadow flex-grow grid grid-rows-[auto_auto_1fr_auto]">
                {post.title && (
                    <>
                        {h1 ? (
                            <h1 className="text-4xl font-black mb-4 text-balance">
                                {post.title}
                            </h1>
                        ) : (
                            <h2 className="text-2xl font-black mb-2 text-balance">
                                {post.title}
                            </h2>
                        )}
                    </>
                )}

                {post.id !== "notfound" && (
                    <div>
                        <small className="text-sm font-serif text-gray-600">
                            Created on{" "}
                            <strong>{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</strong>{" "}
                            by <strong>{post.user}</strong>
                        </small>
                    </div>
                )}

                <div className="post-content">
                    {showSummary ? post.summary : content}
                </div>

                {post.id !== "mockup" && (
                    <div className="self-end flex justify-between">
                        {readButton && (
                            <Link
                                to={toLink("post", { postId: post.id })}
                                className="px-4 py-2 mt-5 font-semibold rounded bg-orange-300 text-orange-950 hover:text-white active:text-white border-b-2 border-orange-600 hover:border-orange-700 hover:bg-orange-400 active:border-orange-800 active:bg-orange-500 transition-colors"
                            >
                                Read Post
                            </Link>
                        )}

                        {userFunctions && (
                            <div className="flex gap-5">
                                <Link
                                    onClick={handleFocusForm}
                                    to={toLink("dashboard", {
                                        postId: post.id,
                                    })}
                                    className="px-4 py-2 mt-5 font-semibold rounded bg-green-400 text-green-950 hover:text-white active:text-white border-b-2 border-green-700 hover:border-green-800 hover:bg-green-500 active:border-green-900 active:bg-green-600 transition-colors"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleDelete(post.id, post.title);
                                    }}
                                    className="px-4 py-2 mt-5 font-semibold rounded bg-red-400 text-red-950 hover:text-white active:text-white border-b-2 border-red-700 hover:border-red-800 hover:bg-red-500 active:border-red-900 active:bg-red-600 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="bg-orange-100 px-5 py-3 rounded-lg shadow">
            <h2 className="text-2xl font-black mb-1">No posts were found</h2>

            <Link
                to={toLink("dashboard")}
                className="inline-block px-4 py-2 mt-5 font-semibold rounded bg-orange-300 text-orange-950 hover:text-white active:text-white border-b-2 border-orange-600 hover:border-orange-700 hover:bg-orange-400 active:border-orange-800 active:bg-orange-500 transition-colors"
            >
                Create Post
            </Link>
        </div>
    );
};

export default PostItem;
