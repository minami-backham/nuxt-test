<template>
  <div class="flex justify-center">
    <canvas ref="canvas" :width="250" :height="80"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, ref, watch } from "vue";

export default defineComponent({
  name: "LineChartCanvas",
  props: {
    data: {
      type: Array as () => Array<{ time: string; value: number }>,
      required: true,
    },
  },
  setup(props) {
    const canvas = ref<HTMLCanvasElement | null>(null);
    let context: CanvasRenderingContext2D | null = null;

    const drawGrid = () => {
      if (!context) return;

      // 背景を白で塗りつぶす
      context.fillStyle = "white";
      context.fillRect(0, 0, 250, 80);

      // フォントサイズとスタイル設定
      context.font = "8px Arial"; // フォントサイズを8pxに設定
      context.fillStyle = "black";
      context.strokeStyle = "#ddd";

      // 縦軸ラベルと補助線
      const yMax = 360;
      const chartHeight = 60; // グラフエリアの高さ（軸とラベルの余白を考慮）
      const chartTop = 10; // 縦方向の表示開始位置（余白）

      for (let i = 0; i <= 360; i += 120) {
        const y = chartTop + (1 - i / yMax) * chartHeight;
        context.fillText(i.toString(), 0, y + 3); // 余白を2px確保しつつラベルを表示
        context.beginPath();
        context.moveTo(20, y); // 横軸の開始位置を20pxに調整
        context.lineTo(240, y);
        context.stroke();
      }

      // 横軸ラベルと補助線
      const hours = ["15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];
      const chartWidth = 220; // 横方向の表示エリア幅
      const chartLeft = 20; // 横軸の表示開始位置

      hours.forEach((hour, i) => {
        const x = chartLeft + (i / (hours.length - 1)) * chartWidth;

        // ラベルのY座標を下に調整し、余白を確保して表示
        context.fillText(hour, x - 10, 78);

        context.beginPath();
        context.moveTo(x, chartTop);
        context.lineTo(x, chartTop + chartHeight);
        context.stroke();
      });
    };

    const drawLine = () => {
      if (!context) return;

      // 線の色とスタイル設定
      context.strokeStyle = "blue";
      context.lineWidth = 1;

      // データのスケールと座標設定
      const yMax = 360;
      const chartHeight = 60;
      const chartTop = 10;
      const chartWidth = 220;
      const chartLeft = 20;

      const xStep = chartWidth / (props.data.length - 1);

      context.beginPath();
      props.data.forEach((point, i) => {
        const x = chartLeft + xStep * i;
        const y = chartTop + (1 - point.value / yMax) * chartHeight;
        if (i === 0) {
          context.moveTo(x, y);
        } else {
          context.lineTo(x, y);
        }
      });
      context.stroke();
    };

    const renderChart = () => {
      drawGrid();
      drawLine();
    };

    onMounted(() => {
      if (canvas.value) {
        context = canvas.value.getContext("2d");
        renderChart();
      }
    });

    // データが更新されるたびに再描画
    watch(
      () => props.data,
      () => renderChart(),
      { deep: true }
    );

    onBeforeUnmount(() => {
      context = null;
    });

    return {
      canvas,
    };
  },
});
</script>

<style scoped>
canvas {
  display: block;
}
</style>
