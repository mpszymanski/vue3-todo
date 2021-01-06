<template>
  <h1 class="text-xl text-center font-bold">To do list</h1>
  <to-do-form class="mt-4" @submit="onSubmit" />
  <to-do-list class="mt-4" :todoes="todoes" />
</template>

<script>
import { ref } from 'vue'
import ToDoForm from './ToDoForm.vue'
import ToDoList from './ToDoList.vue'

export default {
  components: { ToDoForm, ToDoList },
  name: 'ToDo',
  setup() {
    const todoes = ref([])

    const onSubmit = (todo) => {
      todoes.value.push(todo)
    }

    return {
      todoes,
      onSubmit,
    }
  }
}
</script>