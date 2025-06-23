<template>
  <button class="close-btn">
    <CloseIcon/>
  </button>
</template>

<script>
import CloseIcon from "@/components/UI/Icons/CloseIcon.vue";

export default {
  components: {CloseIcon}

}
</script>

<style scoped>
.close-btn {
  background: none;
  border: none;
  cursor: pointer;
}
</style>