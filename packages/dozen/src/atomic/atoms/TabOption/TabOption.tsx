import './TabOption.scss';

export interface TabOptionProps {
  className?: string;
  ariaLabel?: string;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const TabOption: React.FC<TabOptionProps> = ({
  className = '',
  ariaLabel,
  label,
  isActive,
  onClick,
}) => {
  return (
    <div
      className={`ds-makersun-dozen-tab-option-container ${className} ${
        isActive ? 'active' : ''
      }`}
      data-testid={`ds-makersun-dozen-tab-option`}
      aria-label={ariaLabel}
      tabIndex={0}
      onClick={onClick}
    >
      {label}
    </div>
  );
};

export default TabOption;
