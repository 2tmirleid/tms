<template>
  <button
      class="addStep"
  >
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
.addStep {
  position: relative;
  bottom: 10px;
  right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border: 1px solid #e8edf1;
  border-radius: 50%;
  background: #FFFFFF;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  cursor: pointer;
}

.addStep:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.addStep.active {
  transform: rotate(43deg);
}
</style>