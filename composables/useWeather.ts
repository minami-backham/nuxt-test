import type { Weather } from "@/types/weatherTypes";

export const useWeather = async () => {
  const { data, pending, error } = await useFetch<Weather | null>(
    "/api/weather"
  );
  return {
    weather: data,
    pending,
    error,
  };
};
