<template>
  <transition name="fade-slide">
    <button
        v-if="!isNewFolder"
        class="folder-creator"
        @click="activateNewFolder"
        key="button"
    >
      <AddIcon/>
      Папка
    </button>
  </transition>

  <transition name="fade-slide">
    <input
        v-if="isNewFolder"
        class="new-folder"
        type="text"
        placeholder="Название папки"
        ref="folderInput"
        v-model="newFolderName"
        @blur="cancelSaving"
        @keyup.enter="saveFolder"
        @keyup.esc="cancelSaving"
        key="input"
    />
  </transition>
</template>

<script>
import AddIcon from "@/components/UI/Icons/AddIcon.vue";
import {FolderMethods} from "@/api/folderMethods.js";

export default {
  inject: ["showAlert"],
  components: {AddIcon},

  data() {
    return {
      isNewFolder: false,
      newFolderName: '',
      folderMethods: new FolderMethods()
    };
  },
  methods: {
    activateNewFolder() {
      this.isNewFolder = true;
      this.$nextTick(() => {
        this.$refs.folderInput.focus();
      });
    },
    cancelSaving() {
      this.newFolderName = '';
      this.isNewFolder = false;
    },
    async saveFolder() {
      try {
        if (this.newFolderName.length > 255) {
          this.showAlert('Название папки не может быть больше 255 символов');
          return;
        }

        if (!this.newFolderName.trim()) {
          this.showAlert('Название папки не может быть пустым.');
          return;
        }

        const body = { "title": this.newFolderName }

        await this.folderMethods.createFolder(body);

        this.$emit('folder-created');
        this.cancelSaving();
      } catch (e) {
        this.showAlert('При попытке сохранить папку что-то пошло не так...');
        console.error("Error while creating scenario: ", e);
      }
    }
  },
}
</script>

<style scoped>
.new-folder {
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

.folder-creator {
  cursor: pointer;
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  gap: 10px;
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
}

.folder-creator:hover {
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