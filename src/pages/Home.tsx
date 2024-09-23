import PostItem from "../components/PostItem";

const Home = () => {
    return (
        <>
            <h1 className="text-4xl text-center mb-10 font-bold">Blog Posts</h1>

            <div className="grid md:grid-cols-2 gap-x-8 gap-y-10">
                <PostItem />
                <PostItem />
                <PostItem />
                <PostItem />
                <PostItem />
            </div>
        </>
    );
};

export default Home;
