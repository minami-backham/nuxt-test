// types/weatherTypes.ts
export interface WeatherData {
  id: string;
  temperature: number;
  humidity: number;
  atmosphericPressure: number;
  precipitation: number;
  timestamp: string;
}

export interface Weather {
  name: string;
  type: string;
  height_meter: number;
  thing_name: string;
  data: WeatherData;
}
