import { ImageUrl } from "../Utils/Constants";

const RestrauntCard = ({ resData }) => {
  const { name, cuisines, costForTwo, avgRating, sla, cloudinaryImageId, veg } =
    resData.info;

  const rating = Number(avgRating);
  const ratingColor =
    !rating ? "text-gray-500 bg-gray-100" :
    rating >= 4 ? "text-[#1a7a3a] bg-[#e8f5e9]" : "text-[#b45309] bg-[#fff4e8]";

  return (
    <div className="resCard group rounded-2xl w-full h-auto shadow-md bg-white overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer">
      <div className="foodImg relative overflow-hidden">
        <img
          className="h-[140px] w-full object-cover transition-transform duration-300 group-hover:scale-110"
          src={ImageUrl + cloudinaryImageId}
          alt={name}
          loading="lazy"
        />
        {veg && (
          <span
            className="absolute top-2 left-2 w-4 h-4 bg-white rounded-sm border border-green-600 flex items-center justify-center"
            title="Pure Veg"
          >
            <span className="w-2 h-2 rounded-full bg-green-600" />
          </span>
        )}
      </div>
      <div className="cardDetails flex flex-col gap-1 py-3 px-3">
        <h2 className="font-bold text-[#3d4152] truncate">{name}</h2>

        <h4 className="text-sm text-gray-500 truncate">
          {cuisines.join(", ")}
        </h4>

        <div className="flex items-center justify-between text-sm mt-1">
          <span
            className={`flex items-center gap-1 font-semibold px-1.5 py-0.5 rounded ${ratingColor}`}
          >
            {rating ? `★ ${avgRating}` : "New"}
          </span>
          <span className="text-gray-500">{sla?.slaString}</span>
        </div>

        <h4 className="text-sm text-gray-500">{costForTwo}</h4>
      </div>
    </div>
  );
};
export default RestrauntCard;
