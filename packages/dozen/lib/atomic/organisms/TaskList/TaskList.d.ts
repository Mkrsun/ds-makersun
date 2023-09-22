/// <reference types="react" />
import './TaskList.scss';
type Task = {
    id: string;
    label: string;
    state: 'new' | 'active' | 'completed' | string;
    isDragging: boolean;
};
export interface TaskListProps {
    className?: string;
    ariaLabel?: string;
    tasks?: Task[];
    state?: 'complete-tasks' | 'reorder';
}
declare const TaskList: React.FC<TaskListProps>;
export default TaskList;
