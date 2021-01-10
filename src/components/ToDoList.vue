<template>
  <ul>
    <li
      v-for="task in tasks"
      :key="task.id"
      class="relative p-3 pl-12 border-gray-300 border-b cursor-pointer select-none last:border-b-0"
      :class="{ 'line-through': task.isDone }"
      @click="toggleDone(task.id)"
    >
      <span class="absolute top-0 left-0 p-3">
        <font-awesome-icon v-if="task.isDone" class="text-green-300" size="lg" :icon="['fas', 'check-circle']" />
        <font-awesome-icon v-else class="text-gray-500" size="lg" :icon="['far', 'check-circle']" />
      </span>
      {{ task.name }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ToDoInput',
  emits: ['toggle'],
  props: {
    tasks: {
      type: Array,
      required: true,
    }
  },
  setup(props, { emit }) {
    const toggleDone = (taskId) => {
      emit('toggle', taskId)
    }

    return {
      toggleDone
    }
  }
}
</script>