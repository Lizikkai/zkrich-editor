<template>
  <div>
    <RichEditor v-model:value="content" />
  </div>
</template>

<script setup lang="ts">
  import RichEditor from '@/components/RichEditor/RichEditor.vue'
  import { ref } from 'vue'

  const content = ref("")
</script>

<style scoped>

</style>