import { ReactNode } from 'react';
import './Tab.scss';
export interface TabProps {
    className?: string;
    ariaLabel?: string;
    children?: ReactNode;
    [key: string]: any;
}
declare const Tab: React.FC<TabProps>;
export default Tab;
