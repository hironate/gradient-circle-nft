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
    <div className="w-full flex items-center rounded-md border border-[#D1D5DB] justify-center">
      <button
        disabled={minusButtonDisabled}
        className="px-3 py-1 bg-blue-700 text-white rounded-l"
        onClick={() => onQuantityChange(quantity - 1)}
      >
        -
      </button>
      <div className="flex-grow text-center px-3">{quantity}</div>
      <button
        disabled={plusButtonDisabled}
        className="px-3 py-1 bg-blue-700 text-white rounded-r"
        onClick={() => onQuantityChange(quantity + 1)}
      >
        +
      </button>
    </div>
  );
};

// export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
//   quantity,
//   onQuantityChange,
//   minusButtonDisabled,
//   plusButtonDisabled,
// }) => {
//   return (
//     <div className="w-full flex items-center rounded-md border border-[#D1D5DB] bg-white">
//       <Button
//         color="white"
//         disabled={minusButtonDisabled}
//         onClick={() => onQuantityChange(quantity - 1)}
//       >
//         {' - '}
//       </Button>
//       <div className="flex-grow text-center px-2">{quantity}</div>
//       <Button
//         color="white"
//         disabled={plusButtonDisabled}
//         onClick={() => onQuantityChange(quantity + 1)}
//       >
//         {' + '}
//       </Button>
//     </div>
//   );
// };
