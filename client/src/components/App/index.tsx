import React from "react";
import Router from "../Router";
import { useApp } from "./useApp";
import PageLoader from "../PageLoader";
import PageError from "../PageError";

const App: React.FC = () => {
    const { isLoading, error } = useApp();

    return (
        <>
            {isLoading && <PageLoader />}
            {error && <PageError message={error} />}
            {!isLoading && !error && <Router />}
        </>
    );
};

export default App;
