<template>
  <div id="buttonCustom">
    <ChristmasTrees></ChristmasTrees>
    <button @click="$emit('click')"><slot /></button>
  </div>
</template>

<script setup>
import ChristmasTrees from './ChristmasTrees.vue';
defineEmits(["click"]);
</script>

<style>
</style>