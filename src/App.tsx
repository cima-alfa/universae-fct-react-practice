import { RouterProvider } from "react-router-dom";
import { routeList } from "./routes";

function App() {
    return <RouterProvider router={routeList} />;
}

export default App;
