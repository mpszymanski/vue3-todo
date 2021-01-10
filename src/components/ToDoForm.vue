<template>
  <form @submit.prevent="handleFormSubmit">
    <input class="w-full border border-gray-300 rounded-lg p-2" type="text" placeholder="New To Do" v-model="taskName" required>
  </form>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ToDoForm',
  emits: ['submit'],
  setup(props, { emit }) {
    let taskName = ref('')

    const handleFormSubmit = () => {
      emit('submit', taskName.value)
      taskName.value = ''
    }

    return {
      handleFormSubmit,
      taskName,
    }
  }
}
</script>