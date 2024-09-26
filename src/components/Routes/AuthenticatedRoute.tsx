import { Navigate, useLocation } from "react-router-dom";
import { auth } from "../../auth";
import { toLink } from "../../routes";
import { useEffect, useState } from "react";
import isEqual from "lodash.isequal";

const AuthenticatedRoute = ({
    children,
    redirect,
}: {
    children: React.ReactNode;
    redirect?: string;
}) => {
    const [authenticated, setAuthenticated] = useState(auth());
    const location = useLocation();

    useEffect(() => {
        fetch("http://localhost:3000/auth", {
            headers: {
                Authorization: "Bearer " + authenticated?.accessToken,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (!isEqual(data, authenticated)) {
                    if (typeof data !== "object") {
                        localStorage.removeItem("access-token");
                        setAuthenticated(null);

                        return;
                    }
                }
            })
            .catch(() => {});
    }, [authenticated]);

    return authenticated ? (
        children
    ) : (
        <Navigate
            to={`${toLink("login")}?redirect=${encodeURIComponent(
                redirect || location.pathname
            )}`}
            replace={true}
        />
    );
};

export default AuthenticatedRoute;
