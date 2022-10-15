import { MutableRefObject, useEffect, useRef, useState } from "react";

export function useFadeIn<T>(): [MutableRefObject<T>, boolean] {
  const [isVisible, setVisible] = useState(false);

  const ref: any = useRef<T | null>(null);


  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(entry.isIntersecting)
        }
      });
    });
    if (!ref.current) return;
    observer.observe(ref.current);
    // if (ref.current) {
    //   return () => observer.unobserve(ref.current)
    // }
  }, []);

  return [ref, isVisible];
}
