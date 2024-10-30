<template>
  <div>
    <p>横棒グラフの表示</p>
    <div ref="chartDiv" style="width: 100%; height: 400px"></div>
  </div>
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

    // 横棒グラフのためのX軸とY軸の設定
    const yAxis = xyChart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "category", // Y軸がカテゴリ
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    const xAxis = xyChart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {}),
      })
    );

    // 横棒のSeries作成
    const series = xyChart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Series 1",
        xAxis: xAxis, // X軸は値
        yAxis: yAxis, // Y軸はカテゴリ
        valueXField: "value", // 横方向に伸びる値
        categoryYField: "category", // 縦方向に並ぶカテゴリ
      })
    );

    // 棒の太さを細くする設定
    series.columns.template.set("height", am5.percent(5)); // 50%の高さに設定
    // カテゴリ間のスペースを設定
    (yAxis.get("renderer") as am5xy.AxisRendererY).setAll({
      cellStartLocation: 0.1,
      cellEndLocation: 0.9,
    });

    // データの設定
    const data = [
      { category: "A", value: 50 },
      { category: "B", value: 70 },
      { category: "C", value: 30 },
    ];
    yAxis.data.setAll(data); // Y軸にデータ
    series.data.setAll(data); // Seriesにデータ
  }
});

onBeforeUnmount(() => {
  if (root) {
    root.dispose();
  }
});
</script>
