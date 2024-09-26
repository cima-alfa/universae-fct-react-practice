import PostCollection from "../components/PostCollection";

const Home = () => {
    return (
        <>
            <h1
                className="text-4xl text-center mb-10 font-bold"
                id="post-collection"
            >
                Blog Posts
            </h1>

            <PostCollection to="home" urlPagination="home-paginated" />
        </>
    );
};

export default Home;
