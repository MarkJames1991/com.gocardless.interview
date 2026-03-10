import { useEffect, useState } from "react";

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

const BREAKPOINT_VALUES: Record<Breakpoint, number> = {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
};

function getCurrentBreakpoint(): Breakpoint {
    const width = window.innerWidth;

    if (width >= BREAKPOINT_VALUES["2xl"]) return "2xl";
    if (width >= BREAKPOINT_VALUES.xl) return "xl";
    if (width >= BREAKPOINT_VALUES.lg) return "lg";
    if (width >= BREAKPOINT_VALUES.md) return "md";
    if (width >= BREAKPOINT_VALUES.sm) return "sm";
    return "xs";
}

export function useBreakpoints() {
    const [breakpoint, setBreakpoint] = useState<Breakpoint>(() =>
        typeof window !== "undefined" ? getCurrentBreakpoint() : "xs"
    );

    useEffect(() => {
        const handleResize = () => {
            const bp = getCurrentBreakpoint();
            setBreakpoint(bp);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const is = (bp: Breakpoint) => breakpoint === bp;
    const isUp = (bp: Breakpoint) =>
        window.innerWidth >= BREAKPOINT_VALUES[bp];

    const isDown = (bp: Breakpoint) =>
        window.innerWidth < BREAKPOINT_VALUES[bp];

    return {
        breakpoint,
        isXs: breakpoint === "xs",
        isSm: breakpoint === "sm",
        isMd: breakpoint === "md",
        isLg: breakpoint === "lg",
        isXl: breakpoint === "xl",
        is2xl: breakpoint === "2xl",
        is,
        isUp,
        isDown,
    };
}
