<template>
  <h1 class="text-xl text-center font-bold">To do list</h1>
  <tasks-input class="mt-4" @submit="addTask" />
  <ul class="mt-4">
    <tasks-item
      v-for="task in state.tasks"
      :key="task.id"
      :task="task"
      @toggle="toggleTaskDone"
      @remove="removeTask"
    />
  </ul>
</template>

<script>
import { v4 as uuid } from "uuid";
import { reactive, toRefs, onMounted } from "vue";

import TasksInput from "@/components/TasksInput";
import TasksItem from "@/components/TasksItem";
import tasksRepository from "@/repositories/tasksRepository";

export default {
  name: "Tasks",
  components: { TasksItem, TasksInput },
  setup() {
    const state = reactive({
      tasks: []
    });

    const fetchTasks = async () => {
      try {
        const { data } = await tasksRepository.getTasks();
        state.tasks = data;
      } catch (error) {
        //
      }
    };

    const addTask = taskName => {
      state.tasks.push({
        id: uuid(),
        name: taskName,
        isDone: false
      });
    };

    function findTaskIndexById(taskId) {
      return state.tasks.findIndex(task => task.id === taskId);
    }

    const toggleTaskDone = taskId => {
      const { tasks } = toRefs(state);
      const taskIndex = findTaskIndexById(taskId);

      tasks.value[taskIndex].isDone = !tasks.value[taskIndex].isDone;
    };

    const removeTask = taskId => {
      if (confirm("Are you sure?")) {
        state.tasks.splice(findTaskIndexById(taskId), 1);
      }
    };

    onMounted(fetchTasks);

    return {
      state,
      addTask,
      toggleTaskDone,
      removeTask
    };
  }
};
</script>
