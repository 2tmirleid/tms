<template>
  <div class="creators">
    <transition name="fade-slide">
      <button
          class="creator"
          key="button"
      >
        <LaunchIcon/>
        Запустить
      </button>
    </transition>
  </div>
</template>

<script>

import LaunchIcon from "@/components/UI/Icons/LaunchIcon.vue";

export default {
  components: { LaunchIcon}

}
</script>

<style scoped>
.creators {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 999;
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
  height: 35px;

  svg {
    width: 20px;
  }
}

.creator:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}
</style>