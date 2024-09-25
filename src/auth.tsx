import { useOutletContext } from "react-router-dom";

export type LoggedIn = null | {
    accessToken: string;
    user: { email: string; id: number };
};

export const auth = () => {
    const auth = JSON.parse(localStorage.getItem("access-token") ?? "{}");

    return auth.accessToken && auth.user ? auth : null;
};

export const useLoggedIn = () => {
    return useOutletContext<{
        loggedIn: LoggedIn;
        setLoggedIn: (loggedIn: LoggedIn) => LoggedIn;
    }>();
};
