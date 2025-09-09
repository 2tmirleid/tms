<template>
  <div class="create-project-modal">
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
            v-model="newProject.title"
            required>
      </div>

      <div class="description field">
        <h4>Описание</h4>

        <input
            type="text"
            v-model="newProject.description"
        >
      </div>
    </div>

    <CreateProjectButton
        @click="createProject"
    />
  </div>
</template>

<script>
import CloseButton from "@/components/UI/Btn/CloseButton.vue";
import CreateProjectButton from "@/components/Project/CreateProjectButton.vue";

export default {
  components: {CreateProjectButton, CloseButton},
  inject: ['showAlert'],
  data() {
    return {
      newProject: {
        title: '',
        description: ''
      }
    }
  },
  methods: {
    async createProject() {
      if (!this.newProject.title.trim()) {
        this.showAlert('Название проекта не может быть пустым');
        return;
      }

      if (this.newProject.title.length > 255) {
        this.showAlert('Название проекта не может превышать 255 символов');
        return;
      }

      const project = {
        title: this.newProject.title,
        description: this.newProject.description,
      }

      this.$emit('create-project', project);
    }
  }
}
</script>

<style scoped>
.create-project-modal {
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