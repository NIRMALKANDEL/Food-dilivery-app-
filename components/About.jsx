const stats = [
  { label: "Restaurants", value: "1,000+" },
  { label: "Cities Served", value: "15+" },
  { label: "Happy Customers", value: "50K+" },
  { label: "Avg. Delivery Time", value: "35 min" },
];

const steps = [
  {
    icon: "🔍",
    title: "Discover",
    text: "Search restaurants near you and filter by rating, cuisine, or veg preference.",
  },
  {
    icon: "📋",
    title: "Choose",
    text: "Browse the full menu, check out top picks, and add dishes to your cart.",
  },
  {
    icon: "🛒",
    title: "Review",
    text: "Adjust quantities in your cart and see your live running total.",
  },
  {
    icon: "🚴",
    title: "Enjoy",
    text: "Sit back while your order is prepared and delivered fresh and fast.",
  },
];

const About = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 sm:p-10 animate-[fadeIn_0.3s_ease-in-out]">
      <h1 className="text-3xl font-extrabold text-[#3d4152] mb-4 text-center">
        About <span className="text-[#fc8019]">Swiggy Clone</span>
      </h1>
      <p className="text-gray-600 leading-relaxed mb-8 text-center">
        We bring your favourite restaurants closer to you. Discover new
        places to eat, explore menus, and get food delivered right to your
        doorstep — quick, reliable, and always fresh.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white shadow-md rounded-xl p-4 text-center"
          >
            <p className="text-xl font-extrabold text-[#fc8019]">
              {stat.value}
            </p>
            <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-[#3d4152] mb-4 text-center">
        How it works
      </h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        {steps.map((step) => (
          <div
            key={step.title}
            className="bg-white shadow-md rounded-xl p-5 flex gap-4 items-start"
          >
            <span className="text-2xl">{step.icon}</span>
            <div>
              <p className="font-semibold text-[#3d4152]">{step.title}</p>
              <p className="text-sm text-gray-500 mt-1">{step.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white shadow-md rounded-xl p-6 text-center">
        <h2 className="text-lg font-bold text-[#3d4152] mb-2">
          Our Promise
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed">
          Great food, fair prices, and a smooth ordering experience — every
          time. Whether you're craving a quick snack or planning a family
          feast, we make sure it reaches you fresh and on time.
        </p>
      </div>
    </div>
  );
};

export default About;
