import React, { useEffect, useMemo, useRef, useState } from "react";

export default function Theme({getTheme}) {
    const [isDarkTheme, setIsDarkTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        return (savedTheme === 'dark');
    });

    useEffect(() => {
        const theme = isDarkTheme ? 'dark' : 'light';
        document.documentElement.setAttribute("data-theme", theme);
    }, [isDarkTheme]);

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    };

    useEffect(() => {
        const theme = isDarkTheme ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        getTheme(isDarkTheme);
    }, [isDarkTheme])


    return (
        <>
            <button onClick={toggleTheme}>
                {isDarkTheme ? <span>Light</span> : <span>Dark</span>}
            </button>
        </>
    );
}
