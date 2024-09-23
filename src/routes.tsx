import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

export const routeList = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            <Route id="home" index element={<Home />} />
            <Route id="post" path="/:post" element={<Home />} />
            <Route id="dashboard" path="/dashboard" element={<Dashboard />} />
        </Route>
    )
);

const getRouteById = (
    id: string | number,
    routes = routeList.routes,
    path: string = ""
): string => {
    let finalPath = "#";

    for (const key in routes) {
        const route = routes[key];

        path = route.index ? path : route.path ?? path;

        finalPath =
            route.id === id
                ? path
                : route.children
                ? getRouteById(id, route.children, path)
                : "#";

        if (route.id === id) {
            break;
        }
    }
    console.log(finalPath);
    return finalPath;
};

export const route = getRouteById;
