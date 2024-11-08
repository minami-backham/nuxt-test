<template>
  <div>
    <!-- 経過時間表示 -->
    <p>{{ elapsedTime }}</p>
    <div class="container flex justify-center">
      <!-- (1) -->
      <div>
        <p>風向</p>
        <LineChartCanvas
          :data="data.fields['WindDirection(1)'].value"
          :minValue="0"
          :maxValue="360"
          chartType="WindDirection"
        />
        <p>風速</p>
        <LineChartCanvas
          :data="data.fields['WindSpeed(1)'].value"
          :minValue="0"
          :maxValue="20"
          chartType="WindSpeed"
        />
      </div>

      <!-- (2) -->
      <div>
        <p>風向</p>
        <LineChartCanvas
          :data="data.fields['WindDirection(2)'].value"
          :minValue="0"
          :maxValue="360"
          chartType="WindDirection"
        />
        <p>風速</p>
        <LineChartCanvas
          :data="data.fields['WindSpeed(2)'].value"
          :minValue="0"
          :maxValue="20"
          chartType="WindSpeed"
        />
      </div>

      <!-- (3) -->
      <div>
        <p>風向</p>
        <LineChartCanvas
          :data="data.fields['WindDirection(3)'].value"
          :minValue="0"
          :maxValue="360"
          chartType="WindDirection"
        />
        <p>風速</p>
        <LineChartCanvas
          :data="data.fields['WindSpeed(3)'].value"
          :minValue="0"
          :maxValue="20"
          chartType="WindSpeed"
        />
      </div>

      <!-- (4) -->
      <div>
        <p>風向</p>
        <LineChartCanvas
          :data="data.fields['WindDirection(4)'].value"
          :minValue="0"
          :maxValue="360"
          chartType="WindDirection"
        />
        <p>風速</p>
        <LineChartCanvas
          :data="data.fields['WindSpeed(4)'].value"
          :minValue="0"
          :maxValue="20"
          chartType="WindSpeed"
        />
      </div>
    </div>
    <div class="container flex justify-center">
      <!-- (1) -->
      <div>
        <p>風向</p>
        <LineChartCanvas
          :data="data.fields['WindDirection(1)'].value"
          :minValue="0"
          :maxValue="360"
          chartType="WindDirection"
        />
        <p>風速</p>
        <LineChartCanvas
          :data="data.fields['WindSpeed(1)'].value"
          :minValue="0"
          :maxValue="20"
          chartType="WindSpeed"
        />
      </div>

      <!-- (2) -->
      <div>
        <p>風向</p>
        <LineChartCanvas
          :data="data.fields['WindDirection(2)'].value"
          :minValue="0"
          :maxValue="360"
          chartType="WindDirection"
        />
        <p>風速</p>
        <LineChartCanvas
          :data="data.fields['WindSpeed(2)'].value"
          :minValue="0"
          :maxValue="20"
          chartType="WindSpeed"
        />
      </div>

      <!-- (3) -->
      <div>
        <p>風向</p>
        <LineChartCanvas
          :data="data.fields['WindDirection(3)'].value"
          :minValue="0"
          :maxValue="360"
          chartType="WindDirection"
        />
        <p>風速</p>
        <LineChartCanvas
          :data="data.fields['WindSpeed(3)'].value"
          :minValue="0"
          :maxValue="20"
          chartType="WindSpeed"
        />
      </div>

      <!-- (4) -->
      <div>
        <p>風向</p>
        <LineChartCanvas
          :data="data.fields['WindDirection(4)'].value"
          :minValue="0"
          :maxValue="360"
          chartType="WindDirection"
        />
        <p>風速</p>
        <LineChartCanvas
          :data="data.fields['WindSpeed(4)'].value"
          :minValue="0"
          :maxValue="20"
          chartType="WindSpeed"
        />
      </div>
    </div>
    <div class="container flex justify-center">
      <!-- (1) -->
      <div>
        <p>風向</p>
        <LineChartCanvas
          :data="data.fields['WindDirection(1)'].value"
          :minValue="0"
          :maxValue="360"
          chartType="WindDirection"
        />
        <p>風速</p>
        <LineChartCanvas
          :data="data.fields['WindSpeed(1)'].value"
          :minValue="0"
          :maxValue="20"
          chartType="WindSpeed"
        />
      </div>

      <!-- (2) -->
      <div>
        <p>風向</p>
        <LineChartCanvas
          :data="data.fields['WindDirection(2)'].value"
          :minValue="0"
          :maxValue="360"
          chartType="WindDirection"
        />
        <p>風速</p>
        <LineChartCanvas
          :data="data.fields['WindSpeed(2)'].value"
          :minValue="0"
          :maxValue="20"
          chartType="WindSpeed"
        />
      </div>

      <!-- (3) -->
      <div>
        <p>風向</p>
        <LineChartCanvas
          :data="data.fields['WindDirection(3)'].value"
          :minValue="0"
          :maxValue="360"
          chartType="WindDirection"
        />
        <p>風速</p>
        <LineChartCanvas
          :data="data.fields['WindSpeed(3)'].value"
          :minValue="0"
          :maxValue="20"
          chartType="WindSpeed"
        />
      </div>

      <!-- (4) -->
      <div>
        <p>風向</p>
        <LineChartCanvas
          :data="data.fields['WindDirection(4)'].value"
          :minValue="0"
          :maxValue="360"
          chartType="WindDirection"
        />
        <p>風速</p>
        <LineChartCanvas
          :data="data.fields['WindSpeed(4)'].value"
          :minValue="0"
          :maxValue="20"
          chartType="WindSpeed"
        />
      </div>
    </div>
    <div class="container flex justify-center">
      <!-- (1) -->
      <div>
        <p>風向</p>
        <LineChartCanvas
          :data="data.fields['WindDirection(1)'].value"
          :minValue="0"
          :maxValue="360"
          chartType="WindDirection"
        />
        <p>風速</p>
        <LineChartCanvas
          :data="data.fields['WindSpeed(1)'].value"
          :minValue="0"
          :maxValue="20"
          chartType="WindSpeed"
        />
      </div>

      <!-- (2) -->
      <div>
        <p>風向</p>
        <LineChartCanvas
          :data="data.fields['WindDirection(2)'].value"
          :minValue="0"
          :maxValue="360"
          chartType="WindDirection"
        />
        <p>風速</p>
        <LineChartCanvas
          :data="data.fields['WindSpeed(2)'].value"
          :minValue="0"
          :maxValue="20"
          chartType="WindSpeed"
        />
      </div>

      <!-- (3) -->
      <div>
        <p>風向</p>
        <LineChartCanvas
          :data="data.fields['WindDirection(3)'].value"
          :minValue="0"
          :maxValue="360"
          chartType="WindDirection"
        />
        <p>風速</p>
        <LineChartCanvas
          :data="data.fields['WindSpeed(3)'].value"
          :minValue="0"
          :maxValue="20"
          chartType="WindSpeed"
        />
      </div>

      <!-- (4) -->
      <div>
        <p>風向</p>
        <LineChartCanvas
          :data="data.fields['WindDirection(4)'].value"
          :minValue="0"
          :maxValue="360"
          chartType="WindDirection"
        />
        <p>風速</p>
        <LineChartCanvas
          :data="data.fields['WindSpeed(4)'].value"
          :minValue="0"
          :maxValue="20"
          chartType="WindSpeed"
        />
      </div>
    </div>
    <div class="container flex justify-center">
      <!-- (1) -->
      <div>
        <p>風向</p>
        <LineChartCanvas
          :data="data.fields['WindDirection(1)'].value"
          :minValue="0"
          :maxValue="360"
          chartType="WindDirection"
        />
        <p>風速</p>
        <LineChartCanvas
          :data="data.fields['WindSpeed(1)'].value"
          :minValue="0"
          :maxValue="20"
          chartType="WindSpeed"
        />
      </div>

      <!-- (2) -->
      <div>
        <p>風向</p>
        <LineChartCanvas
          :data="data.fields['WindDirection(2)'].value"
          :minValue="0"
          :maxValue="360"
          chartType="WindDirection"
        />
        <p>風速</p>
        <LineChartCanvas
          :data="data.fields['WindSpeed(2)'].value"
          :minValue="0"
          :maxValue="20"
          chartType="WindSpeed"
        />
      </div>

      <!-- (3) -->
      <div>
        <p>風向</p>
        <LineChartCanvas
          :data="data.fields['WindDirection(3)'].value"
          :minValue="0"
          :maxValue="360"
          chartType="WindDirection"
        />
        <p>風速</p>
        <LineChartCanvas
          :data="data.fields['WindSpeed(3)'].value"
          :minValue="0"
          :maxValue="20"
          chartType="WindSpeed"
        />
      </div>

      <!-- (4) -->
      <div>
        <p>風向</p>
        <LineChartCanvas
          :data="data.fields['WindDirection(4)'].value"
          :minValue="0"
          :maxValue="360"
          chartType="WindDirection"
        />
        <p>風速</p>
        <LineChartCanvas
          :data="data.fields['WindSpeed(4)'].value"
          :minValue="0"
          :maxValue="20"
          chartType="WindSpeed"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import LineChart from "@/components/LineChart.vue";
