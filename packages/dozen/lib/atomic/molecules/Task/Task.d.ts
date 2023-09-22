import { ReactNode, MouseEventHandler, DragEventHandler } from 'react';
import './Task.scss';
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
declare const Task: React.FC<TaskProps>;
export default Task;
