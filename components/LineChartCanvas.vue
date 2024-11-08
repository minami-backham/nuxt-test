<template>
  <canvas ref="canvas" :width="250" :height="80"></canvas>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";

export default defineComponent({
  name: "LineChartCanvas",
  props: {
    data: {
      type: Number,
      required: true,
    },
    minValue: {
      type: Number,
      required: true,
    },
    maxValue: {
      type: Number,
      required: true,
    },
    chartType: {
      type: String as () => "WindDirection" | "WindSpeed",
      required: true,
    },
  },
  setup(props) {
    const canvas = ref<HTMLCanvasElement | null>(null);
    let context: CanvasRenderingContext2D | null = null;
    const dataPoints = ref<number[]>([]);

    // グリッドを描画
    const drawGrid = () => {
      if (!context) return;

      // 背景を白で塗りつぶす
      context.clearRect(0, 0, 250, 80);
      context.fillStyle = "white";
      context.fillRect(0, 0, 250, 80);

      // フォントサイズとスタイル設定
      context.font = "8px Arial";
      context.fillStyle = "black";
      context.strokeStyle = "#ddd";

      const chartHeight = 60; // グラフエリアの高さ
      const chartTop = 10; // 縦方向の表示開始位置

      for (
        let i = props.minValue;
        i <= props.maxValue;
        i += (props.maxValue - props.minValue) / 4
      ) {
        const y =
          chartTop +
          (1 - (i - props.minValue) / (props.maxValue - props.minValue)) *
            chartHeight;
        context.fillText(i.toString(), 0, y + 3);
        context.beginPath();
        context.moveTo(20, y); // 横軸の開始位置
        context.lineTo(240, y);
        context.stroke();
      }

      // 横軸ラベルと補助線
      const hours = ["15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];
      const chartWidth = 220; // 横方向の表示エリア幅
      const chartLeft = 20; // 横軸の表示開始位置

      hours.forEach((hour, i) => {
        const x = chartLeft + (i / (hours.length - 1)) * chartWidth;

        context.fillText(hour, x - 10, 78);
        context.beginPath();
        context.moveTo(x, chartTop);
        context.lineTo(x, chartTop + chartHeight);
        context.stroke();
      });
    };

    // 折れ線グラフを描画
    const drawLine = () => {
      if (!context) return;

      // 線の色とスタイル設定
      context.strokeStyle = "blue";
      context.lineWidth = 1;

      // データのスケールと座標設定
      const chartHeight = 60;
      const chartTop = 10;
      const chartLeft = 20;
      const fixedXStep = 220 / (5 * 6); // グリッド1区間に6つのデータが収まるように設定

      context.beginPath();
      dataPoints.value.forEach((value, i) => {
        const x = chartLeft + fixedXStep * i;
        const y =
          chartTop +
          (1 - (value - props.minValue) / (props.maxValue - props.minValue)) *
            chartHeight;
        if (i === 0) {
          context.moveTo(x, y);
        } else {
          context.lineTo(x, y);
        }
      });
      context.stroke();
    };

    // グラフ全体を描画
    const drawChart = () => {
      drawGrid();
      drawLine();
    };

    // 初期設定と監視
    onMounted(() => {
      if (canvas.value) {
        context = canvas.value.getContext("2d");
        drawChart();
      }
    });

    watch(
      () => props.data,
      (newVal) => {
        if (dataPoints.value.length >= 30) {
          dataPoints.value.shift();
        }
        dataPoints.value.push(newVal);
        drawChart();
      }
    );

    return {
      canvas,
    };
  },
});
</script>
