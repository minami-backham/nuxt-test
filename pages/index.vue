<template>
  <div>
    <h1 class="text-2xl font-bold">初期表示画面</h1>
    <LineChart />
    <div class="container flex justify-center">
      <LineChartCanvas :data="chartData" />
      <LineChartCanvas :data="chartData" />
      <LineChartCanvas :data="chartData" />
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
    const chartData = ref([
      { time: "15:00", value: 100 },
      { time: "16:00", value: 200 },
      { time: "17:00", value: 150 },
      { time: "18:00", value: 250 },
      { time: "19:00", value: 180 },
      { time: "20:00", value: 220 },
    ]);

    return {
      chartData,
    };
  },
});
</script>
