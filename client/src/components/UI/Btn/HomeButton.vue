<template>
  <button class="home-btn">
    <HomeIcon/>
  </button>
</template>

<script>
import HomeIcon from "@/components/UI/Icons/HomeIcon.vue";

export default {
  components: {HomeIcon}

}
</script>

<style scoped>
.home-btn {
  background: none;
  border: none;
  cursor: pointer;
}
</style>