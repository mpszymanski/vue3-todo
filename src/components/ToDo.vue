<template>
  <h1 class="text-xl text-center font-bold">To do list</h1>
  <to-do-form class="mt-4" @submit="addTask" />
  <to-do-list class="mt-4" :tasks="tasks" @toggle="toggleTaskDone" />
</template>

<script>
import ToDoForm from './ToDoForm.vue'
import ToDoList from './ToDoList.vue'

import { v4 as uuidv4 } from 'uuid';
import { reactive } from "@vue/reactivity";

export default {
  components: { ToDoForm, ToDoList },
  name: 'ToDo',
  setup() {
    const tasks = reactive([
      {
        id: uuidv4(),
        name: 'Task 1',
        isDone: true,
      },
      {
        id: uuidv4(),
        name: 'Task 2',
        isDone: false,
      }
    ])

    const addTask = (taskName) => {
      tasks.push({
        id: uuidv4(),
        name: taskName,
        isDone: false,
      })
    }

    const toggleTaskDone = (taskId) => {
      const taskIndex = tasks.findIndex((task) => task.id === taskId)

      tasks[taskIndex].isDone = !tasks[taskIndex].isDone
    }

    return {
      tasks,
      addTask,
      toggleTaskDone,
    }
  }
}
</script>