import { useStore } from "@tanstack/react-store";
import { usuarioStore } from "../Store/authstore";
import SkeletonLoader from "./skeleton";
import FilledCards from "./FilledCards";

export default function HomePage() {
    const skeleton = useStore(usuarioStore, (state) => state.skeleton);

    return (
        <>
            {skeleton ? <SkeletonLoader /> : <FilledCards />}
        </>
    );
}
