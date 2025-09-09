<template>
  <div class="creators">
    <transition name="fade-slide">
      <button class="creator">
        <AddIcon/>
        Проект
      </button>
    </transition>
  </div>
</template>

<script>
import AddIcon from "@/components/UI/Icons/AddIcon.vue";

export default {
  components: { AddIcon }
}
</script>

<style scoped>
.creators {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.creator {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 5px 10px;
  font-family: var(--font-primary);
  font-size: 15px;
  background: #FFFFFF;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.creator:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}
</style>
