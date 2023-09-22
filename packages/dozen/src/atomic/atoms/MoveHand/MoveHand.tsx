import './MoveHand.scss';
import MoveHandIcon from './HandMoveIcon.png';
import { CSSProperties } from 'react';

export interface MoveHandProps {
  className?: string;
  ariaLabel?: string;
  style?: CSSProperties;
  onClick?: any;
  isActive?: boolean;
}

const MoveHand: React.FC<MoveHandProps> = ({
  className = '',
  ariaLabel,
  style = {},
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
      className={`ds-makersun-dozen-move-hand-container 
        ${className} 
        ${onClick ? 'cursor-pointer' : ''}
        ${getStyles(isActive)}
      `}
      data-testid={`ds-makersun-dozen-move-hand`}
      aria-label={ariaLabel}
      tabIndex={0}
      style={style}
      onClick={onClick}
    >
      <img src={MoveHandIcon} alt="move hand icon" />
    </div>
  );
};

export default MoveHand;
