<template>
  <Son :message="x" @son-x="getSonX"></Son>
  <button @click="x++">x</button>

  <h1>我是dom标签h1</h1>
  <Brother ref="brotherRef" class="boo"> </Brother>
</template>

<script>
export default {
  created() {},
};
</script>
<script setup>
import Son from "@/views/ByValue/Son.vue";
import Brother from "@/views/ByValue/Brother.vue";

import { onMounted, provide, ref } from "vue";
onMounted(() => {
  brotherRef.value.$el.style.color = "aqua"
  console.log(brotherRef.value)
  debugger
});

const x = ref(0);
const getSonX = (sum) => {
  x.value--;
};

const brotherRef = ref(null);

provide('dataKey',x)
</script>
<style>
</style>