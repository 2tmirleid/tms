<template>
  <button class="logout-btn">
    <LogoutIcon/>
  </button>
</template>

<script>
import LogoutIcon from "@/components/UI/Icons/LogoutIcon.vue";

export default {
  components: {LogoutIcon}

}
</script>

<style scoped>
.logout-btn {
  cursor: pointer;
  background: none;
  border: none;
}
</style>