import { Link } from "react-router-dom";

const PostItem = () => {
    return (
        <div className="bg-orange-100 px-5 py-3 rounded-lg shadow">
            <h2 className="text-2xl font-black mb-1">Post</h2>
            <div>
                <small className="text-sm font-serif text-gray-600">
                    Created on <strong>#date</strong> by <strong>#user</strong>
                </small>
            </div>
            <p className="mt-3">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo
                quidem esse eius tempore vel est eos minima unde nulla? Saepe
                similique reprehenderit, unde deserunt illo pariatur sequi vero
                ea necessitatibus quae eligendi error illum dignissimos fugit.
                Incidunt ab corporis adipisci alias dolor porro, fugit esse,
                cumque iste commodi neque molestias omnis...
            </p>
            <Link
                to="/"
                className="inline-block px-4 py-2 mt-5 font-semibold rounded bg-orange-300 text-orange-950 hover:text-white border-b-2 border-orange-600 hover:border-orange-700 hover:bg-orange-400 active:border-orange-800 active:bg-orange-500 transition-colors"
            >
                Read Post
            </Link>
        </div>
    );
};

export default PostItem;
