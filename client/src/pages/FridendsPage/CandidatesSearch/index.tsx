import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import cn from "classnames";
import { useSearchParams } from "react-router-dom";
import { useDebouncedCallback } from "../../../hooks/helpers/useDebouncedCallback";

import styles from "./styles.module.scss";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    wrapperClassName?: string;
}

const CandidatesSearch: React.FC<Props> = ({ className, wrapperClassName, ...rest }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [value, setValue] = useState(searchParams.get("search") || "");

    const debouncedSearch = useDebouncedCallback((value: string) => {
        value ? searchParams.set("search", value) : searchParams.delete("search");
        setSearchParams(searchParams);
    }, 300);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        debouncedSearch(event.target.value);
    };

    const handleClearSearch = () => {
        setValue("");
        searchParams.delete("search");
        setSearchParams(searchParams);
    };

    return (
        <div className={cn(styles.wrapper, wrapperClassName)}>
            <label className={styles.label}>
                <input
                    className={cn(styles.input, className)}
                    value={value}
                    onChange={handleChange}
                    placeholder="Search"
                    {...rest}
                />
                <IoMdClose className={styles.cancelIcon} onClick={handleClearSearch} />
            </label>
            <button className={styles.searchButton}>
                <BiSearch className={styles.searchIcon} />
            </button>
        </div>
    );
};

export default CandidatesSearch;
