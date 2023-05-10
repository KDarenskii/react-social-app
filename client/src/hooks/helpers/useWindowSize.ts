import { useEffect, useState } from "react";
import { getWindowSize } from "../../helpers/getWindowSize";

const { width, height } = getWindowSize();
const initialState = { width, height };

export const useWindowSize = () => {
    const [size, setSize] = useState(initialState);

    useEffect(() => {
        const handleResize = () => {
            const { width, height } = getWindowSize();
            setSize({ width, height });
        };
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return { width: size.width, height: size.height };
};
