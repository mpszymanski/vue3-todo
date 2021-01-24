<template>
  <form @submit.prevent="handleFormSubmit">
    <!--suppress HtmlFormInputWithoutLabel -->
    <input
      v-model="taskName"
      class="w-full border border-gray-300 rounded-lg p-2"
      type="text"
      placeholder="New To Do"
      required
    />
  </form>
</template>

<script>
import { ref } from "vue";

export default {
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
};
</script>
