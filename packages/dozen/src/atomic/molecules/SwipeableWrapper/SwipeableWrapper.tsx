import {
  ReactNode,
  MouseEventHandler,
  TouchEventHandler,
  useState,
  useEffect,
  useRef,
} from 'react';
import { hexToRgba, getDeltaPercentage } from './utils';
import './SwipeableWrapper.scss';

const defaultValues = {
  onHoverColor: '#2869261',
};

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
  [key: string]: any; // Índice de propiedades dinámicas
}

const SwipeableWrapper: React.FC<SwipeableWrapperProps> = ({
  className = '',
  ariaLabel,
  overlayColor,
  completeOverlayColor,
  onHoverColor,
  children,
  gesturesEnabled,
  isCompleted,
  onTouchStart,
  onTouchEnd,
  onMouseDown,
  onMouseUp,
  onSwipeComplete,
  setIsComplete,
  setShowDoneIcon,
  ...props
}) => {
  const [startX, setStartX] = useState<number | null>(null);
  const [swipeDistance, setSwipeDistance] = useState<number>(0);
  const [halfWidth, setHalfWidth] = useState<number | null>(null);
  const [currentOverlayColor, setCurrentOverlayColor] = useState<string>(
    overlayColor ? hexToRgba(overlayColor) : '#B8FFB5'
  );
  const [isHover, setIsHover] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleTouchStart: TouchEventHandler<HTMLDivElement> = (event) => {
    onTouchStart && onTouchStart(event);
    setStartX(event.touches[0].clientX);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (startX !== null && gesturesEnabled) {
      const currentX = event.touches[0].clientX;
      const deltaX = currentX - startX;
      setSwipeDistance(deltaX);
    }
  };

  const handleTouchEnd: TouchEventHandler<HTMLDivElement> = (event) => {
    onTouchEnd && gesturesEnabled && onTouchEnd(event);
    if (startX !== null && halfWidth && gesturesEnabled) {
      if (Math.abs(swipeDistance) > halfWidth) {
        onSwipeComplete && onSwipeComplete();
      }

      setStartX(null);
      setSwipeDistance(0);
    }
  };

  const handleMouseDown: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (gesturesEnabled) {
      onMouseDown && onMouseDown(event);
      setStartX(event.clientX);
    }
  };

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (startX !== null && gesturesEnabled) {
      const currentX = event.clientX;
      const deltaX = currentX - startX;
      setSwipeDistance(deltaX);
    }
  };

  const handleMouseUp: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (gesturesEnabled) {
      onMouseUp && onMouseUp(event);
      if (startX !== null && halfWidth) {
        if (Math.abs(swipeDistance) > halfWidth) {
          onSwipeComplete && onSwipeComplete();
        }

        setStartX(null);
        setSwipeDistance(0);
      }
    }
  };

  const handleMouseEnter: React.MouseEventHandler<HTMLDivElement> = () => {
    setIsHover(true);
  };

  const handleMouseLeave: React.MouseEventHandler<HTMLDivElement> = () => {
    setIsHover(false);
  };

  const getBackgroundColor = (
    isHover: boolean,
    onHoverColor?: string
  ): string => {
    if (isHover && !startX) {
      if (onHoverColor) {
        return hexToRgba(onHoverColor);
      } else {
        return hexToRgba(defaultValues.onHoverColor);
      }
    } else {
      return 'initial';
    }
  };

  useEffect(() => {
    if (halfWidth && Math.abs(swipeDistance) > halfWidth && gesturesEnabled) {
      // Set complete overlay color
      setCurrentOverlayColor(
        completeOverlayColor ? hexToRgba(completeOverlayColor, 1) : 'green'
      );
      setShowDoneIcon && setShowDoneIcon(true);
    } else {
      setCurrentOverlayColor(
        overlayColor ? hexToRgba(overlayColor) : hexToRgba('#B8FFB5')
      );
      setShowDoneIcon && setShowDoneIcon(false);
    }
  }, [
    swipeDistance,
    halfWidth,
    completeOverlayColor,
    overlayColor,
    gesturesEnabled,
    isCompleted,
    setIsComplete,
    setShowDoneIcon,
  ]);

  useEffect(() => {
    if (containerRef && containerRef.current) {
      setHalfWidth(Math.ceil(containerRef.current.offsetWidth / 10) * 4);
    }
  }, [containerRef]);

  useEffect(() => {
    const div = containerRef.current;
    if (div && gesturesEnabled) {
      const touchMoveListener = (event: TouchEvent) => {
        event.preventDefault();
      };
      div.addEventListener('touchmove', touchMoveListener, { passive: false });
      return () => {
        div.removeEventListener('touchmove', touchMoveListener);
      };
    }
  }, [containerRef, gesturesEnabled]);

  return (
    <div
      ref={containerRef}
      className={`ds-makersun-dozen-swipeable-wrapper-container ${className} ${
        startX ? 'swiping' : ''
      }`}
      data-testid={`ds-makersun-dozen-swipeable-wrapper`}
      aria-label={ariaLabel}
      tabIndex={0}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{
        backgroundColor: getBackgroundColor(isHover, onHoverColor),
      }}
      {...props}
    >
      <div
        className="overlay"
        style={{
          backgroundColor: currentOverlayColor,
          width: ` ${
            containerRef?.current?.offsetWidth
              ? getDeltaPercentage(
                  containerRef.current.offsetWidth,
                  swipeDistance
                )
              : '0'
          }%`,
        }}
      />
      {children}
    </div>
  );
};

export default SwipeableWrapper;
