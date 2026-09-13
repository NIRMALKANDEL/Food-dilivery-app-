import { useNavigate, useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import useRestrauntMenu from "../Utils/useRestrauntMenu";
import RestarauntCategory from "./RestarauntCategory";
import { useState } from "react";
import TopPicks from "./TopPicks";

const ITEM_CATEGORY_TYPE =
  "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory";
const NESTED_ITEM_CATEGORY_TYPE =
  "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory";

// Swiggy's real menu API sometimes groups dishes directly under a category
// (ItemCategory -> itemCards) and sometimes one level deeper, under named
// sub-categories (NestedItemCategory -> categories[].itemCards). Flatten both
// shapes into a single itemCards array so the rest of the UI doesn't care.
const getItemCards = (categoryData) => {
  if (categoryData.itemCards?.length) return categoryData.itemCards;
  if (categoryData.categories?.length) {
    return categoryData.categories.flatMap((sub) => sub.itemCards || []);
  }
  return [];
};

const isVegItem = (item) =>
  item?.card?.info?.itemAttribute?.vegClassifier === "VEG";

function RestrauntMenu() {
  const { resId } = useParams();
  const navigate = useNavigate();

  // All categories are expanded by default (like Swiggy's own menu page) so
  // dishes and their ADD buttons are visible right away, no extra click
  // needed. Each category can still be individually collapsed.
  const [openCategories, setOpenCategories] = useState(null);
  const [vegOnly, setVegOnly] = useState(false);

  const { resInfo, usingFallbackData } = useRestrauntMenu(resId);

  if (resInfo === null) {
    return <Shimmer />;
  }

  const infoCard = resInfo.cards?.find((c) => c?.card?.card?.info);
  const { name, cuisines, avgRating, costForTwo, sla, veg } =
    infoCard?.card?.card?.info || {};

  const regularCards =
    resInfo.cards?.find((c) => c?.groupedCard)?.groupedCard?.cardGroupMap
      ?.REGULAR?.cards || [];

  const categories = regularCards
    .filter((c) =>
      [ITEM_CATEGORY_TYPE, NESTED_ITEM_CATEGORY_TYPE].includes(
        c?.card?.card?.["@type"]
      )
    )
    .map((c) => ({
      title: c.card.card.title,
      itemCards: getItemCards(c.card.card),
    }))
    .filter((c) => c.itemCards.length > 0);

  const visibleCategories = vegOnly
    ? categories
        .map((c) => ({
          ...c,
          itemCards: c.itemCards.filter(isVegItem),
        }))
        .filter((c) => c.itemCards.length > 0)
    : categories;

  return (
    <div className="animate-[fadeIn_0.3s_ease-in-out]">
      {usingFallbackData && (
        <div className="bg-[#fff4e8] text-[#b45309] text-center text-sm py-2 px-4 border-b border-[#fcd9a8]">
          This restaurant's live menu couldn't be reached, so we're showing a
          sample menu instead.
        </div>
      )}

      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-[#3d4152] font-medium mb-4 hover:text-[#fc8019] transition-colors"
        >
          ← Back
        </button>

        <div className="text-center">
          <h1 className="font-bold text-3xl text-[#3d4152]">{name}</h1>
          <p className="text-gray-500 mt-2">{cuisines?.join(", ")}</p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-3">
            {avgRating && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#e8f5e9] text-[#1a7a3a] rounded-md font-semibold text-sm">
                ★ {avgRating}
              </span>
            )}
            {sla?.slaString && (
              <span className="text-sm text-gray-500">{sla.slaString}</span>
            )}
            {costForTwo && (
              <span className="text-sm text-gray-500">{costForTwo}</span>
            )}
          </div>
        </div>

        <TopPicks resInfo={resInfo} restaurantId={resId} />

        <div className="flex justify-end w-full sm:w-9/12 mx-auto mt-6 mb-2">
          <label className="flex items-center gap-2 text-sm font-medium text-[#3d4152] cursor-pointer select-none">
            <input
              type="checkbox"
              checked={vegOnly}
              onChange={(e) => setVegOnly(e.target.checked)}
              className="accent-green-600 w-4 h-4"
            />
            Veg only
          </label>
        </div>

        <div>
          {visibleCategories.length === 0 ? (
            <p className="text-center text-gray-500 py-10">
              No items match your filter.
            </p>
          ) : (
            visibleCategories.map((category, index) => (
              <RestarauntCategory
                key={category.title}
                data={category}
                showItems={
                  openCategories ? openCategories.has(index) : true
                }
                setShowIndex={() =>
                  setOpenCategories((prev) => {
                    const next = new Set(
                      prev ?? visibleCategories.map((_, i) => i)
                    );
                    if (next.has(index)) next.delete(index);
                    else next.add(index);
                    return next;
                  })
                }
                restaurantId={resId}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default RestrauntMenu;
