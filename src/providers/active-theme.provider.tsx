"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

type Mode = "light" | "dark";
type ThemeColor =
    | "default"
    | "blue"
    | "red"
    | "green"
    | "orange"
    | "yellow"
    | "rose"
    | "violet";

interface ThemeContextType {
    colorTheme: ThemeColor;
    modeTheme: Mode;
    setColorTheme: (theme: ThemeColor) => void;
    setModeTheme: (mode: Mode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ActiveThemeProvider({
    children,
    initialColor = "blue",
    initialMode = "light",
}: {
    children: ReactNode;
    initialColor?: ThemeColor;
    initialMode?: Mode;
}) {
    const [colorTheme, setColorThemeState] = useState<ThemeColor>(initialColor);
    const [modeTheme, setModeThemeState] = useState<Mode>(initialMode);

    const setColorTheme = (theme: ThemeColor) => {
        setColorThemeState(theme);
        document.cookie = `active_theme=${theme}; path=/; max-age=31536000; SameSite=Lax;`;
        localStorage.setItem("active_theme", theme);
    };

    const setModeTheme = (mode: Mode) => {
        setModeThemeState(mode);
        document.cookie = `mode_theme=${mode}; path=/; max-age=31536000; SameSite=Lax;`;
        localStorage.setItem("mode_theme", mode);
    };

    useEffect(() => {
        const storedColor = localStorage.getItem("active_theme") as ThemeColor;
        const storedMode = localStorage.getItem("mode_theme") as Mode;

        if (storedColor) setColorThemeState(storedColor);
        if (storedMode) setModeThemeState(storedMode);
    }, []);

    useEffect(() => {
        document.body.classList.remove(
            ...Array.from(document.body.classList).filter(
                (cls) => cls.startsWith("theme-") || cls === "light" || cls === "dark",
            ),
        );

        document.body.classList.add(`theme-${colorTheme}`, modeTheme);
    }, [colorTheme, modeTheme]);

    return (
        <ThemeContext.Provider
            value={{ colorTheme, modeTheme, setColorTheme, setModeTheme }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useThemeConfig() {
    const context = useContext(ThemeContext);
    if (!context)
        throw new Error("useThemeConfig must be used within ActiveThemeProvider");
    return context;
}
