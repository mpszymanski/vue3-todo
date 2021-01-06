<template>
  <ul>
    <li class="p-3 border-gray-300 border-b last:border-b-0" v-for="todo in todoes" :key="todo">{{ todo }}</li>
  </ul>
</template>

<script>
export default {
  name: 'ToDoInput',
  props: {
    todoes: {
      type: Array,
      required: true,
    }
  },
}
</script>