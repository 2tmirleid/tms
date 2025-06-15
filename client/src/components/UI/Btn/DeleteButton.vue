<template>
  <button class="delete-btn">
    <DeleteIcon/>
  </button>
</template>
<script setup>
import DeleteIcon from "@/components/UI/Icons/DeleteIcon.vue";
</script>

<style scoped>
.delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
}
</style>