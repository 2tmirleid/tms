<template>
  <section class="scenario-list" :style="{
    width: `${width}%`,
    minWidth: `${minWidth}%`,
    maxWidth: `${maxWidth}%`,
  }">
    <ScenarioListHeader
        @refresh-scenarios-list="refreshScenarios"
        @found-scenario="handleFoundScenario"
        @scenario-sorted="handleSortScenario"
    />

    <div class="scenarios-container">
      <div class="scenarios-content">
        <transition-group name="scenario" tag="ul" class="scenarios" appear>
          <!-- Рекурсивное отображение папок -->
          <li
              v-for="folder in rootFolders"
              :key="'folder-' + folder.id"
              class="scenario-item folder"
          >
            <FolderItem
                :folder="folder"
                :scenarios="scenarios"
                :expanded-folders="expandedFolders"
                :folders="folders"
                :edited-title-id="editedTitleID"
                :updated-scenario-title="updatedScenarioTitle"
                @toggle-folder="toggleFolder"
                @start-folder-drag="startFolderDrag"
                @start-scenario-drag="startScenarioDrag"
                @handle-drag-over="handleDragOver"
                @handle-drag-leave="handleDragLeave"
                @handle-drop="handleDrop"
                @is-drag-over-target="isDragOverTarget"
                @select-scenario="$emit('select', $event)"
                @start-edit-title="startEditTitle"
                @save-title="saveTitle"
                @cancel-edit="cancelEdit"
                @get-trimmed-title="getTrimmedTitle"
                @update-title="updateScenarioTitle"
            />
          </li>

          <!-- Несортированные сценарии -->
          <li
              v-for="scenario in unfolderedScenarios"
              :key="scenario.id"
              class="scenario-item"
              @click="$emit('select', scenario)"
              @dblclick="startEditTitle(scenario)"
              draggable="true"
              @dragstart="startScenarioDrag($event, scenario)"
          >
            <template v-if="editedTitleID !== scenario.id">
              <span class="scenario-id">#{{ scenario.id }}</span>
              <span class="status-indicator" :style="{backgroundColor: scenario.status.color}"></span>
              <span class="scenario-title">{{ getTrimmedTitle(scenario.title) }}</span>
            </template>

            <input
                v-else
                ref="titleInput"
                v-model="updatedScenarioTitle"
                class="title-edit-input"
                :placeholder="scenario.title"
                @blur="cancelEdit"
                @keyup.enter="saveTitle(scenario.id)"
                @keyup.esc="cancelEdit"
            />
          </li>
        </transition-group>
      </div>

      <!-- Видимая зона для перетаскивания в корень -->
      <div
          class="root-drop-zone"
          @dragover.prevent="handleRootDragOver"
          @dragleave="handleRootDragLeave"
          @drop.prevent="handleRootDrop"
      >
        <span class="root-drop-text"></span>
      </div>
    </div>

    <ScenarioCreator
        @scenario-created="refreshScenarios"
        @folder-created="refreshScenarios"
    />

    <div class="resizer" @mousedown="startResizing"></div>
  </section>
</template>

<script>
import {ScenarioMethods} from "@/api/scenarioMethods.js";
import {FolderMethods} from "@/api/folderMethods.js";
import ScenarioCreator from "@/components/Scenario/ScenarioCreator.vue";
import ScenarioListHeader from "@/components/Scenario/ScenarioListHeader.vue";
import FolderItem from "@/components/Scenario/FolderItem.vue";

