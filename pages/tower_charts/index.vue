<script lang="ts">
import { defineComponent, ref, onBeforeMount, onMounted } from "vue";

import { useWeather } from "@/composables/useWeather";
import type { Weather } from "@/types/weatherTypes";

import LineChart from "@/components/Chart/LineChart.vue";

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
    LineChart,
  },
  async setup() {
    // 天気データ管理用のリアクティブ変数
    const weather = ref<Weather | null>(null);
    const pending = ref(false);
    const error = ref<Error | null>(null);

    /* methods */
    // 天気データを取得する関数
    const fetchWeather = async () => {
      pending.value = true;
      try {
        const { weather: data } = await useWeather();
        weather.value = data.value; // データを更新
        error.value = null; // エラーをリセット
      } catch (err: unknown) {
        error.value = err as Error;
        weather.value = null; // データをリセット
      } finally {
        pending.value = false;
      }
    };

    // デバイスごとのデータを生成する関数
    const generateData = (numDevices: number) => {
      const dataArr = [];

      for (let i = 1; i <= numDevices; i++) {
        dataArr.push({
          resource: `device ${i}`,
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
        });
      }

      return dataArr;
    };

    const dataArr = generateData(15);
    const devices = ref<Data[]>([...dataArr]); // デバイスごとのデータ

    // 乱数を生成する関数
    const generateRandomValue = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    let offset = Math.random() * 1000; // 乱数のオフセット（滑らかさに影響）
    let frequency = 0.5; // 周波数（滑らかさに影響）

    // 滑らかなノイズを生成する関数：気温、気圧、降水量、湿度のデータ更新に使用
    const smoothNoise = (x: any, min: number, max: number) => {
      const amplitude = (max - min) / 2;
      const center = (max + min) / 2;
      return Math.sin(x * frequency + offset) * amplitude + center;
    };

    // デバイスごとのデータを更新する関数
    const updateDataFields = () => {
      devices.value.forEach((deviceData) => {
        const _deviceData = { ...deviceData };

        _deviceData.fields["WindDirection(1)"].value = generateRandomValue(
          0,
          360
        );
        _deviceData.fields["WindDirection(2)"].value = generateRandomValue(
          0,
          360
        );
        _deviceData.fields["WindDirection(3)"].value = generateRandomValue(
          0,
          360
        );
        _deviceData.fields["WindDirection(4)"].value = generateRandomValue(
          0,
          360
        );
        _deviceData.fields["WindSpeed(1)"].value = generateRandomValue(5, 15);
        _deviceData.fields["WindSpeed(2)"].value = generateRandomValue(5, 15);
        _deviceData.fields["WindSpeed(3)"].value = generateRandomValue(5, 15);
        _deviceData.fields["WindSpeed(4)"].value = generateRandomValue(5, 15);

        deviceData = _deviceData;
      });
    };

    // 天気データを更新する関数
    const updateWeather = () => {
      if (!weather.value) return;

      const _weather = { ...weather.value };
      // 気温
      _weather.data.temperature = smoothNoise(
        new Date().getTime() / 1000,
        15,
        24
      );
      // 湿度
      _weather.data.humidity = smoothNoise(new Date().getTime() / 1000, 30, 60);
      // 気圧
      _weather.data.atmosphericPressure = smoothNoise(
        new Date().getTime() / 1000,
        1010,
        1020
      );
      // 降水量
      _weather.data.precipitation = smoothNoise(
        new Date().getTime() / 1000,
        5,
        15
      );

      weather.value = _weather;
    };

    // 経過時間を管理するリアクティブ変数
    const elapsedTime = ref("00:00:00");
    let startTime: number;
    let timerId: ReturnType<typeof setInterval>;

    // 経過時間を更新する関数
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

    let intervalId: ReturnType<typeof setInterval>;

    /* lifecycle hooks */
    onBeforeMount(async () => {
      // 0.5秒後に天気データの初回取得
      setTimeout(async () => {
        await fetchWeather(); // 天気データの初回取得
      }, 500);
    });
    onMounted(() => {
      intervalId = setInterval(updateWeather, 3000); // 天気データの更新
      setInterval(updateDataFields, 3000); // デバイスごとのデータ更新
      startTime = new Date().getTime();
      timerId = setInterval(updateElapsedTime, 1000); // 経過時間の更新
    });

    // コンポーネントが破棄されるときにIntervalをクリア
    onBeforeUnmount(() => {
      if (intervalId) clearInterval(intervalId);
      if (timerId) clearInterval(timerId);
    });

    return {
      devices,
      elapsedTime,
      weather,
      pending,
      error,
    };
  },
});
</script>

<template>
  <div class="container flex gap-x-8 p-2">
    <!-- 左サイド -->
    <div>
      <!-- 経過時間表示 -->
      <p>経過時間：{{ elapsedTime }}</p>

      <!-- ローディング表示を追加 -->
      <div v-if="pending">データを読み込み中...</div>

      <!-- エラー時の表示を追加 -->
      <div v-else-if="error">データの取得に失敗しました。</div>

      <div v-else-if="weather">
        <ul>
          <li>
            気温：{{ weather.data.temperature }}<br />
            湿度：{{ weather.data.humidity }}<br />
            降水量：{{ weather.data.precipitation }}<br />
            気圧：{{ weather.data.atmosphericPressure }}
          </li>
        </ul>
        <div>
          <p>気温</p>
          <LineChart
            :data="weather.data.temperature"
            :minValue="-5"
            :maxValue="35"
          />
          <p>気圧</p>
          <LineChart
            :data="weather.data.atmosphericPressure"
            :minValue="950"
            :maxValue="1050"
          />
          <p>降水量</p>
          <LineChart
            :data="weather.data.precipitation"
            :minValue="0"
            :maxValue="200"
          />
          <p>湿度</p>
          <LineChart
            :data="weather.data.humidity"
            :minValue="0"
            :maxValue="100"
          />
        </div>
      </div>
    </div>
    <!-- メイン画面 -->
    <div>
      <div
        v-for="(deviceData, index) in devices"
        :key="index"
        class="container flex justify-center"
      >
        <p>デバイス{{ index + 1 }}</p>

        <div v-for="i in 4" :key="i">
          <p>風向</p>
          <LineChart
            :data="deviceData.fields[`WindDirection(${i})`].value"
            :minValue="0"
            :maxValue="360"
            chartType="WindDirection"
          />
          <p>風速</p>
          <LineChart
            :data="deviceData.fields[`WindSpeed(${i})`].value"
            :minValue="0"
            :maxValue="20"
            chartType="WindSpeed"
          />
        </div>
      </div>
    </div>
  </div>
</template>
