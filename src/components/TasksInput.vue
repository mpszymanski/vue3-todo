<template>
  <form data-test="task-form" @submit.prevent="handleFormSubmit">
    <!--suppress HtmlFormInputWithoutLabel -->
    <input
      v-model="taskName"
      class="w-full rounded-lg p-2 placeholder-gray-500 border border-transparent text-white focus:text-white focus:border-gray-700 focus:outline-none focus:bg-white focus:bg-gray-900 bg-gray-200 bg-gray-800"
      data-test="task-input"
      type="text"
      placeholder="New task name"
      required
    />
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "TasksInput",
  emits: ["submit"],
  setup(props, { emit }) {
    let taskName = ref("");

    const handleFormSubmit = () => {
      if (taskName.value) {
        emit("submit", taskName.value);
        taskName.value = "";
      }
    };

    return {
      handleFormSubmit,
      taskName
    };
  }
});
</script>
