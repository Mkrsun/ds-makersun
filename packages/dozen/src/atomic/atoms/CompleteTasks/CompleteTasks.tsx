import './CompleteTasks.scss';
import CompleteTaskSvg from './completeTaskIcon.png';

export interface CompleteTasksProps {
  className?: string;
  ariaLabel?: string;
  onClick?: any;
  isActive?: boolean;
}

const CompleteTasks: React.FC<CompleteTasksProps> = ({
  className = '',
  ariaLabel,
  onClick = () => {},
  isActive,
}) => {
  const getStyles = (isActive: boolean | undefined) => {
    if (isActive === undefined) {
      return '';
    }
    if (isActive) {
      return 'is-active';
    } else {
      return 'not-active';
    }
  };

  return (
    <div
      className={`ds-makersun-dozen-complete-tasks-container 
        ${className} 
        ${onClick ? 'cursor-pointer' : ''}
        ${getStyles(isActive)}
      `}
      data-testid={`ds-makersun-dozen-complete-tasks`}
      aria-label={ariaLabel}
      tabIndex={0}
      onClick={onClick}
    >
      <img src={CompleteTaskSvg} alt="Complete task icon" />
    </div>
  );
};

export default CompleteTasks;
