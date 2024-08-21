const Square = ({ value, onSqaureClick }) => {
  return (
    <>
      <button
        onClick={onSqaureClick}
        className="bg-white border border-gray-600 float-left text-lg font-bold leading-[34px] h-[34px] mr-[-1px] mt-[-1px] p-0 text-center w-[34px]"
      >
        {value}
      </button>
    </>
  );
};

export default Square;
