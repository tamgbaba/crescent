<template>
  <!-- <div> -->
  <!-- <div>原始数据：{{  list}}</div>
    <div>计算后数据：{{  computedList}}</div>

<button @click="add"  ref="myButton" style="color: #000;">x</button> -->
  <router-link to="/person">person</router-link>
  <br/>
  <br/>
  <br/>
  <router-link to="/screen">screen</router-link>

  <!-- </div> -->
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from "vue";
const list = reactive([1, 2, 3, 4, 5, 6, 7, 8]);
const computedList = computed(() => {
  return list.filter((itme) => itme > 2);
});
const add = () => {
  // console.log(list.value)
  list.add(666);
};
watch(
  list,
  (newVal, oldVal) => {
    console.log(newVal.length + "=====", oldVal.length);
  },
  { deep: true }
);

onMounted(() => {});
</script>

<script >
import { defineComponent } from "vue";


export default defineComponent({
  beforeRouteEnter(to, from, next) {
    // Do somethings
    console.log(to.path);
    console.log(from.path);
    next();
  },
});
</script>

<style>
</style>