export default defineEventHandler(() => {
  return {
    name: "osaka_weather",
    type: "WeatherTransmitter",
    height_meter: 0,
    thing_name: "logger_id",
    data: {
      id: "",
      temperature: 0,
      humidity: 0,
      atmosphericPressure: 0,
      precipitation: 0,
      timestamp: "2024-11-12T22:36:58Z",
    },
  };
});
