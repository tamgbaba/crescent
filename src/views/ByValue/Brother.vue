<template>
    <div id="brother" class="foo bar" >
        <label >{{ data }} {{ $attrs.class }}</label>
        <button @click="sum--">-</button><label>{{ sum }}</label><button @click="sum++">+</button>
    </div>
</template>

<script setup>
import { inject, ref } from "vue"
defineOptions({
    inheritAttrs:false
})
const sum = ref(0)

const data = inject('dataKey')

defineExpose({
    sum
})
</script>

<style  lang="css">
#brother{
    color:yellow;
}
</style>