import { Link, Outlet } from "react-router-dom";
import NavLink from "../components/NavLink";
import { useEffect, useState } from "react";

const MainLayout = () => {
    const [loggedIn, setLoggedIn] = useState<
        boolean | { email: string; id: number }
    >(false);

    useEffect(() => {
        const auth = JSON.parse(localStorage.getItem("access-token") ?? "{}");

        if (auth.accessToken) {
            fetch("http://localhost:3000/440/auth", {
                headers: {
                    authorization: "Bearer " + (auth.accessToken ?? ""),
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    if (typeof data === "object") {
                        setLoggedIn(data);
                    }
                });
        }

        console.log("test");
    }, []);

    return (
        <div className="grid grid-rows-[auto_1fr_auto] min-h-[calc(100dvh-(1.25rem*2))] w-full max-w-screen-lg mx-auto bg-gray-100 rounded-lg shadow-md">
            <header className="flex items-center justify-between px-5 h-20">
                <Link to="home" className="text-2xl font-black">
                    React<span className="text-blue-700">Blog</span>
                </Link>

                <nav className="grid items-center">
                    <ul className="flex gap-4">
                        <li>
                            <NavLink to="home">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="dashboard">Dashboard</NavLink>
                        </li>
                        {!loggedIn && (
                            <>
                                <li>
                                    <NavLink to="register">Register</NavLink>
                                </li>
                                <li>
                                    <NavLink to="login">Login</NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </header>

            <main className="py-5 mx-5 border-y border-blue-200">
                <Outlet />
            </main>

            <footer className="p-5 text-center text-xs font-bold">
                &copy; {new Date().getFullYear()}
            </footer>
        </div>
    );
};

export default MainLayout;
