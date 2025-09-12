<template>
  <div class="tree-container">
    <!-- Корневые папки -->
    <ul class="root-folder-tree">
      <li
          class="root folder"
          v-for="folder in localFolders"
          :key="folder.id"
          @dblclick="startEditFolderTitle(folder)"
          draggable="true"
          @dragstart.stop="$emit('start-folder-drag', $event, folder.id)"
          @dragover.prevent="$emit('handle-drag-over', $event, { type: 'folder', id: folder.id })"
          @dragleave="$emit('handle-drag-leave')"
          @drop.prevent="$emit('handle-drop', $event, { type: 'folder', id: folder.id })"
          @click="toggleFolder(folder)"
      >
        <div
            class="content"
            v-if="editedFolderID !== folder.id"
            @contextmenu.prevent.stop="showContextMenu(folder)"
        >
          <span class="icon">
            <FolderExpandedIcon
              v-if="folder.expanded"
            />

            <FolderCollapsedIcon
              v-if="!folder.expanded"
            />
          </span>
          <span class="title">{{ getTrimmedTitle(folder.title) }}</span>
        </div>

        <input
            v-else
            ref="folderInput"
            v-model="updatedFolderTitle"
            class="new-title"
            :placeholder="folder.title"
            @blur="cancelEditFolder"
            @keyup.enter="saveFolderTitle(folder.id)"
            @keyup.esc="cancelEditFolder"
        />

        <FolderContextMenu
            v-if="activeContextMenuId === folder.id"
            :folder="folder"
            @close="activeContextMenuId = null"
            @rename-folder="startEditFolderTitle"
            @delete-folder="deleteFolder"
        />

        <ul
            class="scenario-list"
            v-if="folder.expanded"
        >
          <li
              v-for="scenario in folder.scenarios"
              :key="scenario.id"
              class="scenario node"
              @click.stop="handleSelectScenario(scenario)"
              @dblclick.stop="startEditTitle(scenario)"
              draggable="true"
              @dragstart.stop="$emit('start-scenario-drag', $event, scenario.id)"
          >
            <div class="content" v-if="editedTitleID !== scenario.id">
              <span class="id">#{{ scenario.id }}</span>
              <span class="status" :style="{ backgroundColor: scenario.status.color }"></span>
              <span class="title">{{ getTrimmedTitle(scenario.title) }}</span>
            </div>

            <input
                v-else
                ref="titleInput"
                v-model="updatedScenarioTitle"
                class="new-title"
                :placeholder="scenario.title"
                @blur="cancelEdit"
                @keyup.enter="saveTitle(scenario.id)"
                @keyup.esc="cancelEdit"
            />
          </li>
        </ul>

        <!-- Вложенные папки -->
        <FolderNode
            v-if="folder.expanded"
            :folders="folder.children"
            @select="handleSelectScenario"
            @scenario-updated="handleScenarioUpdated"
            @folder-updated="handleFolderUpdated"
            @start-folder-drag="handleStartFolderDrag"
            @start-scenario-drag="handleStartScenarioDrag"
            @handle-drag-over="handleDragOver"
            @handle-drag-leave="handleDragLeave"
            @handle-drop="handleDrop"
            @is-drag-over-target="handleIsDragOverTarget"
            :dragged-item="draggedItem"
            :drag-over-target="dragOverTarget"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import {FolderMethods} from "@/api/folderMethods.js";
import FolderExpandedIcon from "@/components/UI/Icons/FolderExpandedIcon.vue";
import FolderNode from "@/components/Folder/FolderNode.vue";
import {ScenarioMethods} from "@/api/scenarioMethods.js";
import FolderContextMenu from "@/components/Folder/FolderContextMenu.vue";
import FolderCollapsedIcon from "@/components/UI/Icons/FolderCollapsedIcon.vue";

