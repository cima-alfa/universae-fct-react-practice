import { Navigate } from "react-router-dom";
import { auth } from "../../auth";
import { toLink } from "../../routes";

const NotAuthenticatedRoute = ({ children }: { children: React.ReactNode }) => {
    const authenticated = auth();

    return !authenticated ? (
        children
    ) : (
        <Navigate to={toLink("dashboard")} replace={true} />
    );
};

export default NotAuthenticatedRoute;
