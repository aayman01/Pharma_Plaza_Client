
const QuantityButton = ({ quantity, onQuantityChange }) => {

  const handleDecrement = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    onQuantityChange(quantity + 1);
  };
  return (
    <div className="flex items-center">
      <button
        disabled={quantity === 1}
        onClick={handleDecrement}
        className="bg-blue-600 rounded-sm text-white w-10 h-10 flex items-center justify-center"
      >
        -
      </button>
      <input
        type="text"
        value={quantity}
        readOnly
        className="w-10 rounded-sm h-10 text-center border border-gray-300"
      />
      <button
        onClick={handleIncrement}
        className="bg-blue-600 rounded-sm text-white w-10 h-10 flex items-center justify-center"
      >
        +
      </button>
    </div>
  );
};

export default QuantityButton;