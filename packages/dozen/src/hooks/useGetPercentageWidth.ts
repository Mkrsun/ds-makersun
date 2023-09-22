import { useState, useEffect, RefObject } from 'react';

type UseGetPercentageWidth = {
  containerRef: RefObject<HTMLDivElement | null>; // Any data structure for different use cases of form
  percentage: number;
};

// Custom hook para manejar el estado del formulario con validación
export const useGetPercentageWidth = ({
  containerRef,
  percentage = 100,
}: UseGetPercentageWidth) => {
  const [percentageWidth, setPercentageWidth] = useState<number | undefined>(
    containerRef?.current?.offsetWidth
  );

  useEffect(() => {
    if (containerRef && containerRef.current && percentage !== 100) {
      setPercentageWidth(
        Math.ceil((percentage * containerRef.current.offsetWidth) / 100)
      );
    }
  }, [containerRef, percentage]);

  return {
    percentageWidth,
  };
};
