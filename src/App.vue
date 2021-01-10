<template>
  <div class="w-96 mx-auto p-4 md:mt-24">
    <to-do />
  </div>
</template>

<script>
import ToDo from './components/ToDo.vue'

export default {
  name: 'App',
  components: {
    ToDo
  }
}
</script>
