import useResizeObserver from "@react-hook/resize-observer";
import { useEffect, useState } from "react";

const useSize = (target: any) => {
  const [size, setSize] = useState<DOMRect>();

  useEffect(() => {
    setSize(target.current.getBoundingClientRect());
  }, [target]);

  // Where the magic happens
  useResizeObserver(target, (entry) => setSize(entry.contentRect));
  return size;
};

export default useSize;
