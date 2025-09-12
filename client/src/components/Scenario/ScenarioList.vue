<template>
  <section class="scenario-list" :style="{
    width: `${this.width}%`,
    minWidth: `${this.minWidth}%`,
    maxWidth: `${this.maxWidth}%`
  }">
    <ScenarioListHeader
        @refresh-scenarios-list="refreshScenarios"
        @found-scenario="handleFoundScenario"
        @scenario-sorted="handleSortScenario"
    />

    <div class="scenarios-wrapper">
      <FolderTree
          @select="handleSelectScenario"
          @scenario-updated="handleScenarioUpdated"
          @folder-updated="handleFolderUpdated"
          :folders="folders"

          @start-folder-drag="startFolderDrag"
          @start-scenario-drag="startScenarioDrag"
          @handle-drag-over="handleDragOver"
          @handle-drag-leave="handleDragLeave"
          @handle-drop="handleDrop"
          @is-drag-over-target="isDragOverTarget"
          :dragged-item="draggedItem"
          :drag-over-target="dragOverTarget"
      />

      <ul
          class="scenarios dragover"
          @dragover.prevent="handleDragOver($event, {type: 'root'})"
          @drop.prevent="handleDrop($event, {type: 'root'})"
      >
        <transition-group
            name="scenario"
            tag="ul"
            class="scenarios"
            appear
        >
          <li
              v-for="scenario in scenarios.filter(scenario => scenario.folder_id === null)"
              :key="scenario.id"
              class="scenario-preview"
              @dblclick="startEditTitle(scenario)"
              @click="handleSelectScenario(scenario)"
              draggable="true"
              @dragstart="startScenarioDrag($event, scenario.id)"
          >
            <template v-if="editedTitleID !== scenario.id">
            <span class="title">
              <span class="id">#{{ scenario.id }}</span>
              <span class="status" :style="{backgroundColor: scenario.status.color}"></span>
              {{ getTrimmedTitle(scenario.title) }}
            </span>
            </template>

            <input
                v-else
                ref="titleInput"
                v-model="updatedScenarioTitle"
                class="new-scenario-title"
                :placeholder="scenario.title"
                @blur="cancelEdit"
                @keyup.enter="saveTitle(scenario.id)"
                @keyup.esc="cancelEdit"
            />
          </li>
        </transition-group>
      </ul>
    </div>

    <div
        class="root-drop-zone"
        @dragover.prevent="handleRootDragOver"
        @dragleave="handleRootDragLeave"
        @drop.prevent="handleRootDrop"
        :class="{ 'active': isDragOverRoot }"
    >
      <span class="root-drop-text"></span>
    </div>

    <ScenarioCreator
        @scenario-created="refreshScenarios"
        @folder-created="refreshFolders"
        :projectID="projectID"
    />

    <div class="resizer" @mousedown="startResizing"></div>
  </section>
</template>

<script>
import {ScenarioMethods} from "@/api/scenarioMethods.js";
import ScenarioCreator from "@/components/Scenario/ScenarioCreator.vue";
import DeleteButton from "@/components/UI/Btn/DeleteButton.vue";
import ScenarioListHeader from "@/components/Scenario/ScenarioListHeader.vue";
import ContextMenuButton from "@/components/UI/Btn/ScenarioContextMenuButton.vue";
import ContextMenu from "@/components/Scenario/ScenarioContextMenu.vue";
import FolderTree from "@/components/Folder/FolderTree.vue";
import {FolderMethods} from "@/api/folderMethods.js";
import FolderCreator from "@/components/Folder/FolderCreator.vue";

