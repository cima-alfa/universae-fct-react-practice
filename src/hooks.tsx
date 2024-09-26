import { useOutletContext } from "react-router-dom";

export const useRefresh = () => {
    return useOutletContext<{
        refresh: boolean;
        setRefresh: (refresh: boolean) => boolean;
    }>();
};
