import { RefObject } from 'react';
type UseGetPercentageWidth = {
    containerRef: RefObject<HTMLDivElement | null>;
    percentage: number;
};
export declare const useGetPercentageWidth: ({ containerRef, percentage, }: UseGetPercentageWidth) => {
    percentageWidth: number | undefined;
};
export {};
