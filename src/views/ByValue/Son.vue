<template>
  {{ message }}

  <button @click="sendX(message)">sendX</button>
</template>

<script setup>
import { ref } from "vue"

const props = defineProps({
    message:Number
})
const emit = defineEmits(['son-x'])


const sendX = (message)=>{
    emit('son-x',message)
}

</script>

<style>

</style>