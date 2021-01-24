<template>
  <div class="w-96 mx-auto p-4 md:mt-24">
    <tasks />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Tasks from "./components/Tasks.vue";

@Options({
  components: {
    Tasks
  }
})
export default class App extends Vue {}
</script>