export default {
  inject: ['showAlert'],
  components: {FolderCollapsedIcon, FolderExpandedIcon, FolderContextMenu, FolderNode, },
  data() {
    return {
      folderMethods: new FolderMethods(),
      scenarioMethods: new ScenarioMethods(),
      localFolders: [],
      editedTitleID: 0,
      updatedScenarioTitle: '',
      editedFolderID: 0,
      updatedFolderTitle: '',
      activeContextMenuId: null,
      isExpanded: true,
    };
  },
  props: {
    folders: Array,
    draggedItem: Object,
    dragOverTarget: Object,
  },
  methods: {
    toggleFolder(folder) {
      folder.expanded = !folder.expanded;
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
    handleFolderUpdated(id) {
      this.$emit('folder-updated', id);
    },
    handleScenarioUpdated(id) {
      this.$emit('scenario-updated', id);
    },
    handleSelectScenario(scenario) {
      this.$emit('select', scenario);
    },
    getTrimmedTitle(title) {
      const max = this.maxTitleLength;
      if (!title || typeof title !== 'string') return '';
      return title.length > max ? title.slice(0, max) + '...' : title;
    },
    buildTree(flatList) {
      const idMap = new Map();
      const tree = [];

      flatList.forEach(folder => {
        idMap.set(folder.id, { ...folder, children: [], expanded: true });
      });

      flatList.forEach(folder => {
        if (folder.parent_id !== null) {
          const parent = idMap.get(folder.parent_id);
          if (parent) {
            parent.children.push(idMap.get(folder.id));
          }
        } else {
          tree.push(idMap.get(folder.id));
        }
      });

      return tree;
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

        const body = {"title": this.updatedScenarioTitle.trim() || this.scenarios.find(s => s.id === id).title}

        await this.scenarioMethods.updateScenario(id, body);

        this.handleScenarioUpdated(id);
        this.cancelEdit();
      } catch (error) {
        console.error("Update title error:" + error);
        this.showAlert('При попытке изменить название что-то пошло не так...');
      }
    },

    startEditFolderTitle(folder) {
      this.editedFolderID = folder.id;
      this.updatedFolderTitle = folder.title;

      console.log(folder)

      this.$nextTick(() => {
        if (this.$refs.folderInput?.length) {
          const input = this.$refs.folderInput[0];
          input.focus();
        }
      });
    },
    cancelEditFolder() {
      this.editedFolderID = 0;
      this.updatedFolderTitle = '';
    },
    async saveFolderTitle(id) {
      try {
        if (!this.updatedFolderTitle.trim()) {
          this.showAlert('Название папки не может быть пустым.');
          return;
        }

        const body = {"title": this.updatedFolderTitle.trim() || this.localFolders.find(f => f.id === id).title}

        await this.folderMethods.updateFolder(id, body);

        this.handleFolderUpdated(id);
        this.cancelEditFolder();
      } catch (error) {
        console.error("Update title error:" + error.message);
        this.showAlert('При попытке изменить название что-то пошло не так...');
      }
    },
    async deleteFolder(folder) {
      try {
        await this.folderMethods.deleteFolder(folder.id);
        this.handleFolderUpdated(folder.id);
      } catch (error) {
        console.error("Delete folder error:" + error);
        this.showAlert('Что-то пошло не так...');
      }
    },
    showContextMenu(folder) {
      this.activeContextMenuId = folder.id;
    },
  },
  mounted() {
    this.buildTree(this.folders);
  },
  watch: {
    folders: {
      deep: true,
      immediate: true,
      handler(newFolders) {
        this.localFolders = this.buildTree(newFolders);
      },
    },
  },
};
</script>

<style scoped>
.tree-container {
  padding: 18px 18px 0;
  overflow-y: auto;
  font-family: var(--font-primary);
  font-size: 14px;
}

.root.folder {
  border-left: 2px solid var(--border-color);
  border-radius: 10px;
  position: relative;
  margin-bottom: 10px;
}

.root-folder-tree {
  list-style: none;
  padding: 0;
  margin: 0;
}

.root.folder .content {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 3px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.root.folder .content:hover {
  background-color: var(--hover-bg);
}

.root.folder .content {
  padding: 5px 0;
  padding-left: 20px;
  height: 18px;
  display: flex;
  align-items: center;
}

.root.folder .icon {
  flex-shrink: 0;
}

.root.folder .title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  flex: 1;
}

.root.folder .scenario-list {
  list-style: none;
  margin-top: 4px;
  padding-left: 10px;
}

.root.folder .scenario.node .content {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.root.folder .scenario.node .content:hover {
  background-color: var(--hover-bg);
}

.root.folder .scenario.node .id {
  color: var(--id-color);
  min-width: 30px;
  text-align: right;
  flex-shrink: 0;
}

.root.folder .scenario.node .status {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  display: inline-block;
  flex-shrink: 0;
}

.root.folder .scenario.node .title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  flex: 1;
}

.new-title {
  width: 100%;

  font-family: var(--font-primary);
  font-size: 14px;
  font-weight: normal;

  background: none;
  border: none;
  outline: none;
}
</style>