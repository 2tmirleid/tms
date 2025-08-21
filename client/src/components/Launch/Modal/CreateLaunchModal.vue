<template>
  <div class="create-launch-modal">
    <div class="close">
      <CloseButton
          @click="this.$emit('close-modal')"
      />
    </div>

    <div class="fields">
      <div class="title field">
        <h4>Название</h4>

        <input
            type="text"
            v-model="newLaunch.title"
            required>
      </div>

      <div class="description field">
        <h4>Описание</h4>

        <input
            type="text"
            v-model="newLaunch.description"
        >
      </div>
    </div>

    <CreateLaunchButton
      @click="createLaunch"
    />
  </div>
</template>

<script>
import CloseButton from "@/components/UI/Btn/CloseButton.vue";
import CreateLaunchButton from "@/components/UI/Btn/CreateLaunchButton.vue";

export default {
  components: {CreateLaunchButton, CloseButton},
  inject: ['showAlert'],
  data() {
    return {
      newLaunch: {
        title: '',
        description: ''
      }
    }
  },
  props: {
    testPlanID: Number,
  },
  methods: {
    async createLaunch() {
      if (!this.newLaunch.title.trim()) {
        this.showAlert('Название запуска не может быть пустым');
        return;
      }

      if (this.newLaunch.title.length > 255) {
        this.showAlert('Название запуска не может превышать 255 символов');
        return;
      }

      const launch = {
        title: this.newLaunch.title,
        description: this.newLaunch.description,
        testPlan: this.testPlanID
      }

      this.$emit('create-launch', launch);
    }
  }
}
</script>

<style scoped>
.create-launch-modal {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  width: 60%;
  height: 60%;
  border: 1px solid var(--border-color);
  background-color: #FFFFFF;
  border-radius: 20px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
  z-index: 998;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
}

.fields {
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.field input {
  padding: 5px;
  margin-top: 10px;
  width: 35%;
  height: 15px;
  border-radius: 5px;
  border: 2px solid var(--border-color);
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
  outline: none;
  font-family: var(--font-primary);
}
</style>