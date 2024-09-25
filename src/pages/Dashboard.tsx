import { useLocation } from "react-router-dom";
import PostForm from "../components/PostForm";

const Dashboard = () => {
    const location = useLocation();

    return (
        <>
            <h1 className="text-4xl text-center mb-10 font-bold">Dashboard</h1>

            {location.state?.dashboardMessage && (
                <p className="mb-10 font-bold text-green-950 bg-green-300 border-green-600 border py-2 px-3 rounded">
                    {location.state.dashboardMessage}
                </p>
            )}

            <PostForm />
        </>
    );
};

export default Dashboard;
