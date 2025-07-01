<template>
  <main class="app-container">
    <alert
        v-if="globalAlert.visible"
        @close-alert="globalAlert.visible = false"
    >
      {{ globalAlert.message }}
    </alert>

    <router-view :class="{ blur: globalAlert.visible }" />
  </main>
</template>

<script>
import "@/assets/main.css";
import Alert from "@/components/UI/Alert.vue";

export default {
  components: {Alert},
  data() {
    return {
      globalAlert: {
        visible: false,
        message: '',
      },
    };
  },
  provide() {
    return {
      showAlert: this.showAlert,
    };
  },
  methods: {
    showAlert(message) {
      console.log(message)
      this.globalAlert.message = message;
      this.globalAlert.visible = true;
    },
  },
}
</script>

<style scoped>
.blur {
  filter: blur(4px);
}
</style>