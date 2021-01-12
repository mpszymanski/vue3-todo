<template>
  <h1 class="text-xl text-center font-bold">To do list</h1>
  <tasks-input class="mt-4" @submit="addTask" />
  <ul class="mt-4">
    <tasks-item
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @toggle="toggleTaskDone"
      @remove="removeTask"
    />
  </ul>
</template>

<script>
import { v4 as uuid } from "uuid";
import { reactive } from "vue";

import TasksInput from "@/components/TasksInput";
import TasksItem from "@/components/TasksItem";

export default {
  name: "Tasks",
  components: { TasksItem, TasksInput },
  setup() {
    const tasks = reactive([
      {
        id: uuid(),
        name: "Task 1",
        isDone: true
      },
      {
        id: uuid(),
        name: "Task 2",
        isDone: false
      }
    ]);

    const addTask = taskName => {
      tasks.push({
        id: uuid(),
        name: taskName,
        isDone: false
      });
    };

    function findTaskIndexById(taskId) {
      return tasks.findIndex(task => task.id === taskId);
    }

    const toggleTaskDone = taskId => {
      const taskIndex = findTaskIndexById(taskId);

      tasks[taskIndex].isDone = !tasks[taskIndex].isDone;
    };

    const removeTask = taskId => {
      if (confirm("Are you sure?")) {
        tasks.splice(findTaskIndexById(taskId), 1);
      }
    };

    return {
      tasks,
      addTask,
      toggleTaskDone,
      removeTask
    };
  }
};
</script>
