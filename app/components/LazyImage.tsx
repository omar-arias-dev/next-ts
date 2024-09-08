'use client';
import { useEffect, useRef, useState, useCallback } from "react";
import type { ImgHTMLAttributes, RefObject } from "react";

type LazyImageProps = {
  src: string,
  onLazyLoad?: (node: HTMLImageElement | null) => void,
};
type ImageNative = ImgHTMLAttributes<HTMLImageElement>;
type Props = LazyImageProps & ImageNative;

export const LazyImage = ({ src, onLazyLoad, ...imgProps }: Props): JSX.Element => {
  const node = useRef<HTMLImageElement>(null);

  const [loaded, setLoaded] = useState(false);
  const [source, setSource] = useState("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=");

  useEffect(() => {
    if (loaded) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          console.log("hey you");
          setSource(src);
        }
      });
    });
    if (typeof onLazyLoad === 'function' && node.current) {
      onLazyLoad(node.current);
      observer.disconnect();
      setLoaded(true);
    }
    if (node.current) {
      observer.observe(node.current);
    }
    return () => {
      observer.disconnect();
    }
  }, [src]);

  return(
    <img
      ref={node}
      src={source}
      className="rounded bg-gray-200"
      {...imgProps}
    />
  );
}