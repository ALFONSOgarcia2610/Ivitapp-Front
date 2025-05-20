import { useState, useEffect } from "react";
import SkeletonCards from "./skeleton";
import FilledCards from "./FilledCards";

export default function HomePage() {

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchData() {
            await new Promise((resolve) => setTimeout(resolve, 0));
            setLoading(false);
            localStorage.setItem("skeletonShown", "true");
        }
        fetchData();
    }, []);

    return (
        <div className="p-4 relative">
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    transition: "opacity 0.5s ease",
                    opacity: loading ? 1 : 0,
                    pointerEvents: loading ? "auto" : "none",
                }}
            >
                <SkeletonCards />
            </div>
            <div
                style={{
                    transition: "opacity 0.5s ease",
                    opacity: loading ? 0 : 1,
                    pointerEvents: loading ? "none" : "auto",
                }}
            >
                <FilledCards />
            </div>
        </div>
    );
}
