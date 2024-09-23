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
            <Route path="/page?/:page?" element={<Home />} />
            <Route path="/post/:post" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Route>
    )
);
