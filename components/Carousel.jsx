import React from "react";
import { ImageUrl } from "../Utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../Utils/cartSlice";

const Carousel = ({ data, restaurantId }) => {
  const { title } = data;
  const { id, imageId, price, description } = data?.dish?.info || {};

  const dispatch = useDispatch();

  const quantity = useSelector(
    (store) => store.cart.items.find((i) => i.id === id)?.quantity || 0
  );

  const handleAdd = () => {
    dispatch(
      addItem({ id, name: title, imageId, price, description, restaurantId })
    );
  };
  const handleRemove = () => {
    dispatch(removeItem(id));
  };

  if (!data?.dish?.info) return null;

  return (
    <div className="w-64 shrink-0 mr-4">
      <div className="relative rounded-xl overflow-hidden shadow-md group">
        <img
          className="h-36 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          src={ImageUrl + imageId}
          alt={title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <h1 className="absolute top-2 left-2 text-white text-base font-semibold max-w-[85%] text-left">
          {title}
        </h1>
        <h1 className="absolute text-white bottom-2 font-bold left-2">
          ₹{price / 100}
        </h1>
        {quantity === 0 ? (
          <button
            className="absolute font-bold bg-white text-[#fc8019] rounded-lg bottom-2 right-2 px-3 py-1.5 shadow active:scale-95 transition-transform"
            onClick={handleAdd}
          >
            Add
          </button>
        ) : (
          <div className="absolute flex items-center gap-2 bg-white text-[#fc8019] rounded-lg bottom-2 right-2 px-2 py-1.5 shadow font-bold">
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

export default Carousel;
