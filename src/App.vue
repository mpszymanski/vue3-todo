<template>
  <div class="w-96 mx-auto p-4 md:mt-24">
    <tasks />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Tasks from "./components/Tasks.vue";

export default defineComponent({
  components: {
    Tasks
  }
});
</script>
