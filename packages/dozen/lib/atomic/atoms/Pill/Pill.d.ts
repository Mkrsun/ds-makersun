import { CSSProperties, MouseEventHandler, ReactNode } from 'react';
import './Pill.scss';
export interface PillProps {
    className?: string;
    ariaLabel?: string;
    type?: 'mini';
    value?: number | string | ReactNode;
    style?: CSSProperties;
    onClick?: MouseEventHandler<HTMLDivElement>;
    onMouseEnter?: MouseEventHandler<HTMLDivElement>;
    onMouseLeave?: MouseEventHandler<HTMLDivElement>;
}
declare const Pill: React.FC<PillProps>;
export default Pill;
