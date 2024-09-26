import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { auth, LoggedIn } from "../auth";
import NavMenu from "../components/NavMenu";

const MainLayout = () => {
    const [loggedIn, setLoggedIn] = useState<LoggedIn>(auth());
    const [refresh, setRefresh] = useState<boolean>(false);

    return (
        <div className="grid grid-rows-[auto_1fr_auto] min-h-[calc(100dvh-(1.25rem*2))] w-full max-w-screen-lg mx-auto bg-gray-100 rounded-lg shadow-md">
            <header className="flex items-center justify-between px-5 h-20">
                <Link to="home" className="text-2xl font-black">
                    React<span className="text-blue-700">Blog</span>
                </Link>

                <NavMenu loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            </header>

            <main className="py-5 mx-5 border-y border-blue-200">
                <Outlet
                    context={
                        {
                            loggedIn: loggedIn,
                            setLoggedIn: setLoggedIn,
                            refresh: refresh,
                            setRefresh: setRefresh,
                        } satisfies {
                            loggedIn: LoggedIn;
                            setLoggedIn: typeof setLoggedIn;
                            refresh: boolean;
                            setRefresh: typeof setRefresh;
                        }
                    }
                />
            </main>

            <footer className="p-5 text-center text-xs font-bold">
                &copy; {new Date().getFullYear()}
            </footer>
        </div>
    );
};

export default MainLayout;
