import { DragEventHandler } from 'react';
import './TaskHome.scss';
export interface TaskHomeProps {
    label?: string;
    onSwipeComplete?: () => void;
    onDragStart?: DragEventHandler;
    onDragOver?: DragEventHandler;
    onDrop?: DragEventHandler;
    onDragEnd?: DragEventHandler;
    gesturesEnabled?: boolean;
    isCompleted?: boolean;
}
declare const TaskHome: React.FC<TaskHomeProps>;
export default TaskHome;
