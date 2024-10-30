<template>
  <div ref="chartDiv" style="width: 100%; height: 400px"></div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";

const chartDiv = ref<HTMLElement | null>(null);
let root: am5.Root | undefined;
let xyChart: am5xy.XYChart | undefined;

onMounted(() => {
  if (chartDiv.value) {
    root = am5.Root.new(chartDiv.value);

    // XYChartを作成し、chart.containerに追加
    xyChart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        layout: root.verticalLayout,
      })
    );

    // X軸とY軸の設定
    const xAxis = xyChart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        renderer: am5xy.AxisRendererX.new(root, {}),
      })
    );

    const yAxis = xyChart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // Seriesの作成
    const series = xyChart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Series 1",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "category",
      })
    );

    // データの設定
    const data = [
      { category: "A", value: 50 },
      { category: "B", value: 70 },
      { category: "C", value: 30 },
    ];
    xAxis.data.setAll(data);
    series.data.setAll(data);
  }
});

onBeforeUnmount(() => {
  if (root) {
    root.dispose();
  }
});
</script>
