<template>
  <button class="edit-btn">
    <EditIcon/>
  </button>
</template>

<script>
import EditIcon from "@/components/UI/Icons/EditIcon.vue";

export default {
  components: {EditIcon}
}
</script>

<style scoped>
.edit-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
}
</style>