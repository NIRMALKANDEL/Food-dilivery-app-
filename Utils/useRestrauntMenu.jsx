import { useEffect, useState } from "react";
import { resDetailsUrl } from "./Constants";
import { fetchJson } from "./api";
import { buildMockMenu } from "./mockData";

const useRestrauntMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);
  const [usingFallbackData, setUsingFallbackData] = useState(false);

  useEffect(() => {
    setResInfo(null);
    fetchData();
  }, [resId]);

  const fetchData = async () => {
    try {
      const json = await fetchJson(resDetailsUrl + resId);
      if (!json?.data) throw new Error("Empty menu response");
      setUsingFallbackData(false);
      setResInfo(json.data);
    } catch (err) {
      setUsingFallbackData(true);
      setResInfo(buildMockMenu(resId));
    }
  };

  return { resInfo, usingFallbackData };
};
export default useRestrauntMenu;
