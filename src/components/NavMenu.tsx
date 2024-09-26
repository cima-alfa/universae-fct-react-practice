import NavLink from "../components/NavLink";
import { auth, LoggedIn } from "../auth";
import { toLink } from "../routes";
import { useNavigate } from "react-router-dom";
import isEqual from "lodash.isequal";
import { useEffect } from "react";

const NavMenu = ({
    loggedIn,
    setLoggedIn,
}: {
    loggedIn: LoggedIn;
    setLoggedIn: CallableFunction;
}) => {
    const navigate = useNavigate();

    const handleLogout = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();

        localStorage.removeItem("access-token");

        setLoggedIn(auth());

        navigate(toLink("login"), { replace: true });
    };

    useEffect(() => {
        if (!isEqual(loggedIn, auth())) {
            setLoggedIn(auth());
        }
    });

    return (
        <nav className="grid items-center">
            <ul className="flex gap-4 items-center">
                <li className="grid">
                    <NavLink to="home">Home</NavLink>
                </li>
                {loggedIn && (
                    <>
                        <li className="grid">
                            <NavLink to="dashboard">Dashboard</NavLink>
                        </li>
                        <li className="grid">
                            <button
                                onClick={handleLogout}
                                className="grid leading-none px-3 py-3 rounded border-b-2 border-transparent hover:border-orange-700 hover:bg-orange-400 hover:text-white transition-colors"
                            >
                                Logout
                            </button>
                        </li>
                    </>
                )}
                {!loggedIn && (
                    <>
                        <li className="grid">
                            <NavLink to="register">Register</NavLink>
                        </li>
                        <li className="grid">
                            <NavLink to="login">Login</NavLink>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default NavMenu;
