import { ReactNode } from 'react';
import './Tab.scss';

export interface TabProps {
  className?: string;
  ariaLabel?: string;
  children?: ReactNode;
  [key: string]: any; // Índice de propiedades dinámicas
}

const Tab: React.FC<TabProps> = ({
  className = '',
  ariaLabel,
  children,
  ...props
}) => {
  return (
    <div
      className={`ds-makersun-dozen-tab-container ${className}`}
      data-testid={`ds-makersun-dozen-tab`}
      aria-label={ariaLabel}
      tabIndex={0}
      {...props}
    >
      {children}
    </div>
  );
};

export default Tab;
