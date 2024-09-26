import { Link } from "react-router-dom";
import { toLink } from "../routes";

const NotFound = () => {
    return (
        <>
            <h1 className="text-4xl text-center mb-10 font-bold">
                Page not found
            </h1>
            <p>
                Go to the{" "}
                <Link to={toLink("home")} className="underline">
                    homepage
                </Link>
            </p>
        </>
    );
};

export default NotFound;
