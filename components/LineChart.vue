<template>
  <div ref="chartDiv" style="width: 250px; height: 78px"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, ref } from "vue";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";

export default defineComponent({
  name: "LineChart",
  setup() {
    const chartDiv = ref<HTMLElement | null>(null);
    let root: am5.Root | undefined;
    let xyChart: am5xy.XYChart | undefined;

    onMounted(() => {
      if (chartDiv.value) {
        root = am5.Root.new(chartDiv.value);

        // XYChart を作成
        xyChart = root.container.children.push(
          am5xy.XYChart.new(root, {
            panX: true,
            panY: true,
            wheelX: "panX",
            wheelY: "zoomX",
            layout: root.verticalLayout,
          })
        );

        // X軸とY軸を作成
        const xAxis = xyChart.xAxes.push(
          am5xy.DateAxis.new(root, {
            baseInterval: { timeUnit: "hour", count: 1 },
            startLocation: 0.2,
            endLocation: 0.8,
            renderer: am5xy.AxisRendererX.new(root, {
              minGridDistance: 30, // ラベルの最小間隔を設定
            }),
          })
        );

        xAxis.get("periodChangeDateFormats")["hour"] = "HH:mm";

        const yAxis = xyChart.yAxes.push(
          am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererY.new(root, {}),
          })
        );

        // 折れ線グラフの Series を作成
        const series = xyChart.series.push(
          am5xy.LineSeries.new(root, {
            name: "Series 1",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "value",
            valueXField: "date",
            stroke: am5.color(0x6777ef),
          })
        );

        // データの設定
        const data = [
          { date: new Date(2023, 0, 1, 15).getTime(), value: 30 },
          { date: new Date(2023, 0, 1, 16).getTime(), value: 240 },
          { date: new Date(2023, 0, 1, 17).getTime(), value: 220 },
          { date: new Date(2023, 0, 1, 18).getTime(), value: 70 },
          { date: new Date(2023, 0, 1, 19).getTime(), value: 61 },
          { date: new Date(2023, 0, 1, 20).getTime(), value: 320 },
        ];
        series.data.setAll(data); // Seriesにデータをセット

        // ツールチップの設定
        series.set(
          "tooltip",
          am5.Tooltip.new(root, {
            labelText: "{valueY}",
          })
        );
      }
    });

    onBeforeUnmount(() => {
      if (root) {
        root.dispose();
      }
    });

    return {
      chartDiv,
    };
  },
});
</script>

<style scoped>
/* 必要に応じてスタイルを調整 */
</style>
