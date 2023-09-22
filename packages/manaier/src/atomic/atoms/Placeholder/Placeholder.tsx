export interface PlaceholderProps {
  id?: string | number;
  className?: string;
}

const Placeholder: React.FC<PlaceholderProps> = ({ className = '' }) => {
  return (
    <div
      className={`ds-makersun-manaier-placeholder-container ${className}`}
      data-testid={`ds-makersun-manaier-placeholder`}
    >
      {/* Contenido del componente */}
    </div>
  );
};

export default Placeholder;
