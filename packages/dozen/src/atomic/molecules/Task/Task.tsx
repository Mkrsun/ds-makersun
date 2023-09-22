import {
  ReactNode,
  MouseEventHandler,
  DragEventHandler,
  useState,
  useEffect,
} from 'react';
import './Task.scss';

import SwipeableWrapper from '../SwipeableWrapper';

export interface TaskProps {
  className?: string;
  ariaLabel?: string;
  label: string;
  rightIcon?: ReactNode;
  rightIconComplete?: ReactNode;
  overlayColor?: string;
  completeOverlayColor?: string;
  onHoverColor?: string;
  isCompleted?: boolean;
  gesturesEnabled?: boolean;
  onSwipeComplete?: () => void;
  handleIsComplete?: () => void;
  onClick?: MouseEventHandler<HTMLDivElement>;
  onDragStart?: DragEventHandler;
  onDragOver?: DragEventHandler;
  onDrop?: DragEventHandler;
  onDragEnd?: DragEventHandler;
}

const Task: React.FC<TaskProps> = ({
  className = '',
  ariaLabel,
  label,
  rightIcon,
  rightIconComplete,
  overlayColor,
  completeOverlayColor,
  onHoverColor,
  isCompleted,
  gesturesEnabled,
  onSwipeComplete,
  handleIsComplete,
  onClick,
}) => {
  const [isCompletedLocal, setIsCompletedLocal] = useState(
    isCompleted ?? false
  );

  const [showDoneIcon, setShowDoneIcon] = useState(isCompleted ?? false);

  const handleOnSwipeComplete = () => {
    if (gesturesEnabled) {
      onSwipeComplete && onSwipeComplete();
      console.log('on swipe complete babyy');
      setIsCompletedLocal(true);
    }
  };

  const handleSetIsComplete = (isCompleted: boolean) => {
    if (gesturesEnabled) {
      handleIsComplete && handleIsComplete();
      setIsCompletedLocal(isCompleted);
    }
  };

  const handleOnClickRightSide = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (onClick && gesturesEnabled) {
      return onClick(event);
    } else {
      return () => {};
    }
  };

  useEffect(() => {
    console.log({ isCompletedLocal, isCompleted, rightIconComplete });
  }, [isCompletedLocal, isCompleted, rightIconComplete]);

  return (
    <SwipeableWrapper
      className={`ds-makersun-dozen-task-container ${className}`}
      data-testid={`ds-makersun-dozen-task`}
      aria-label={ariaLabel}
      overlayColor={overlayColor ?? '#B8FFB5'}
      completeOverlayColor={completeOverlayColor ?? 'green'}
      onHoverColor={onHoverColor ?? '#2869261'}
      onSwipeComplete={handleOnSwipeComplete}
      setIsComplete={handleSetIsComplete}
      setShowDoneIcon={setShowDoneIcon}
      isCompleted={isCompletedLocal}
      gesturesEnabled={gesturesEnabled && !isCompletedLocal}
    >
      <div className="left-side">{label}</div>
      <div onClick={handleOnClickRightSide} className="right-side">
        {(isCompletedLocal || showDoneIcon) && rightIconComplete
          ? rightIconComplete
          : rightIcon}
      </div>
    </SwipeableWrapper>
  );
};

export default Task;
