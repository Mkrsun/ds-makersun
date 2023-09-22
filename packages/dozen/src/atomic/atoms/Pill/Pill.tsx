import { CSSProperties, MouseEventHandler, ReactNode } from 'react';
import './Pill.scss';

export interface PillProps {
  className?: string;
  ariaLabel?: string;
  type?: 'mini'; // TODO: | normal
  value?: number | string | ReactNode;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLDivElement>;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: MouseEventHandler<HTMLDivElement>;
}

const Pill: React.FC<PillProps> = ({
  className = '',
  ariaLabel,
  type = 'normal',
  value,
  style,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <div
      className={`ds-makersun-dozen-pill-container ${type}-pill ${className}`}
      data-testid={`ds-makersun-dozen-pill`}
      aria-label={ariaLabel}
      tabIndex={0}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={style}
    >
      {value}
    </div>
  );
};

export default Pill;
