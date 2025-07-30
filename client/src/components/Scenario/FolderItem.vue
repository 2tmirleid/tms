<template>
  <div class="folder-container">
    <div
        class="folder-header"
        :class="{ 
          'drag-over': isDragOverTarget({ type: 'folder', id: folder.id }),
          'nested-folder-header': isNested
        }"
        @click="$emit('toggle-folder', folder.id)"
        draggable="true"
        @dragstart="$emit('start-folder-drag', $event, folder)"
        @dragover.prevent="$emit('handle-drag-over', $event, { type: 'folder', id: folder.id })"
        @dragleave="$emit('handle-drag-leave')"
        @drop.prevent="$emit('handle-drop', $event, { type: 'folder', id: folder.id })"
    >
      <FolderIcon class="folder-icon"/>
      <span class="folder-title">{{ getTrimmedTitle(folder.title) }}</span>
    </div>

    <ul v-if="expandedFolders.includes(folder.id)" class="scenario-sublist">
      <!-- Вложенные папки -->
      <li
          v-for="childFolder in getChildFolders(folder.id)"
          :key="'folder-' + childFolder.id"
          class="scenario-item folder nested-folder"
      >
        <FolderItem 
          :folder="childFolder"
          :scenarios="scenarios"
          :expanded-folders="expandedFolders"
          :folders="folders"
          :edited-title-id="editedTitleId"
          :updated-scenario-title="updatedScenarioTitle"
          :is-nested="true"
          @toggle-folder="handleToggleFolder"
          @start-folder-drag="handleStartFolderDrag"
          @start-scenario-drag="handleStartScenarioDrag"
          @handle-drag-over="handleDragOver"
          @handle-drag-leave="handleDragLeave"
          @handle-drop="handleDrop"
          @is-drag-over-target="handleIsDragOverTarget"
          @select-scenario="handleSelectScenario"
          @start-edit-title="handleStartEditTitle"
          @save-title="handleSaveTitle"
          @cancel-edit="handleCancelEdit"
          @update-title="handleUpdateTitle"
        />
      </li>

      <!-- Сценарии в текущей папке -->
      <li
          v-for="scenario in getScenariosByFolder(folder.id)"
          :key="scenario.id"
          class="scenario-item nested"
          @click="$emit('select-scenario', scenario)"
          @dblclick="$emit('start-edit-title', scenario)"
          draggable="true"
          @dragstart="$emit('start-scenario-drag', $event, scenario)"
      >
        <template v-if="editedTitleId !== scenario.id">
          <span class="scenario-id">#{{ scenario.id }}</span>
          <span class="status-indicator" :style="{backgroundColor: scenario.status.color}"></span>
          <span class="scenario-title">{{ getTrimmedTitle(scenario.title) }}</span>
        </template>

        <input
            v-else
            ref="titleInput"
            :value="updatedScenarioTitle"
            @input="handleTitleInput"
            class="title-edit-input"
            :placeholder="scenario.title"
            @blur="$emit('cancel-edit')"
            @keyup.enter="$emit('save-title', scenario.id)"
            @keyup.esc="$emit('cancel-edit')"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import FolderIcon from "@/components/UI/Icons/FolderIcon.vue";

export default {
  name: 'FolderItem',
  components: { FolderIcon },
  
  props: {
    folder: {
      type: Object,
      required: true
    },
    scenarios: {
      type: Array,
      required: true
    },
    expandedFolders: {
      type: Array,
      required: true
    },
    folders: {
      type: Array,
      required: true
    },
    editedTitleId: {
      type: Number,
      default: 0
    },
    updatedScenarioTitle: {
      type: String,
      default: ''
    },
    isNested: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    editedTitleId(newId, oldId) {
      // Если начали редактировать сценарий в этой папке, устанавливаем фокус
      if (newId !== oldId && newId !== 0) {
        this.$nextTick(() => {
          const input = this.$refs.titleInput;
          if (input && input.length > 0) {
            input[0].focus();
          }
        });
      }
    }
  },

  methods: {
    getScenariosByFolder(folderId) {
      return this.scenarios.filter(scenario => scenario.folder_id === folderId);
    },

    getChildFolders(parentId) {
      return this.folders.filter(folder => folder.parent_id === parentId);
    },

    isDragOverTarget(target) {
      return this.$emit('is-drag-over-target', target);
    },

    getTrimmedTitle(title) {
      const max = 120; // Максимальная длина заголовка
      if (!title || typeof title !== 'string') return '';
      return title.length > max ? title.slice(0, max) + '...' : title;
    },

    handleTitleInput(event) {
      this.$emit('update-title', event.target.value);
    },

    // Обработчики событий для передачи наверх
    handleToggleFolder(folderId) {
      this.$emit('toggle-folder', folderId);
    },

    handleStartFolderDrag(event, folder) {
      this.$emit('start-folder-drag', event, folder);
    },

    handleStartScenarioDrag(event, scenario) {
      this.$emit('start-scenario-drag', event, scenario);
    },

    handleDragOver(event, target) {
      this.$emit('handle-drag-over', event, target);
    },

    handleDragLeave() {
      this.$emit('handle-drag-leave');
    },

    handleDrop(event, target) {
      this.$emit('handle-drop', event, target);
    },

    handleIsDragOverTarget(target) {
      return this.$emit('is-drag-over-target', target);
    },

    handleSelectScenario(scenario) {
      this.$emit('select-scenario', scenario);
    },

    handleStartEditTitle(scenario) {
      this.$emit('start-edit-title', scenario);
    },

    handleSaveTitle(id) {
      this.$emit('save-title', id);
    },

    handleCancelEdit() {
      this.$emit('cancel-edit');
    },

    handleUpdateTitle(value) {
      this.$emit('update-title', value);
    }
  }
}
</script>

<style scoped>
.folder-container {
  width: 100%;
}

.folder-header {
  display: flex;
  align-items: center;
  padding: 5px 5px 5px 12px;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.folder-header:hover {
  background-color: var(--hover-bg);
}

.folder-header.drag-over {
  border: 2px dashed var(--border-color);
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

.nested-folder {
  flex-direction: column;
  align-items: stretch;
  padding: 0;
  background-color: rgba(0, 0, 0, 0.01);
  border-left: 1px solid var(--border-color);
  margin-left: 10px;
}

.nested-folder-header {
  padding: 3px 5px 3px 8px;
}

.nested-folder .scenario-sublist {
  padding: 2px 0 2px 8px;
}

.nested {
  padding: 3px 5px 3px 8px;
  margin-left: 0;
  border-left: none;
}

.nested-folder .nested {
  padding: 2px 5px 2px 6px;
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

.scenario-id {
  color: var(--id-color);
  margin-right: 8px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 30px;
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
</style> 