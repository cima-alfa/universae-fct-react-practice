import { Link } from "react-router-dom";
import { toLink } from "../routes";
import Markdown from "react-markdown";

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
}: {
    post?: Post;
    showSummary?: boolean;
}) => {
    if (post) {
        const date = new Date(post.createdOn as number);

        return (
            <div className="bg-orange-100 px-5 py-3 rounded-lg shadow flex-grow">
                <h2 className="text-2xl font-black mb-1">{post.title}</h2>

                <div>
                    <small className="text-sm font-serif text-gray-600">
                        Created on{" "}
                        <strong>{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</strong>{" "}
                        by <strong>{post.user}</strong>
                    </small>
                </div>

                <div className="post-content">
                    {showSummary ? (
                        post.summary
                    ) : (
                        <Markdown>{post.content}</Markdown>
                    )}
                </div>

                {post.id !== "mockup" && (
                    <Link
                        to={toLink("post", { post: post.id })}
                        className="inline-block px-4 py-2 mt-5 font-semibold rounded bg-orange-300 text-orange-950 hover:text-white active:text-white border-b-2 border-orange-600 hover:border-orange-700 hover:bg-orange-400 active:border-orange-800 active:bg-orange-500 transition-colors"
                    >
                        Read Post
                    </Link>
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