export default {
  components: {ScenarioListHeader, ScenarioCreator, FolderItem},
  inject: ['showAlert'],

  data: () => ({
    scenarios: [],
    folders: [],
    expandedFolders: [],
    editedTitleID: 0,
    updatedScenarioTitle: '',
    scenarioMethods: new ScenarioMethods(),
    folderMethods: new FolderMethods(),
    minWidth: 35,
    width: 40,
    maxWidth: 60,
    resizing: false,
    startWidth: 0,
    startX: 0,
    draggedItem: null, // { type: 'scenario' | 'folder', data: object }
    dragOverTarget: null, // { type: 'folder', id: number }
    isDragOverRoot: false, // Флаг для индикации перетаскивания над зоной в корень
  }),

  computed: {
    unfolderedScenarios() {
      return this.scenarios.filter(scenario => !scenario.folder_id);
    },

    rootFolders() {
      return this.folders.filter(folder => !folder.parent_id);
    }
  },

  methods: {
    getScenariosByFolder(folderId) {
      return this.scenarios.filter(scenario => scenario.folder_id === folderId);
    },

    getChildFolders(parentId) {
      return this.folders.filter(folder => folder.parent_id === parentId);
    },

    async refreshScenarios() {
      try {
        const response = await this.scenarioMethods.getScenariosList();
        this.scenarios = response.data.sort((a, b) => a.id - b.id);
        await this.refreshFolders();
      } catch (error) {
        console.error("Fetch scenarios error:" + error);
        this.showAlert('При попытке получить список сценариев что-то пошло не так...');
      }
    },

    async refreshFolders() {
      try {
        const response = await this.folderMethods.getFolders();
        this.folders = response.data.sort((a, b) => a.id - b.id);
      } catch (error) {
        console.error("Fetch folders error:" + error);
        this.showAlert('При попытке получить список папок что-то пошло не так...');
      }
    },

    toggleFolder(folderId) {
      const index = this.expandedFolders.indexOf(folderId);
      if (index === -1) {
        this.expandedFolders.push(folderId);
      } else {
        this.expandedFolders.splice(index, 1);
      }
    },

    startScenarioDrag(event, scenario) {
      this.draggedItem = {type: 'scenario', data: scenario};
    },

    startFolderDrag(event, folder) {
      this.draggedItem = {type: 'folder', data: folder};
    },

    handleDragOver(event, target) {
      if (!this.draggedItem) return;

      // Для сценариев цель может быть папкой или корнем
      if (this.draggedItem.type === 'scenario') {
        if (target.type === 'folder') {
          this.dragOverTarget = target;
          this.isDragOverRoot = false;
        } else if (target.type === 'root') {
          this.dragOverTarget = target;
          this.isDragOverRoot = true;
        }
        return;
      }

      // Для папок: цель должна быть папкой и не должна совпадать с перетаскиваемой
      if (this.draggedItem.type === 'folder' &&
          target.type === 'folder' &&
          this.draggedItem.data.id !== target.id) {
        this.dragOverTarget = target;
        this.isDragOverRoot = false;
      }
    },

    handleDragLeave() {
      this.dragOverTarget = null;
      this.isDragOverRoot = false;
    },

    handleDrop(event, target) {
      if (!this.draggedItem || !this.dragOverTarget) return;

      try {
        if (this.draggedItem.type === 'scenario') {
          if (target.type === 'folder') {
            this.putScenarioToFolder(this.draggedItem.data.id, target.id);
          } else if (target.type === 'root') {
            this.pullOutScenario(this.draggedItem.data.id);
          }
        } else if (this.draggedItem.type === 'folder') {
          this.putFolderToFolder(this.draggedItem.data.id, target.id);
        }
      } finally {
        this.draggedItem = null;
        this.dragOverTarget = null;
        this.isDragOverRoot = false;
      }
    },

    isDragOverTarget(target) {
      return this.dragOverTarget &&
          this.dragOverTarget.type === target.type &&
          this.dragOverTarget.id === target.id;
    },

    async putScenarioToFolder(scenarioID, folderID) {
      try {
        await this.folderMethods.putScenario(scenarioID, folderID);
        await this.refreshScenarios();
      } catch (error) {
        this.showAlert('Что-то пошло не так...');
        console.error(`Error while dragging scenario to folder: ${error}`);
      }
    },

    async pullOutScenario(scenarioID) {
      try {
        await this.folderMethods.pullOutScenario(scenarioID);
        await this.refreshScenarios();
      } catch (error) {
        this.showAlert('Что-то пошло не так...');
        console.error(`Error while pulling out scenario: ${error}`);
      }
    },

    async putFolderToFolder(childFolderID, parentFolderID) {
      try {
        await this.folderMethods.putFolder(childFolderID, parentFolderID);
        await this.refreshScenarios();
      } catch (error) {
        this.showAlert('Что-то пошло не так...');
        console.error(`Error while dragging folder to folder: ${error}`);
      }
    },

    async pullOutFolder(folderID) {
      try {
        await this.folderMethods.pullOutFolder(folderID);
        await this.refreshScenarios();
      } catch (error) {
        this.showAlert('Что-то пошло не так...');
        console.error(`Error while pulling out folder: ${error}`);
      }
    },

    handleFoundScenario(scenario) {
      this.scenarios = Array.isArray(scenario.data) ? scenario.data : [scenario.data];
    },

    handleSortScenario(type) {
      switch (type) {
        case 'sort_asc':
          this.scenarios = this.scenarios.sort((a, b) => a.id - b.id);
          return;
        case 'sort_desc':
          this.scenarios = this.scenarios.sort((a, b) => b.id - a.id);
          return;
        case 'sort_alphabet':
          this.scenarios.sort((a, b) => a.title.localeCompare(b.title));
          return;
        case 'sort_status':
          this.scenarios.sort((a, b) => a.status.id - b.status.id);
          return;
      }
    },

    startEditTitle(scenario) {
      this.editedTitleID = scenario.id;
      this.updatedScenarioTitle = scenario.title;

      this.$nextTick(() => {
        if (this.$refs.titleInput?.length) {
          const input = this.$refs.titleInput[0];
          input.focus();
        }
      });
    },

    cancelEdit() {
      this.editedTitleID = 0;
      this.updatedScenarioTitle = '';
    },

    async saveTitle(id) {
      try {
        if (!this.updatedScenarioTitle.trim()) {
          this.showAlert('Название сценария не может быть пустым.');
          return;
        }

        const body = {"title": this.updatedScenarioTitle.trim()};
        await this.scenarioMethods.updateScenario(id, body);
        await this.refreshScenarios();
        this.$emit('scenario-updated', id);
        this.cancelEdit();
      } catch (error) {
        console.error("Update title error:" + error);
        this.showAlert('При попытке изменить название что-то пошло не так...');
      }
    },

    getTrimmedTitle(title) {
      const max = 120; // Максимальная длина заголовка
      if (!title || typeof title !== 'string') return '';
      return title.length > max ? title.slice(0, max) + '...' : title;
    },

    updateScenarioTitle(value) {
      this.updatedScenarioTitle = value;
    },

    startResizing(event) {
      this.resizing = true;
      this.startWidth = this.width;
      this.startX = event.clientX;

      document.addEventListener('mousemove', this.resize);
      document.addEventListener('mouseup', this.cancelResizing);
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'col-resize';
    },

    resize(event) {
      if (!this.resizing) return;
      const offsetX = event.clientX - this.startX;
      const offsetPercent = (offsetX / window.innerWidth) * 100;
      let newWidth = this.startWidth + offsetPercent;
      this.width = Math.max(this.minWidth, Math.min(newWidth, this.maxWidth));
    },

    cancelResizing() {
      this.resizing = false;
      document.removeEventListener('mousemove', this.resize);
      document.removeEventListener('mouseup', this.cancelResizing);
      document.body.style.removeProperty('user-select');
      document.body.style.removeProperty('cursor');
    },

    handleRootDragOver(event) {
      if (!this.draggedItem || (this.draggedItem.type !== 'scenario' && this.draggedItem.type !== 'folder')) return;

      this.isDragOverRoot = true;
      this.dragOverTarget = {type: 'root'};
    },

    handleRootDragLeave(event) {
      this.isDragOverRoot = false;
      this.dragOverTarget = null;
    },

    handleRootDrop(event) {
      if (!this.draggedItem) return;

      if (this.draggedItem.type === 'scenario') {
        this.pullOutScenario(this.draggedItem.data.id);
      } else if (this.draggedItem.type === 'folder') {
        this.pullOutFolder(this.draggedItem.data.id);
      }

      // Сбрасываем состояние
      this.isDragOverRoot = false;
      this.draggedItem = null;
      this.dragOverTarget = null;
    }
  }
  ,

  mounted() {
    this.refreshScenarios();
  }
  ,
}
</script>

