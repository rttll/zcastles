<template>
  <div class="w-40 h-4 bg-gray-500 rounded-full"></div>
  <div>
    <select name="" id="" class="w-12 border broder-gray-200">
      <option v-for="int in [1, 2, 3, 4, 5]" :key="int" :value="int">
        {{ int }}
      </option>
    </select>
  </div>
  <div>
    <select name="" id="" class="w-12 border broder-gray-200">
      <option v-for="int in [1, 2, 3, 4, 5]" :key="int" :value="int">
        {{ int }}
      </option>
    </select>
  </div>
</template>
