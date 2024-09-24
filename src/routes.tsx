import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";

const routes = [
    { name: "home", path: "/page?/:page?", view: Home },
    { name: "post", path: "/post/:post", view: Home },
    { name: "dashboard", path: "/dashboard", view: Dashboard },
    { name: "register", path: "/register", view: Register },
    { name: "login", path: "/login", view: Login },
];

export const routeNames = routes.reduce(
    (obj, { path, name }) => ({ ...obj, [name]: path }),
    {}
);

export const routeList = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            {routes.map((route) => (
                <Route
                    key={route.name}
                    id={route.name}
                    path={route.path}
                    element={<route.view />}
                />
            ))}
        </Route>
    )
);

export const toLink = (name: string | string, params = {}) => {
    const _name = name as keyof typeof routeNames;

    let target: string = routeNames[_name];

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

    return target;
};
