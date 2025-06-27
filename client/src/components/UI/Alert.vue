<template>
  <div class="alert">
    <div class="header">
      <CloseButton
          @click="closeAlert"
      />
    </div>

    <div class="content">
      <slot></slot>
    </div>

    <div class="footer">
      <OkButton
          @click="closeAlert"
      />
    </div>
  </div>
</template>

<script>
import CloseButton from "@/components/UI/Btn/CloseButton.vue";
import OkButton from "@/components/UI/Btn/OkButton.vue";

export default {
  components: {OkButton, CloseButton},
  methods: {
    closeAlert() {
      this.$emit('close-alert')
    }
  }
}
</script>

<style scoped>
.alert {
  z-index: 999;
  width: 200px;
  font-family: var(--font-primary);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #FFFFFF;
  border: 2px solid var(--border-color);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.header,
.footer {
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: flex-end;
  min-height: 10px;
}

.content {
  padding-left: 5px;
}
</style>