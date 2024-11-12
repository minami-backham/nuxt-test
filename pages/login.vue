<script lang="ts" setup>
import QrCodeGenerator from "~/components/QrCodeGenerator.vue";

const url = ref<string>("");

onMounted(() => {
  url.value = "https://www.google.com/";
});
</script>

<template>
  <div class="flex flex-col items-center">
    <h1 class="text-2xl font-bold">ログイン画面</h1>
    <QrCodeGenerator :url="url" />
    <div>6桁コード表示</div>
  </div>
</template>
