import { useState, useEffect } from 'react';

type UseGetHalfWidth = {
  containerRef: any; // Any data structure for different use cases of form
};

// Custom hook para manejar el estado del formulario con validación
export const useGetHalfWidth = ({ containerRef }: UseGetHalfWidth) => {
  const [halfWidth, setHalfWidth] = useState<number | null>(null);

  useEffect(() => {
    if (containerRef && containerRef.current) {
      setHalfWidth(Math.ceil(containerRef.current.offsetWidth / 10) * 4);
    }
  }, [containerRef]);

  return {
    halfWidth,
  };
};
