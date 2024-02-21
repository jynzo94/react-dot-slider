import { RefObject } from "react";
type Ref<T extends HTMLDivElement = HTMLDivElement> = RefObject<T>;
export default function useAnimation(container: Ref, slides: Ref[]): {
    slideIndex: number;
    goToNext: () => void;
    goToPrev: () => void;
    goTo: (index: number) => void;
    dragStart: (x: number, y: number) => void;
    dragMove: (x: number, y: number) => void;
    dragEnd: () => void;
};
export {};
