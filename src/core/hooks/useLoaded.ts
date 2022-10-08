import * as React from 'react';
import { useEffect, useState } from "react";
// import { usePreloadState } from '../../context/PreloadContext';

export function useLoaded() {
  // const [preloaded, setIsPreloaded] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
      // setIsPreloaded(true);
    }, 200);
  }, []);

  // useEffect(() => {
  //   if (preloaded) {
  //     setIsLoaded(true);
  //   } else {
  //     setTimeout(() => {
  //       setIsLoaded(true);
  //     }, 200);
  //   }
  // }, [preloaded]);

  return isLoaded;
}
