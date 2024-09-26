import {
    createBrowserRouter,
    createRoutesFromElements,
    LoaderFunction,
    Route,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AuthenticatedRoute from "./components/Routes/AuthenticatedRoute";
import NotAuthenticatedRoute from "./components/Routes/NotAuthenticatedRoute";
import Post from "./pages/Post";

type Route = {
    name: string;
    path: string;
    view: () => JSX.Element;
    routeAuth?: boolean;
    loader?: boolean | LoaderFunction | undefined;
};

export const routes: Route[] = [
    { name: "home", path: "/page?/:page?", view: Home },
    { name: "post", path: "/post/:postId", view: Post },
    { name: "dashboard", path: "/dashboard", view: Dashboard, routeAuth: true },
    { name: "register", path: "/register", view: Register, routeAuth: false },
    { name: "login", path: "/login", view: Login, routeAuth: false },
];

export const routeNames = routes.reduce(
    (obj, { path, name }) => ({ ...obj, [name]: path }),
    {}
);

const wrapAuthenticatedRoute = (
    element: React.ReactNode,
    redirect = undefined
) => {
    return (
        <AuthenticatedRoute redirect={redirect}>{element}</AuthenticatedRoute>
    );
};

const wrapNotAuthenticatedRoute = (element: React.ReactNode) => {
    return <NotAuthenticatedRoute>{element}</NotAuthenticatedRoute>;
};

export const routeList = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            {routes.map((route) => (
                <Route
                    key={route.name}
                    id={route.name}
                    path={route.path}
                    element={
                        route.routeAuth === true ? (
                            wrapAuthenticatedRoute(<route.view />)
                        ) : route.routeAuth === false ? (
                            wrapNotAuthenticatedRoute(<route.view />)
                        ) : (
                            <route.view />
                        )
                    }
                    loader={route.loader ?? undefined}
                />
            ))}
        </Route>
    )
);

export const toLink = (name: string | string, params: object = {}) => {
    const _name = name as keyof typeof routeNames;

    let target: string = routeNames[_name];

    params = Object.fromEntries(
        Object.entries(params).filter((x) => {
            return !!x[1];
        })
    );

    for (const [key, val] of Object.entries(params)) {
        target = target.replace(new RegExp(":" + key + "\\??"), `${val}`);
    }

    target = target.replace(/:.+\?\/?/g, "");

    target = target.endsWith("/") ? target.slice(0, -1) : target;

    const removeUnusedSegments = (url: string): string => {
        return url.replace(/(.*)\/.+\?$/, (_m, p) => {
            return p.match(/(.*)\/.+\?$/) ? removeUnusedSegments(p) : p;
        });
    };

    target = removeUnusedSegments(target).replace("?", "");

    return target === "" ? "/" : target;
};
