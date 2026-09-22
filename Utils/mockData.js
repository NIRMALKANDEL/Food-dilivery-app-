// Swiggy's public API has no official CORS support and its menu endpoint
// actively blocks third-party/proxy traffic. Utils/api.js always attempts a
// real network fetch first (direct, then a couple of CORS proxies); this file
// is only used as a last-resort fallback so the UI never gets stuck when every
// live attempt fails. Restaurant list data below is a real snapshot pulled
// from Swiggy's API so images/names/ratings look authentic even in fallback mode.
// veg/deliveryTime values are hand-set for demo variety since the snapshot
// endpoint didn't expose them the same way the real filters read them.

export const mockRestaurants = [
  {
    info: {
      id: "84070",
      name: "Gurukripa Restaurant - Sarwate",
      cloudinaryImageId:
        "RX_THUMBNAIL/IMAGES/VENDOR/2025/10/7/1673e5b3-700b-4ba2-a1f5-e76f2c54fb2a_84070 (1).jpg",
      cuisines: [
        "Thalis",
        "Indian",
        "Fast Food",
        "Chinese",
        "Beverages",
        "Desserts",
        "Jain",
        "Punjabi",
      ],
      costForTwo: "₹250 for two",
      avgRating: 4.3,
      veg: true,
      sla: { slaString: "45-55 mins", deliveryTime: 45 },
    },
  },
  {
    info: {
      id: "79829",
      name: "Natural Ice Cream",
      cloudinaryImageId:
        "RX_THUMBNAIL/IMAGES/VENDOR/2025/3/21/6b6dfc35-52e3-432b-b601-0a2ad4fa774d_79829.jpg",
      cuisines: ["Ice Cream", "Desserts"],
      costForTwo: "₹150 for two",
      avgRating: 4.7,
      veg: true,
      sla: { slaString: "40-45 mins", deliveryTime: 40 },
    },
  },
  {
    info: {
      id: "806683",
      name: "Burger King",
      cloudinaryImageId:
        "RX_THUMBNAIL/IMAGES/VENDOR/2025/6/18/4dd90836-ad84-4ea6-ab28-1f6c18bd3bf5_806683.jpg",
      cuisines: ["Burgers", "American"],
      costForTwo: "₹350 for two",
      avgRating: 4.3,
      veg: false,
      sla: { slaString: "30-35 mins", deliveryTime: 30 },
    },
  },
  {
    info: {
      id: "754383",
      name: "Wendy's Burgers",
      cloudinaryImageId:
        "RX_THUMBNAIL/IMAGES/VENDOR/2025/1/11/356250b1-83ce-4b94-bf52-e3f9d7cf8538_754383.JPG",
      cuisines: ["Burgers", "Fast Food", "Wrap"],
      costForTwo: "₹200 for two",
      avgRating: 4.4,
      veg: false,
      sla: { slaString: "50-60 mins", deliveryTime: 50 },
    },
  },
  {
    info: {
      id: "73369",
      name: "Maa Ki Rasoi",
      cloudinaryImageId: "b1h0agx8ysx7w6ybrygc",
      cuisines: ["Thalis", "South Indian", "Chinese"],
      costForTwo: "₹200 for two",
      avgRating: 4.4,
      veg: true,
      sla: { slaString: "50-60 mins", deliveryTime: 50 },
    },
  },
  {
    info: {
      id: "80649",
      name: "Behrouz Biryani",
      cloudinaryImageId: "1a8dfa8b2a73ddf7c6193465ab24c898",
      cuisines: [
        "Biryani",
        "North Indian",
        "Kebabs",
        "Mughlai",
        "Beverages",
        "Desserts",
      ],
      costForTwo: "₹500 for two",
      avgRating: 4.4,
      veg: false,
      sla: { slaString: "45-55 mins", deliveryTime: 45 },
    },
  },
  {
    info: {
      id: "86044",
      name: "LunchBox - Meals and Thalis",
      cloudinaryImageId:
        "RX_THUMBNAIL/IMAGES/VENDOR/2024/10/16/57d1dfaa-46c7-42d0-9890-0bc0725392fb_86044.jpg",
      cuisines: ["Thalis", "North Indian", "Biryani"],
      costForTwo: "₹200 for two",
      avgRating: 4.4,
      veg: true,
      sla: { slaString: "45-55 mins", deliveryTime: 45 },
    },
  },
  {
    info: {
      id: "80650",
      name: "Faasos - Wraps, Rolls & Shawarma",
      cloudinaryImageId:
        "RX_THUMBNAIL/IMAGES/VENDOR/2024/7/28/54927150-5039-4b17-8043-225576d203be_80650.JPG",
      cuisines: [
        "Wraps",
        "Rolls",
        "Fast Food",
        "Burger",
        "Shawarma",
        "Rice Bowls",
      ],
      costForTwo: "₹200 for two",
      avgRating: 4.4,
      veg: false,
      sla: { slaString: "45-55 mins", deliveryTime: 45 },
    },
  },
  {
    info: {
      id: "156145",
      name: "The Good Bowl",
      cloudinaryImageId:
        "RX_THUMBNAIL/IMAGES/VENDOR/2024/11/15/a7b57969-83b7-46f8-9742-67e8e9d52eba_156145.jpg",
      cuisines: [
        "Biryani",
        "North Indian",
        "Pastas",
        "Punjabi",
        "Desserts",
        "Beverages",
      ],
      costForTwo: "₹400 for two",
      avgRating: 4.5,
      veg: false,
      sla: { slaString: "40-50 mins", deliveryTime: 40 },
    },
  },
  {
    info: {
      id: "80653",
      name: "Sweet Truth - Cake and Desserts",
      cloudinaryImageId:
        "RX_THUMBNAIL/IMAGES/VENDOR/2026/2/24/c8539f27-9aa9-4cfd-87c6-52c8ff089add_80653.JPG",
      cuisines: ["Desserts", "Ice Cream", "Bakery", "Beverages"],
      costForTwo: "₹450 for two",
      avgRating: 4.4,
      veg: true,
      sla: { slaString: "35-45 mins", deliveryTime: 35 },
    },
  },
  {
    info: {
      id: "198445",
      name: "The Biryani Life",
      cloudinaryImageId: "mvscwfkbjf7qqzchsm5b",
      cuisines: [
        "Biryani",
        "Mughlai",
        "Lucknowi",
        "Hyderabadi",
        "Kebabs",
        "Desserts",
        "Beverages",
      ],
      costForTwo: "₹200 for two",
      avgRating: 4.4,
      veg: false,
      sla: { slaString: "40-50 mins", deliveryTime: 40 },
    },
  },
  {
    info: {
      id: "65268",
      name: "McDonald's",
      cloudinaryImageId:
        "RX_THUMBNAIL/IMAGES/VENDOR/2026/6/18/b888abe7-b440-4622-8d12-94662d71041a_65268.JPG",
      cuisines: ["Burgers", "Beverages", "Cafe", "Desserts"],
      costForTwo: "₹400 for two",
      avgRating: 4.2,
      veg: false,
      sla: { slaString: "45-50 mins", deliveryTime: 45 },
    },
  },
  {
    info: {
      id: "420862",
      name: "La Pino'z Pizza",
      cloudinaryImageId: "5fe4444a065b60c4fe39ef975222c12b",
      cuisines: ["Pizzas", "Pastas", "Italian", "Desserts", "Beverages"],
      costForTwo: "₹250 for two",
      avgRating: 4.3,
      veg: true,
      sla: { slaString: "50-60 mins", deliveryTime: 50 },
    },
  },
  {
    info: {
      id: "78643",
      name: "Pizza Hut",
      cloudinaryImageId:
        "RX_THUMBNAIL/IMAGES/VENDOR/2026/6/15/4d593f0f-b323-46a7-a638-25c733209b33_78643.JPG",
      cuisines: ["Pizzas"],
      costForTwo: "₹350 for two",
      avgRating: 4.1,
      veg: true,
      sla: { slaString: "55-65 mins", deliveryTime: 55 },
    },
  },
  {
    info: {
      id: "67970",
      name: "Subway",
      cloudinaryImageId:
        "RX_THUMBNAIL/IMAGES/VENDOR/2025/6/12/7b9d99b2-fae5-421b-8b44-fad4eb7a2873_67970.jpg",
      cuisines: ["Sandwich", "Salads", "Wrap", "Healthy Food"],
      costForTwo: "₹350 for two",
      avgRating: 4.1,
      veg: true,
      sla: { slaString: "40-45 mins", deliveryTime: 40 },
    },
  },
];

