<template>
  <div>
    <!-- 経過時間表示 -->
    <p>{{ elapsedTime }}</p>
    <div
      v-for="(deviceData, index) in devices"
      :key="index"
      class="container flex justify-center"
    >
      <div v-for="i in 4" :key="i">
        <p>風向</p>
        <LineChartCanvas
          :data="deviceData.fields[`WindDirection(${i})`].value"
          :minValue="0"
          :maxValue="360"
          chartType="WindDirection"
        />
        <p>風速</p>
        <LineChartCanvas
          :data="deviceData.fields[`WindSpeed(${i})`].value"
          :minValue="0"
          :maxValue="20"
          chartType="WindSpeed"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import LineChartCanvas from "@/components/LineChartCanvas.vue";

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

export default defineComponent({
  components: {
    LineChartCanvas,
  },
  setup() {
    const dataArr = [
      {
        resource: "device 1",
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
      },
      {
        resource: "device 2",
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
      },
      {
        resource: "device 3",
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
      },
      {
        resource: "device 4",
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
      },
      {
        resource: "device 5",
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
      },
    ];

    const devices = ref<Data[]>([...dataArr]); // デバイスごとのデータを保持

    const generateRandomValue = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const updateDataFields = () => {
      devices.value.forEach((deviceData) => {
        Object.keys(deviceData.fields).forEach((key) => {
          if (key.startsWith("WindDirection")) {
            deviceData.fields[key].value = generateRandomValue(0, 360);
          } else if (key.startsWith("WindSpeed")) {
            deviceData.fields[key].value = generateRandomValue(5, 15);
          }
        });
      });
    };

    const elapsedTime = ref("00:00:00");
    let startTime: number;
    let timerId: number;

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
      startTime = new Date().getTime();
      timerId = setInterval(updateElapsedTime, 1000);
    });

    return {
      devices,
      elapsedTime,
    };
  },
});
</script>
