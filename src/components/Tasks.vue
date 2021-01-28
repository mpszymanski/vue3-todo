<template>
  <h1 class="text-xl text-center font-bold">Your tasks</h1>
  <tasks-input class="mt-4" @submit="addTask" />
  <template v-if="hasAnyTask">
    <ul class="mt-4" data-test="tasks-list">
      <tasks-item
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @toggle="toggleTaskDone"
        @remove="removeTask"
      />
    </ul>
    <div class="mt-1 p-2 text-center">
      <button
        data-test="remove-all-tasks-button"
        class="px-3 py-2 text-sm rounded-lg bg-red-700 focus:outline-none"
        @click="removeAllTasks"
      >
        Remove all
      </button>
    </div>
  </template>
  <p v-else class="mt-1 p-2 italic">
    Your task list is <strong>empty</strong>. Let`s fill it with your duties!
  </p>
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
      hasAnyTask,
      fetchTasks,
      addTask,
      toggleTaskDone,
      removeTask,
      removeAllTasks
    } = useTasks();

    onMounted(fetchTasks);

    return {
      tasks,
      hasAnyTask,
      fetchTasks,
      addTask,
      toggleTaskDone,
      removeTask,
      removeAllTasks
    };
  }
});
</script>
