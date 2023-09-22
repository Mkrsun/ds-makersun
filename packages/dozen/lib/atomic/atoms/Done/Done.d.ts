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
declare const Done: React.FC<DoneProps>;
export default Done;
