import './MoveHand.scss';
import { CSSProperties } from 'react';
export interface MoveHandProps {
    className?: string;
    ariaLabel?: string;
    style?: CSSProperties;
    onClick?: any;
    isActive?: boolean;
}
declare const MoveHand: React.FC<MoveHandProps>;
export default MoveHand;
