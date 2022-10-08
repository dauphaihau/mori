import { useRef, useEffect } from "react";

export const useAutoFocus = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      console.log('dauphaihau debug: run auto')
      inputRef.current.focus();
    }
  }, []);

  return inputRef;
};