const dish = (id, name, price, description, imageId, isVeg) => ({
  card: {
    info: {
      id,
      name,
      price,
      description,
      imageId,
      itemAttribute: { vegClassifier: isVeg ? "VEG" : "NONVEG" },
    },
  },
});

// Builds a mock menu detail response shaped like Swiggy's real
// /dapi/menu/pl response, reusing the matching restaurant's own photo
// for every dish so the fallback UI still looks coherent.
export const buildMockMenu = (resId) => {
  const restaurant =
    mockRestaurants.find((r) => r.info.id === String(resId)) ||
    mockRestaurants[0];
  const { name, cuisines, avgRating, cloudinaryImageId, costForTwo, sla, veg } =
    restaurant.info;

  return {
    cards: [
      {
        card: {
          card: {
            info: {
              name,
              cuisines,
              avgRating,
              costForTwo,
              sla,
              veg,
              cloudinaryImageId,
            },
          },
        },
      },
      {
        groupedCard: {
          cardGroupMap: {
            REGULAR: {
              cards: [
                {
                  card: {
                    card: {
                      title: "Top Picks",
                      carousel: [
                        {
                          bannerId: "top-1",
                          title: "Chef's Special Combo",
                          dish: {
                            info: {
                              id: "m1",
                              imageId: cloudinaryImageId,
                              price: 24900,
                              description: "A best-seller, made fresh to order.",
                            },
                          },
                        },
                        {
                          bannerId: "top-2",
                          title: "Weekend Favourite",
                          dish: {
                            info: {
                              id: "m2",
                              imageId: cloudinaryImageId,
                              price: 19900,
                              description: "Loved by regulars, highly rated.",
                            },
                          },
                        },
                        {
                          bannerId: "top-3",
                          title: "Spicy Delight",
                          dish: {
                            info: {
                              id: "m3",
                              imageId: cloudinaryImageId,
                              price: 22900,
                              description: "For those who love it hot.",
                            },
                          },
                        },
                      ],
                    },
                  },
                },
                {
                  card: {
                    card: {
                      "@type":
                        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
                      title: "Recommended",
                      itemCards: [
                        dish(
                          "r1",
                          "Signature Thali",
                          29900,
                          "A wholesome combo of curries, rice, and bread.",
                          cloudinaryImageId,
                          true
                        ),
                        dish(
                          "r2",
                          "Paneer Tikka Masala",
                          24900,
                          "Cottage cheese cubes in a rich tomato gravy.",
                          cloudinaryImageId,
                          true
                        ),
                        dish(
                          "r3",
                          "Butter Naan (2 pcs)",
                          6900,
                          "Soft, buttery tandoor-baked bread.",
                          cloudinaryImageId,
                          true
                        ),
                        dish(
                          "r4",
                          "Chicken Seekh Kebab",
                          21900,
                          "Skewered and grilled minced chicken kebabs.",
                          cloudinaryImageId,
                          veg ? true : false
                        ),
                      ],
                    },
                  },
                },
                {
                  card: {
                    card: {
                      "@type":
                        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
                      title: `${cuisines?.[0] || "Popular"} Specials`,
                      itemCards: [
                        dish(
                          "s1",
                          veg ? "Veg Biryani" : "Chicken Biryani",
                          32900,
                          "Fragrant basmati rice layered with spiced " +
                            (veg ? "vegetables" : "chicken") +
                            ".",
                          cloudinaryImageId,
                          veg
                        ),
                        dish(
                          "s2",
                          "Masala Dosa",
                          14900,
                          "Crispy rice crepe filled with spiced potato.",
                          cloudinaryImageId,
                          true
                        ),
                        dish(
                          "s3",
                          "Cold Coffee",
                          9900,
                          "Chilled and frothy, just the way you like it.",
                          cloudinaryImageId,
                          true
                        ),
                      ],
                    },
                  },
                },
                {
                  card: {
                    card: {
                      "@type":
                        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
                      title: "Desserts",
                      itemCards: [
                        dish(
                          "d1",
                          "Gulab Jamun (2 pcs)",
                          8900,
                          "Soft milk dumplings soaked in sugar syrup.",
                          cloudinaryImageId,
                          true
                        ),
                        dish(
                          "d2",
                          "Chocolate Brownie",
                          11900,
                          "Warm, gooey, and topped with chocolate sauce.",
                          cloudinaryImageId,
                          true
                        ),
                      ],
                    },
                  },
                },
              ],
            },
          },
        },
      },
    ],
  };
};
