<template>
  <div class="w-96 mx-auto p-4 md:mt-24">
    <tasks />
  </div>
</template>

<script>
import Tasks from "@/components/Tasks";

export default {
  name: "App",
  components: { Tasks }
};
</script>
