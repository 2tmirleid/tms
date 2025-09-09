<template>
  <div class="creators">
    <transition name="fade-slide">
      <button
          v-if="!isNewScenario && !isNewFolder"
          class="creator"
          @click="activateNewScenario"
          key="button"
      >
        <AddIcon/>
        Сценарий
      </button>
    </transition>

    <transition name="fade-slide">
      <button
          v-if="!isNewFolder && !isNewScenario"
          class="creator"
          @click="activateNewFolder"
          key="button"
      >
        <AddIcon/>
        Папка
      </button>
    </transition>
  </div>

  <transition name="fade-slide">
    <input
        v-if="isNewScenario"
        class="new"
        type="text"
        placeholder="Название сценария"
        ref="scenarioInput"
        v-model="newScenarioName"
        @blur="cancelSavingScenario"
        @keyup.enter="saveScenario"
        @keyup.esc="cancelSavingScenario"
        key="input"
    />
  </transition>

  <transition name="fade-slide">
    <input
        v-if="isNewFolder"
        class="new"
        type="text"
        placeholder="Название папки"
        ref="folderInput"
        v-model="newFolderName"
        @blur="cancelSavingFolder"
        @keyup.enter="saveFolder"
        @keyup.esc="cancelSavingFolder"
        key="input"
    />
  </transition>
</template>

<script>
import {ScenarioMethods} from "@/api/scenarioMethods.js";
import AddIcon from "@/components/UI/Icons/AddIcon.vue";
import {FolderMethods} from "@/api/folderMethods.js";

export default {
  inject: ["showAlert"],

  components: {AddIcon},
  data() {
    return {
      isNewScenario: false,
      newScenarioName: '',
      isNewFolder: false,
      newFolderName: '',
      scenarioMethods: new ScenarioMethods(),
      folderMethods: new FolderMethods()
    };
  },
  props: {
    projectID: Number | String,
  },
  methods: {
    activateNewScenario() {
      this.isNewScenario = true;
      this.$nextTick(() => {
        this.$refs.scenarioInput.focus();
      });
    },
    activateNewFolder() {
      this.isNewFolder = true;
      this.$nextTick(() => {
        this.$refs.folderInput.focus();
      });
    },
    cancelSavingScenario() {
      this.newScenarioName = '';
      this.isNewScenario = false;
    },
    cancelSavingFolder() {
      this.newFolderName = '';
      this.isNewFolder = false;
    },
    async saveScenario() {
      try {
        if (this.newScenarioName.length > 255) {
          this.showAlert('Название сценария не может быть больше 255 символов');
          return;
        }

        if (!this.newScenarioName.trim()) {
          this.showAlert('Название сценария не может быть пустым.');
          return;
        }

        const body = { "title": this.newScenarioName }

        await this.scenarioMethods.createScenario(this.projectID, body);

        this.$emit('scenario-created');
        this.cancelSavingScenario();
      } catch (e) {
        this.showAlert('При попытке сохранить сценарий что-то пошло не так...');
        console.error("Error while creating scenario: ", e);
      }
    },
    async saveFolder() {
      try {
        if (this.newFolderName.length > 255) {
          this.showAlert('Название папки не может быть больше 255 символов');
          return;
        }

        const body = { "title": this.newFolderName };

        await this.folderMethods.createFolder(this.projectID, body);
        this.$emit('folder-created');
        this.cancelSavingFolder();
      } catch (e) {
        this.showAlert('При попытке создать папку что-то пошло не так...');
        console.error("Error while creating folder: ", e);
      }
    }
  },
};
</script>

<style scoped>
.new {
  width: 50%;
  padding: 5px 10px;
  font-family: var(--font-primary);
  font-size: 15px;
  font-weight: normal;
  background: #FFFFFF;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  z-index: 999;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  outline: none;
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
}

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
}

.creator:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}


.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translate(-50%, 10px);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translate(-50%, 0);
}
</style>