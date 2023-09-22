/// <reference types="react" />
import './TaskList.scss';
export type TaskEntity = {
    id: string;
    label: string;
    state: 'new' | 'active' | 'completed' | string;
    isDragging: boolean;
};
export interface TaskListProps {
    className?: string;
    ariaLabel?: string;
    tasks?: TaskEntity[];
    state?: 'complete-tasks' | 'reorder';
}
declare const TaskList: React.FC<TaskListProps>;
export default TaskList;
