<template>
  <form @submit.prevent="handleformSubmit">
    <input class="w-full border border-gray-300 rounded-lg p-2" type="text" placeholder="New To Do" v-model="newToDotext" required>
  </form>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ToDoForm',
  emits: ['submit'],
  setup(props, { emit }) {
    let newToDotext = ref('')

    const handleformSubmit = () => {
      emit('submit', newToDotext.value)
      newToDotext.value = ''
    }

    return {
      handleformSubmit,
      newToDotext,
    }
  }
}
</script>