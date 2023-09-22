import { MdDone as DoneIcon } from 'react-icons/md';

import './Done.scss';
import { CSSProperties } from 'react';

export interface DoneProps {
  className?: string;
  ariaLabel?: string;
  size?: number;
  color?: string;
  fontSize?: string;
  style?: CSSProperties;
}

const Done: React.FC<DoneProps> = ({
  className = '',
  ariaLabel = '',
  size,
  color,
  fontSize,
  style = {},
}) => {
  return (
    <div
      className={`ds-makersun-dozen-done-container ${className}`}
      data-testid={`ds-makersun-dozen-done`}
      aria-label={ariaLabel ?? 'Done Icon'}
      style={style}
    >
      <DoneIcon
        width={size ?? 18}
        height={size ?? 18}
        color={color ?? 'white'}
        fontSize={fontSize ?? '1rem'}
      />
    </div>
  );
};

export default Done;
