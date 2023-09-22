import { ReactNode } from 'react';
import './Tabs.scss';
export interface TabsProps {
    className?: string;
    ariaLabel?: string;
    options?: string[];
    children: ReactNode;
}
declare const Tabs: React.FC<TabsProps>;
export default Tabs;
