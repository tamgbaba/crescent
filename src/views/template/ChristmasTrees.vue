<template>
    <div>
      <svg
        @click="addMerit"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="100"
        height="100"
      >
        <g fill="none" stroke="black" stroke-width="2" stroke-linecap="round">
          <!-- 木鱼的身体 -->
          <rect width="14" height="5" x="5" y="12"></rect>
          <rect width="4" height="12" x="10" y="0"></rect>
          <rect width="4" height="12" x="15" y="0"></rect>
  
          <!-- 木鱼的敲击部分 -->
          <circle cx="7" cy="9" r="2"></circle>
          <circle cx="16" cy="9" r="2"></circle>
        </g>
      </svg>
  
      <p>功德值: {{ merit }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        merit: 0,
      };
    },
    methods: {
      addMerit() {
        // 点击木鱼时，功德加一
        this.merit++;
      },
    },
  };
  </script>
  