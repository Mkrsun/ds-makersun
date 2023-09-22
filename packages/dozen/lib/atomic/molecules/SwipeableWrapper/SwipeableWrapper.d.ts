import { ReactNode, MouseEventHandler, TouchEventHandler } from 'react';
import './SwipeableWrapper.scss';
export interface SwipeableWrapperProps {
    className?: string;
    ariaLabel?: string;
    overlayColor?: string;
    completeOverlayColor?: string;
    onHoverColor?: string;
    children: ReactNode;
    gesturesEnabled?: boolean;
    isCompleted?: boolean;
    onTouchStart?: TouchEventHandler<HTMLDivElement>;
    onTouchEnd?: TouchEventHandler<HTMLDivElement>;
    onMouseDown?: MouseEventHandler<HTMLDivElement>;
    onMouseUp?: MouseEventHandler<HTMLDivElement>;
    onSwipeComplete?: () => void;
    setIsComplete?: (isCompleted: boolean) => void;
    setShowDoneIcon?: (show: boolean) => void;
    [key: string]: any;
}
declare const SwipeableWrapper: React.FC<SwipeableWrapperProps>;
export default SwipeableWrapper;
