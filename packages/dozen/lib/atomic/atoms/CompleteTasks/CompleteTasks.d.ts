/// <reference types="react" />
import './CompleteTasks.scss';
export interface CompleteTasksProps {
    className?: string;
    ariaLabel?: string;
    onClick?: any;
    isActive?: boolean;
}
declare const CompleteTasks: React.FC<CompleteTasksProps>;
export default CompleteTasks;
