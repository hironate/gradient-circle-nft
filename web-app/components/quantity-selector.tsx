import React from 'react';

interface ButtonProps {
  color: string;
  disabled: boolean;
  onClick: () => void;
  children: any;
}

const Button: React.FC<ButtonProps> = ({
  color,
  disabled,
  onClick,
  children,
}) => (
  <button
    className={`bg-${color} px-2 py-1 rounded-md ${
      disabled ? 'opacity-50 cursor-not-allowed' : ''
    }`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  minusButtonDisabled: boolean;
  plusButtonDisabled: boolean;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onQuantityChange,
  minusButtonDisabled,
  plusButtonDisabled,
}) => {
  return (
    <div className="flex items-center rounded-md border border-[#D1D5DB] bg-white">
      <Button
        color="white"
        disabled={minusButtonDisabled}
        onClick={() => onQuantityChange(quantity - 1)}
      >
        {' - '}
      </Button>
      <span className="px-2">{quantity}</span>
      <Button
        color="white"
        disabled={plusButtonDisabled}
        onClick={() => onQuantityChange(quantity + 1)}
      >
        {' + '}
      </Button>
    </div>
  );
};