import LineChartCanvas from "@/components/LineChartCanvas.vue";

export default defineComponent({
  components: {
    LineChart,
    LineChartCanvas,
  },
  setup() {
    const dataArr = [
      {
        resource: "data_logger-41232",
        time: 1730767191,
        fields: {
          "WindDirection(1)": { value: 14.47 },
          "WindDirection(2)": { value: 86.13 },
          "WindDirection(3)": { value: 315.58 },
          "WindDirection(4)": { value: 85.39 },
          "WindSpeed(1)": { value: 10.15 },
          "WindSpeed(2)": { value: 2.61 },
          "WindSpeed(3)": { value: 4.65 },
          "WindSpeed(4)": { value: 11.32 },
        },
      },
      {
        resource: "data_logger-41232",
        time: 1730767192,
        fields: {
          "WindDirection(1)": { value: 15.47 },
          "WindDirection(2)": { value: 66.13 },
          "WindDirection(3)": { value: 211.58 },
          "WindDirection(4)": { value: 70.39 },
          "WindSpeed(1)": { value: 13.25 },
          "WindSpeed(2)": { value: 5.61 },
          "WindSpeed(3)": { value: 8.65 },
          "WindSpeed(4)": { value: 18.46 },
        },
      },
      {
        resource: "data_logger-41232",
        time: 1730767193,
        fields: {
          "WindDirection(1)": { value: 24.47 },
          "WindDirection(2)": { value: 98.13 },
          "WindDirection(3)": { value: 280.58 },
          "WindDirection(4)": { value: 120.39 },
          "WindSpeed(1)": { value: 11.15 },
          "WindSpeed(2)": { value: 3.61 },
          "WindSpeed(3)": { value: 10.65 },
          "WindSpeed(4)": { value: 8.32 },
        },
      },
      {
        resource: "data_logger-41232",
        time: 1730767194,
        fields: {
          "WindDirection(1)": { value: 19.47 },
          "WindDirection(2)": { value: 120.13 },
          "WindDirection(3)": { value: 307.58 },
          "WindDirection(4)": { value: 190.39 },
          "WindSpeed(1)": { value: 19.15 },
          "WindSpeed(2)": { value: 10.61 },
          "WindSpeed(3)": { value: 8.65 },
          "WindSpeed(4)": { value: 7.32 },
        },
      },
      {
        resource: "data_logger-41232",
        time: 1730767191,
        fields: {
          "WindDirection(1)": { value: 85.47 },
          "WindDirection(2)": { value: 190.13 },
          "WindDirection(3)": { value: 215.58 },
          "WindDirection(4)": { value: 67.39 },
          "WindSpeed(1)": { value: 4.15 },
          "WindSpeed(2)": { value: 12.61 },
          "WindSpeed(3)": { value: 14.65 },
          "WindSpeed(4)": { value: 3.32 },
        },
      },
    ];
    const data = ref(dataArr[0]);
    let index = 0;

    // 経過時間表示
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
      setInterval(() => {
        index = (index + 1) % dataArr.length;
        data.value = dataArr[index];
      }, 3000); // 3秒ごとに更新

      startTime = new Date().getTime();
      timerId = setInterval(updateElapsedTime, 1000);
    });

    onUnmounted(() => {
      clearInterval(timerId);
    });

    return {
      data,
      elapsedTime,
    };
  },
});
</script>
