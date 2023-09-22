import { DragEventHandler } from 'react';
import { MdWork as WorkIcon } from 'react-icons/md';
import Task from '../Task';
import Done from '../../atoms/Done';
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

const TaskHome: React.FC<TaskHomeProps> = ({
  label,
  onSwipeComplete,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  gesturesEnabled,
  isCompleted,
}) => {
  return (
    <Task
      className="ds-makersun-dozen-task-home-container"
      label={label ?? ''}
      rightIcon={<WorkIcon width={18} height={18} />}
      rightIconComplete={<Done />}
      overlayColor="#B6EBBA"
      completeOverlayColor="#3BE146"
      onHoverColor="#E9E8E8"
      onSwipeComplete={onSwipeComplete}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
      gesturesEnabled={gesturesEnabled}
      isCompleted={isCompleted}
    />
  );
};

export default TaskHome;
