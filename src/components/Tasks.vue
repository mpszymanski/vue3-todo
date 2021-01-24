<template>
  <h1 class="text-xl text-center font-bold">To do list</h1>
  <tasks-input class="mt-4" @submit="addTask" />
  <ul class="mt-4" data-test="tasks-list">
    <tasks-item
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @toggle="toggleTaskDone"
      @remove="removeTask"
    />
  </ul>
</template>

<script lang="ts">
import { onMounted, defineComponent } from "vue";

import TasksInput from "@/components/TasksInput.vue";
import TasksItem from "@/components/TasksItem.vue";
import useTasks from "@/composables/useTasks";

export default defineComponent({
  name: "Tasks",
  components: { TasksItem, TasksInput },
  setup() {
    const {
      tasks,
      fetchTasks,
      addTask,
      toggleTaskDone,
      removeTask
    } = useTasks();

    onMounted(fetchTasks);

    return {
      tasks,
      fetchTasks,
      addTask,
      toggleTaskDone,
      removeTask
    };
  }
});
</script>
