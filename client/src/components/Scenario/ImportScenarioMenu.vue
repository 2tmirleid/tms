<template>
  <div class="import-scenario-menu">
    <div class="import-btn">
      <ImportButton
          @click="showImportMenu"
      />
    </div>

    <div
        class="import-wrapper"
        v-if="importMenu"
    >
      <div class="close-btn">
        <CloseButton
            @click.stop="hideImportMenu"
        />
      </div>

      <div class="import-area">
        <div class="upload-wrapper">
          <label class="file-upload">
            <input type="file" @change="handleFileChange">
            <span>Загрузить файл (.csv)</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImportButton from "@/components/UI/Btn/ImportButton.vue";
import CloseButton from "@/components/UI/Btn/CloseButton.vue";
import {ScenarioMethods} from "@/api/scenarioMethods.js";

export default {
  inject: ['showAlert'],
  components: {CloseButton, ImportButton},
  data() {
    return {
      scenarioMethods: new ScenarioMethods(),
      importMenu: false,
    }
  },
  methods: {
    showImportMenu() {
      this.importMenu = true;
    },
    hideImportMenu() {
      this.importMenu = false;
    },
    async handleFileChange(event) {
      try {
        const file = event.target.files[0];

        if (!file.name.includes('.csv')) {
          this.showAlert('Не поддерживаемый тип файла');
          return;
        }

        await this.importScenario(file);

        this.hideImportMenu();

        this.$emit("refresh-scenarios-list");
      } catch (error) {
        console.error(`Error while import scenario: ${error}`);
        this.showAlert('При попытке импортировать сценарий что-то пошло не так...');
      }
    },
    async importScenario(scenario) {
      try {
        const formData = new FormData();
        formData.append("scenario", scenario);

        await this.scenarioMethods.importScenario(formData);
      } catch (error) {
        console.error(`Error while import scenario: ${error}`);
        this.showAlert('При попытке импортировать сценарий что-то пошло не так...');
      }
    }
  }
}
</script>

<style scoped>
.import-scenario-menu {
  position: relative;
  display: inline-block;
}

.import-wrapper {
  background-color: #FFFFFF;
  position: absolute;
  right: 0%;
  top: 0%;
  padding: 8px 0;
  font-family: var(--font-primary);
  font-size: 13px;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
  transition: all 0.2s ease;
  min-width: 160px;
  z-index: 1000;
}

.import-wrapper .close-btn {
  display: flex;
  justify-content: flex-end;
  padding: 0 8px 4px 8px;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 4px;
}

.import-wrapper .import-area {
  display: flex;
  justify-content: center;
  padding: 8px;
  cursor: pointer;
}

.upload-wrapper {
  display: inline-block;
  cursor: pointer;
}

.file-upload {
  position: relative;
  display: inline-block;
  cursor: pointer;
  padding: 8px 16px;
  background-color: var(--border-color);
  border-radius: 6px;
  font-size: 12px;
  text-align: center;
  transition: background-color 0.3s ease;
}

.file-upload:hover {
  background-color: var(--hover-bg);
}

.file-upload input[type="file"] {
  position: absolute;
  left: 50%;
  top: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
</style>