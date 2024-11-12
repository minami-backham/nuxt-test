<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import QRCode from "qrcode";

interface Props {
  url: string;
}

const props = defineProps<Props>();
const qrCanvas = ref<HTMLCanvasElement | null>(null);

const generateQRCode = async (url: string) => {
  if (qrCanvas.value && url) {
    await QRCode.toCanvas(qrCanvas.value, url);
  }
};

// URLが更新されるたびにQRコードを再生成する
watch(
  () => props.url,
  (newUrl) => {
    if (newUrl) generateQRCode(newUrl);
  }
);

onMounted(() => {
  if (props.url) generateQRCode(props.url);
});
</script>

<template>
  <div class="flex flex-col items-center">
    <canvas ref="qrCanvas"></canvas>
  </div>
</template>
