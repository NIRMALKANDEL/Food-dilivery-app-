import React from "react";
import { ImageUrl } from "../Utils/Constants";
import { addItem, removeItem } from "../Utils/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const VegIcon = ({ isVeg }) => (
  <span
    className={`inline-block w-3.5 h-3.5 border ${
      isVeg ? "border-green-600" : "border-red-600"
    } p-[1px] shrink-0`}
    title={isVeg ? "Veg" : "Non-Veg"}
  >
    <span
      className={`block w-full h-full rounded-full ${
        isVeg ? "bg-green-600" : "bg-red-600"
      }`}
    />
  </span>
);

const MenuItemRow = ({ item, restaurantId }) => {
  const dispatch = useDispatch();
  const { id, name, description, imageId } = item.card.info;
  const price = item.card.info.defaultPrice ?? item.card.info.price ?? 0;
  const vegClassifier = item.card.info.itemAttribute?.vegClassifier;

  const quantity = useSelector(
    (store) => store.cart.items.find((i) => i.id === id)?.quantity || 0
  );

  const handleAdd = () => {
    dispatch(addItem({ id, name, price, imageId, description, restaurantId }));
  };
  const handleRemove = () => {
    dispatch(removeItem(id));
  };

  return (
    <div className="group p-3 border-gray-100 border-b last:border-b-0 text-left flex flex-row justify-between gap-3 transition-colors hover:bg-[#fffaf5]">
      <div className="py-2 w-8/12">
        {vegClassifier && <VegIcon isVeg={vegClassifier === "VEG"} />}
        <div className="font-bold text-[#3d4152] mt-1">{name}</div>
        <span className="text-[#3d4152] text-sm">₹{price / 100}</span>
        {description && (
          <div className="text-xs text-gray-500 pt-1 line-clamp-2">
            {description}
          </div>
        )}
      </div>
      <div className="w-4/12 flex flex-col items-center gap-2">
        <img
          className="w-full h-20 object-cover rounded-lg transition-transform duration-200 group-hover:scale-105"
          src={ImageUrl + imageId}
          alt={name}
        />
        {quantity === 0 ? (
          <button
            className="w-24 px-4 py-1.5 bg-white text-[#fc8019] font-bold shadow-md rounded-lg border border-[#fc8019] hover:bg-[#fc8019] hover:text-white active:scale-95 transition-all"
            onClick={handleAdd}
          >
            ADD +
          </button>
        ) : (
          <div className="w-24 flex items-center justify-between px-3 py-1.5 bg-[#fc8019] text-white font-bold shadow-md rounded-lg">
            <button
              className="active:scale-90 transition-transform"
              onClick={handleRemove}
              aria-label="Remove one"
            >
              −
            </button>
            <span>{quantity}</span>
            <button
              className="active:scale-90 transition-transform"
              onClick={handleAdd}
              aria-label="Add one more"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const ItemList = ({ items, restaurantId }) => {
  return (
    <div>
      {items.map((item) => (
        <MenuItemRow
          key={item.card.info.id}
          item={item}
          restaurantId={restaurantId}
        />
      ))}
    </div>
  );
};

export default ItemList;
