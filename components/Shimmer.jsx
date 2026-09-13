import React from "react";
import * as Styles from "./Shimmer.module.css";

const Shimmer = () => {
  return (
    <div className={Styles.shimmerGrid}>
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className={Styles.shimmerCard}>
          <div className={Styles.dishImage}></div>
          <div className={Styles.restaurantInfo}>
            <div className={Styles.restaurantName}></div>
            <div className={Styles.dishName}></div>
            <div className={Styles.cuisine}></div>
            <div className={Styles.cost}></div>
            <div className={Styles.rating}></div>
            <div className={Styles.deliveryTime}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shimmer;
