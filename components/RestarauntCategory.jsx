import ItemList from "./ItemList";

const RestarauntCategory = ({ data, showItems, setShowIndex, restaurantId }) => {
  const handleClick = () => {
    setShowIndex();
  };

  return (
    <div className="w-full sm:w-9/12 mx-auto my-4 shadow-md bg-white rounded-xl overflow-hidden">
      <div
        className="flex justify-between items-center cursor-pointer p-4 hover:bg-gray-50 transition-colors"
        onClick={handleClick}
      >
        <span className="font-bold text-lg text-[#3d4152]">
          {data.title} ({data.itemCards.length})
        </span>
        <span
          className={`text-[#fc8019] font-bold transition-transform duration-300 ${
            showItems ? "rotate-180" : ""
          }`}
        >
          ⌄
        </span>
      </div>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: showItems ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-2">
            <ItemList items={data.itemCards} restaurantId={restaurantId} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default RestarauntCategory;
