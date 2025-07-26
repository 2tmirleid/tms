<template>
  <button class="add-btn">
    <AddIcon/>
  </button>
</template>

<script>
import AddIcon from "@/components/UI/Icons/AddIcon.vue";

export default {
  components: {AddIcon}

}
</script>

<style scoped>
.add-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 2px solid var(--border-color);
  cursor: pointer;
  background: #FFFFFF;
}

.add-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.add-btn svg {
  width: 15px;
  height: 15px;
}
</style>