<style scoped>
.scenario-list {
  position: relative;
  height: calc(100vh - 60px);
  background-color: #fff;
  border-radius: 20px 0 0 20px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--border-color);
  font-family: var(--font-primary);
  font-size: 14px;
}

.resizer {
  width: 4px;
  height: 100%;
  position: absolute;
  right: -2px;
  top: 0;
  cursor: col-resize;
  z-index: 10;
}

.scenarios-container {
  flex: 1;
  overflow-y: auto;
  padding: 12px 0;
  position: relative;
  display: flex;
  flex-direction: column;
}

.scenarios-content {
  flex: 0 0 auto;
}

.scenarios {
  list-style: none;
  padding: 0 18px;
  margin: 0;
}

.scenario-item {
  display: flex;
  align-items: center;
  padding: 5px 5px 5px;
  border-radius: 6px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.scenario-item:hover {
  background-color: var(--hover-bg);
}

.folder:hover {
  background-color: transparent;
}

.folder-header:hover {
  background-color: var(--hover-bg);
  border-radius: 6px;
}

.folder {
  flex-direction: column;
  align-items: stretch;
  padding: 0;
  background-color: rgba(0, 0, 0, 0.02);
  border-left: 2px solid var(--border-color);
}

.folder-header.drag-over {
  border: 2px dashed var(--border-color);
}

.folder-header {
  display: flex;
  align-items: center;
  padding: 5px 5px 5px 12px;
  cursor: pointer;
}

.folder-icon {
  margin-right: 8px;
  color: var(--id-color);
  flex-shrink: 0;
  width: 16px;
  text-align: center;
}

.folder-title {
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.scenario-sublist {
  list-style: none;
  padding: 3px 0 3px 10px;
  margin: 0;
}

.nested {
  padding: 3px 5px 3px 8px;
  margin-left: 0;
  border-left: none;
}

.scenario-id,
.folder-icon {
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 30px;
}

.scenario-id {
  color: var(--id-color);
  margin-right: 8px;
  flex-shrink: 0;
}

.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 8px;
  flex-shrink: 0;
}

.scenario-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex-grow: 1;
}

.title-edit-input {
  width: 100%;
  font: inherit;
  background: none;
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
}

/* Анимации */
.scenario-enter-active,
.scenario-leave-active {
  transition: all 0.3s ease;
}

.scenario-enter-from,
.scenario-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.scenario-move {
  transition: transform 0.3s ease;
}

.root-drop-zone {
  flex: 1;
  background-color: transparent;
  border: 2px dashed var(--primary-color);
  border-radius: 8px;
  margin: 8px 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
  min-height: 100px;
}

.root-drop-text {
  color: var(--primary-color);
  font-weight: 500;
  font-size: 14px;
  text-align: center;
}
</style>