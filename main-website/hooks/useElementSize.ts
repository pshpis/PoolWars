import {useRef, useState, useEffect, RefObject} from "react";
import ResizeObserver from "resize-observer-polyfill";

type Size = {
    width: number,
    height: number,
}

const initialState : Size = { width: 0, height: 0 };

const useElementSize = (ref : RefObject<HTMLElement>) : Size => {
    const [size, setSize] = useState<Size>(initialState);
    const resizeObserverRef = useRef(null);

    useEffect(() => {
        resizeObserverRef.current = new ResizeObserver((entries = []) => {
            entries.forEach((entry) => {
                const { width, height } = entry.contentRect;
                setSize({ width, height });
            });
        });
        if (ref.current) resizeObserverRef.current.observe(ref.current);
        return () => {
            if (resizeObserverRef.current) resizeObserverRef.current.disconnect();
        };
    }, [ref]);
    return size;
};

export default useElementSize;