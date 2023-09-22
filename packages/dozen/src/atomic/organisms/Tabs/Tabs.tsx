import { ReactNode, useState, useRef, useEffect, Children } from 'react';
import Tab from '../../molecules/Tab';
import TabOption from '../../atoms/TabOption';
import { useGetPercentageWidth } from '../../../hooks/useGetPercentageWidth';
import './Tabs.scss';

export interface TabsProps {
  className?: string;
  ariaLabel?: string;
  options?: string[];
  children: ReactNode;
}

const Tabs: React.FC<TabsProps> = ({
  className = '',
  ariaLabel,
  options,
  children,
}) => {
  const [selectedTabOptionIndex, setSelectedTabOption] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const tabsContainerRef = useRef<HTMLDivElement | null>(null);
  const { percentageWidth } = useGetPercentageWidth({
    containerRef: tabsContainerRef,
    percentage: 20,
  });
  const [isWaiting, setIsWaiting] = useState(false);
  const containerRef = useRef(null);

  const handlePrev = () => {
    setSelectedTabOption((prevIndex) => Math.max(prevIndex - 1, 0));
  };
  const handleNext = () => {
    const childrenArray = Children.toArray(children);
    setSelectedTabOption((prevIndex) =>
      Math.min(prevIndex + 1, childrenArray.length - 1)
    );
  };
  const handleSwipeLeft = handlePrev;
  const handleSwipeRight = handleNext;
  const handleSelectTabOption = (index: number) => {
    setSelectedTabOption(index);
  };

  const handleMouseDown: React.MouseEventHandler = (event) => {
    setTouchStartX(event.clientX);
  };

  const handleMouseMove: React.MouseEventHandler = (event) => {
    const touchEndX = event.clientX;
    const deltaX = touchEndX - (touchStartX ?? 0);

    if (percentageWidth && Math.abs(deltaX) > percentageWidth && !isWaiting) {
      if (deltaX > 0) {
        handleSwipeLeft();
      } else {
        handleSwipeRight();
      }
      setIsWaiting(true);
      setTimeout(() => {
        setIsWaiting(false);
      }, 300);
    }
  };

  const handleMouseUp = () => {
    setTouchStartX(0);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(event.touches[0].clientX);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    const touchEndX = event.touches[0].clientX;
    const deltaX = touchEndX - (touchStartX ?? 0);

    if (percentageWidth && Math.abs(deltaX) > percentageWidth && !isWaiting) {
      if (deltaX > 0) {
        handleSwipeLeft();
      } else {
        handleSwipeRight();
      }
      setIsWaiting(true);
      setTimeout(() => {
        setIsWaiting(false);
      }, 300);
    }
  };

  const handleTouchEnd = () => {
    setTouchStartX(0);
  };

  useEffect(() => {
    const div = tabsContainerRef.current;
    if (div) {
      const touchMoveListener = (event: TouchEvent) => {
        event.preventDefault();
      };
      div.addEventListener('touchmove', touchMoveListener, {
        passive: false,
      });
      return () => {
        div.removeEventListener('touchmove', touchMoveListener);
      };
    }
  }, [tabsContainerRef]);

  return (
    <div
      className={`ds-makersun-dozen-tabs-container ${className}`}
      data-testid={`ds-makersun-dozen-tabs`}
      aria-label={ariaLabel}
      tabIndex={0}
      ref={containerRef}
    >
      {/* Tabs Header Container */}
      <div className="ds-makersun-dozen-tabs-header-container">
        {options?.map((option: string, index) => (
          <TabOption
            key={option}
            label={option}
            isActive={index === selectedTabOptionIndex}
            onClick={() => handleSelectTabOption(index)}
          />
        ))}
      </div>

      {/* Tabs Content */}
      <div
        ref={tabsContainerRef}
        className="ds-makersun-dozen-tabs-content-container"
        style={{ transform: `translateX(-${selectedTabOptionIndex * 100}%)` }}
      >
        {Children.map(children, (child, index) => (
          <Tab
            key={index}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {child}
          </Tab>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
