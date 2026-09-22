import Carausel from "./Carousel";

const TopPicks = ({ resInfo, restaurantId }) => {
  const regularCards =
    resInfo?.cards?.find((c) => c?.groupedCard)?.groupedCard?.cardGroupMap
      ?.REGULAR?.cards || [];

  const carouselCard = regularCards.find((c) => c?.card?.card?.carousel);
  const { title, carousel } = carouselCard?.card?.card || {};

  if (carousel && carousel.length > 0)
    return (
      <div className="w-full sm:w-9/12 m-auto text-left mb-2">
        <h1 className="text-xl font-bold text-ink mb-3">{title}</h1>
        <div className="flex flex-row overflow-x-auto pb-2">
          {carousel.map((item) => (
            <Carausel
              key={item.bannerId}
              data={item}
              restaurantId={restaurantId}
            />
          ))}
        </div>
      </div>
    );

  return null;
};

export default TopPicks;