export default {
  components: {
    FolderCreator,
    FolderTree, ContextMenu, ContextMenuButton, ScenarioListHeader, DeleteButton, ScenarioCreator
  },
  inject: ['showAlert'],

  data: () => ({
    scenarios: [],
    folders: [],
    editedTitleID: 0,
    deletingTitleID: 0,
    maxTitleLength: 120,
    updatedScenarioTitle: '',
    showDeleteIcon: false,
    folderMethods: new FolderMethods(),
    scenarioMethods: new ScenarioMethods(),
    minWidth: 35,
    width: 40,
    maxWidth: 60,
    resizing: false,
    startWidth: 0,
    startX: 0,
    draggedItem: null,
    dragOverTarget: null,
    isDragOverRoot: false,
  }),

  props: {
    projectID: Number | String
  },

  methods: {
    handleRootDragOver(event) {
      if (!this.draggedItem) return;
      this.isDragOverRoot = true;
      event.preventDefault();
    },

    handleRootDragLeave() {
      this.isDragOverRoot = false;
    },

    async handleRootDrop(event) {
      if (!this.draggedItem) return;

      try {
        if (this.draggedItem.type === 'folder') {
          await this.folderMethods.pullOutFolder(this.draggedItem.data.id);
          await this.refreshFolders();
        } else if (this.draggedItem.type === 'scenario') {
          await this.folderMethods.pullOutScenario(this.draggedItem.data.id);
          await this.refreshScenarios();
        }
      } catch (error) {
        console.error("Ошибка перемещения:", error);
        this.showAlert('Не удалось переместить элемент');
      } finally {
        this.isDragOverRoot = false;
        this.draggedItem = null;
      }
    },

    startScenarioDrag(event, scenarioID) {
      const scenario = this.scenarios.find(s => s.id === scenarioID);
      this.draggedItem = {type: 'scenario', data: scenario};
    },

    startFolderDrag(event, folderId) {
      const folder = this.findFolderById(folderId, this.folders);
      this.draggedItem = {type: 'folder', data: folder};
    },

    findFolderById(id, folders) {
      for (const folder of folders) {
        if (folder.id === id) return folder;
        if (folder.children) {
          const found = this.findFolderById(id, folder.children);
          if (found) return found;
        }
      }
      return null;
    },

    handleDragOver(event, target) {
      if (!this.draggedItem) return;

      if (this.draggedItem.type === 'scenario') {
        this.dragOverTarget = target;
        event.preventDefault();
      } else if (this.draggedItem.type === 'folder') {
        if (target.type === 'folder' && this.draggedItem.data.id !== target.id) {
          this.dragOverTarget = target;
          event.preventDefault();
        } else if (target.type === 'root') {
          this.isDragOverRoot = true;
          event.preventDefault();
        }
      }
    },

    handleDragLeave() {
      this.dragOverTarget = null;
      this.isDragOverRoot = false;
    },

    async handleDrop(event, target) {
      if (!this.draggedItem) return;

      try {
        if (this.draggedItem.type === 'scenario') {
          if (target.type === 'folder') {
            await this.folderMethods.putScenario(this.draggedItem.data.id, target.id);
            await this.refreshScenarios();
          } else if (target.type === 'root') {
            await this.folderMethods.pullOutScenario(this.draggedItem.data.id);
            await this.refreshScenarios();
          }
        } else if (this.draggedItem.type === 'folder') {
          if (target.type === 'folder') {
            await this.folderMethods.putFolder(this.draggedItem.data.id, target.id);
            await this.refreshFolders();
          } else if (target.type === 'root') {
            await this.folderMethods.pullOutFolder(this.draggedItem.data.id);
            await this.refreshFolders();
          }
        }
      } catch (error) {
        console.error("Ошибка перемещения:", error);
        this.showAlert('Не удалось переместить элемент');
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

    handleSelectScenario(scenario) {
      this.$emit('select', scenario);
    },

    handleScenarioUpdated(id) {
      this.$emit('scenario-updated', id);
    },

    handleFolderUpdated(id) {
      this.$emit('folder-updated', id);
    },

    async refreshFolders() {
      const response = await this.folderMethods.getFolders(this.projectID);
      this.folders = response.data;
    },

    async refreshScenarios() {
      try {
        const response = await this.scenarioMethods.getScenariosList(this.projectID);
        this.scenarios = response.data.sort((a, b) => a.id - b.id);
        await this.refreshFolders();
      } catch (error) {
        console.error("Fetch scenarios error:" + error.message);
        this.showAlert('При попытке получить список сценариев что-то пошло не так...');
      }
    },

    async handleFoundScenario(scenario) {
      this.scenarios = Array.isArray(scenario.data) ? scenario.data : [scenario.data];
    },

    async handleSortScenario(type) {
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

        const body = {"title": this.updatedScenarioTitle.trim() || this.scenarios.find(s => s.id === id).title};

        await this.scenarioMethods.updateScenario(id, body);

        await this.refreshScenarios();
        this.handleScenarioUpdated(id);
        this.cancelEdit();
      } catch (error) {
        console.error("Update title error:" + error);
        this.showAlert('При попытке изменить название что-то пошло не так...');
      }
    },

    getTrimmedTitle(title) {
      const max = this.maxTitleLength;
      if (!title || typeof title !== 'string') return '';
      return title.length > max ? title.slice(0, max) + '...' : title;
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

      if (newWidth < this.minWidth) newWidth = this.minWidth;
      if (newWidth > this.maxWidth) newWidth = this.maxWidth;

      this.width = newWidth;
    },

    cancelResizing() {
      this.resizing = false;

      document.removeEventListener('mousemove', this.resize);
      document.removeEventListener('mouseup', this.cancelResizing);

      document.body.style.removeProperty('user-select');
      document.body.style.removeProperty('cursor');
    }
  },

  mounted() {
    this.refreshScenarios();
  },
}
</script>


<style scoped>
.scenarios-wrapper {
  flex: 1;
  overflow-y: auto;
  padding: 0 18px 18px;
}

.resizer {
  width: 4px;
  height: calc(100vh - 60px);
  background: none;
  cursor: col-resize;

  position: absolute;
  left: 100%;
}

.scenario-list {
  position: relative;

  height: calc(100vh - 60px);
  border: 1px solid var(--border-color);
  background-color: #FFFFFF;
  border-radius: 20px 0 0 20px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);

  display: flex;
  flex-direction: column;
}

.scenarios {
  list-style: none;
  margin: 0;
  padding: 0;
}

.scenario-preview {
  display: flex;
  gap: 10px;
  font-family: var(--font-primary);
  font-size: 14px;
  padding: 5px;
  border-radius: 5px;
  transition: background-color 0.2s ease;
  cursor: pointer;
  align-items: center;
}

.scenario-preview .title {
  display: flex;
  align-items: center;
  gap: 6px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  flex: 1;
}

.scenario-preview .title .id {
  color: var(--id-color);
  flex-shrink: 0;
  min-width: 30px;
  text-align: right;
}

.scenario-preview:hover {
  background-color: var(--hover-bg);
}

.new-scenario-title {
  width: 100%;

  font-family: var(--font-primary);
  font-size: 14px;
  font-weight: normal;

  background: none;
  border: none;
  outline: none;
}

.scenario-preview .status {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
}

/* Анимация появления */
.scenario-enter-active {
  transition: all 0.4s ease;
}

.scenario-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.scenario-enter-to {
  opacity: 1;
  transform: translateX(0);
}

/* Анимация удаления */
.scenario-leave-active {
  transition: all 0.4s ease;
  position: absolute;
}

.scenario-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.scenario-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.root-drop-zone {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.root-drop-zone.active {
  display: flex;
  pointer-events: auto;
}
</style>