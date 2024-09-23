import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./assets/app.css";

const removeTrailingSlash = () => {
    const url = new URL(location.toString());

    if (url.pathname.endsWith("/") && url.pathname !== "/") {
        url.pathname = url.pathname.slice(0, -1);

        location.replace(url);
    }
};

removeTrailingSlash();

createRoot(document.getElementById("app")!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
