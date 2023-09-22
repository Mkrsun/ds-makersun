import './Greeting.scss';

export interface GreetingProps {
  className?: string;
  ariaLabel?: string;
  label: string;
  width?: number;
  height?: number;
}

const Greeting: React.FC<GreetingProps> = ({
  className = '',
  ariaLabel,
  label,
  width,
  height,
}) => {
  return (
    <div
      className={`ds-makersun-dozen-greeting-container ${className}`}
      data-testid={`ds-makersun-dozen-greeting`}
      aria-label={ariaLabel}
      tabIndex={0}
      style={{
        width: width ?? '100%',
        height: height ?? '100%',
      }}
    >
      {label}
    </div>
  );
};

export default Greeting;
