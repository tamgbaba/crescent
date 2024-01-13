<template>
  <div>
    <buttonCustom @click="sum++">{{ sum }}</buttonCustom>
  </div>
</template>

<script setup>
import buttonCustom from "@/views/template/buttonCustom.vue";
import { ref } from "vue";

const sum = ref(0);
</script>

<style>
</style>