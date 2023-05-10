import React from "react";
import { useWindowSize } from "../hooks/helpers/useWindowSize";
import { BREAKPOINT } from "../constants/sizeBreakpoints";

type Props = {
    children: React.ReactNode;
    breakpoint: BREAKPOINT;
    type?: "max" | "min";
};

const Responsive: React.FC<Props> = ({ children, breakpoint, type }) => {
    const { width } = useWindowSize();
    if (type && type === "min") {
        return <>{width < breakpoint ? children : null}</>;
    }
    return <>{width > breakpoint ? children : null}</>;
};

export default Responsive;
