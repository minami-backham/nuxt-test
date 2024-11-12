<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import LineChart from "~/components/Chart/LineChart.vue";

interface Field {
  value: number;
}

interface Data {
  resource: string;
  time: number;
  fields: {
    [key: string]: Field;
  };
}

interface WeatherForcast {
  temperature: Field;
  atmosphericPressure: Field;
  precipitation: Field;
  humidity: Field;
}

export default defineComponent({
  components: {
    LineChart,
  },
  setup() {
    const weatherForcast = ref<WeatherForcast>({
      temperature: { value: 20 },
      atmosphericPressure: { value: 1013 },
      precipitation: { value: 0 },
      humidity: { value: 50 },
    });

    const generateData = (numDevices: number) => {
      const dataArr = [];

      for (let i = 1; i <= numDevices; i++) {
        dataArr.push({
          resource: `device ${i}`,
          time: 1730767191,
          fields: {
            "WindDirection(1)": { value: 0 },
            "WindDirection(2)": { value: 0 },
            "WindDirection(3)": { value: 0 },
            "WindDirection(4)": { value: 0 },
            "WindSpeed(1)": { value: 0 },
            "WindSpeed(2)": { value: 0 },
            "WindSpeed(3)": { value: 0 },
            "WindSpeed(4)": { value: 0 },
          },
        });
      }

      return dataArr;
    };

    const dataArr = generateData(15);

    const devices = ref<Data[]>([...dataArr]); // デバイスごとのデータを保持

    const generateRandomValue = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    let offset = Math.random() * 1000; // 乱数のオフセット（滑らかさに影響）
    let frequency = 0.01; // 周波数（滑らかさに影響）

    const smoothNoise = (x: any, min: number, max: number) => {
      const amplitude = (max - min) / 2;
      const center = (max + min) / 2;
      return Math.sin(x * frequency + offset) * amplitude + center;
    };

    const updateDataFields = () => {
      devices.value.forEach((deviceData) => {
        const _deviceData = { ...deviceData };

        _deviceData.fields["WindDirection(1)"].value = generateRandomValue(
          0,
          360
        );
        _deviceData.fields["WindDirection(2)"].value = generateRandomValue(
          0,
          360
        );
        _deviceData.fields["WindDirection(3)"].value = generateRandomValue(
          0,
          360
        );
        _deviceData.fields["WindDirection(4)"].value = generateRandomValue(
          0,
          360
        );
        _deviceData.fields["WindSpeed(1)"].value = generateRandomValue(5, 15);
        _deviceData.fields["WindSpeed(2)"].value = generateRandomValue(5, 15);
        _deviceData.fields["WindSpeed(3)"].value = generateRandomValue(5, 15);
        _deviceData.fields["WindSpeed(4)"].value = generateRandomValue(5, 15);

        deviceData = _deviceData;
      });
    };

    const updateWeatherForcast = () => {
      const _weatherForcast = { ...weatherForcast.value };

      // smoothNoiseを使ってtemperatureの値を滑らかに変化させる
      _weatherForcast.temperature.value = smoothNoise(
        new Date().getTime() / 1000,
        -5,
        35
      );
      _weatherForcast.atmosphericPressure.value = smoothNoise(
        new Date().getTime() / 1000,
        990,
        1030
      );
      _weatherForcast.precipitation.value = smoothNoise(
        new Date().getTime() / 1000,
        0,
        150
      );
      _weatherForcast.humidity.value = smoothNoise(
        new Date().getTime() / 1000,
        30,
        80
      );

      weatherForcast.value = _weatherForcast;
    };

    const elapsedTime = ref("00:00:00");
    let startTime: number;
    let timerId: any;

    const updateElapsedTime = () => {
      const now = new Date().getTime();
      const elapsed = now - startTime;
      const hours = String(
        Math.floor((elapsed / (1000 * 60 * 60)) % 24)
      ).padStart(2, "0");
      const minutes = String(Math.floor((elapsed / (1000 * 60)) % 60)).padStart(
        2,
        "0"
      );
      const seconds = String(Math.floor((elapsed / 1000) % 60)).padStart(
        2,
        "0"
      );
      elapsedTime.value = `${hours}:${minutes}:${seconds}`;
    };

    onMounted(() => {
      setInterval(updateDataFields, 3000);
      setInterval(updateWeatherForcast, 3000);
      startTime = new Date().getTime();
      timerId = setInterval(updateElapsedTime, 1000);
      let i: number = 0;
    });

    return {
      devices,
      elapsedTime,
      weatherForcast,
    };
  },
});
</script>

<template>
  <div class="container flex gap-x-8 p-2">
    <!-- 左サイド -->
    <div>
      <!-- 経過時間表示 -->
      <p>経過時間：{{ elapsedTime }}</p>
      <p>気温</p>
      <LineChart
        :data="weatherForcast.temperature.value"
        :minValue="-5"
        :maxValue="35"
      />
      <p>気圧</p>
      <LineChart
        :data="weatherForcast.atmosphericPressure.value"
        :minValue="950"
        :maxValue="1050"
      />
      <p>降水量</p>
      <LineChart
        :data="weatherForcast.precipitation.value"
        :minValue="0"
        :maxValue="200"
      />
      <p>湿度</p>
      <LineChart
        :data="weatherForcast.humidity.value"
        :minValue="0"
        :maxValue="100"
      />
    </div>
    <!-- メイン画面 -->
    <div>
      <div
        v-for="(deviceData, index) in devices"
        :key="index"
        class="container flex justify-center"
      >
        <p>デバイス{{ index + 1 }}</p>

        <div v-for="i in 4" :key="i">
          <p>風向</p>
          <LineChart
            :data="deviceData.fields[`WindDirection(${i})`].value"
            :minValue="0"
            :maxValue="360"
            chartType="WindDirection"
          />
          <p>風速</p>
          <LineChart
            :data="deviceData.fields[`WindSpeed(${i})`].value"
            :minValue="0"
            :maxValue="20"
            chartType="WindSpeed"
          />
        </div>
      </div>
    </div>
  </div>
</template>
