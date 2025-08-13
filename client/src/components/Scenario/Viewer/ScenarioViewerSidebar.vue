<template>
  <section class="scenario-viewer-sidebar">
    <div class="fields">
      <div class="date">
        <div class="created field">
          <h4>Дата создания</h4>

          <span>{{ convertDate(scenario.createdAt) }}</span>
        </div>

        <div class="updated field">
          <h4>Дата изменения</h4>

          <span>{{ convertDate(scenario.updatedAt) }}</span>
        </div>
      </div>

      <div class="tag field">
        <h4>Теги</h4>

        <ul class="tags">
          <li
              class="tag-item"
              v-for="tag in scenario.tags"
              :key="tag.id"
          >
            <CloseButton
                @click="deleteTag(tag.id)"
            />

            <span>{{ tag.title }}</span>
          </li>

          <li class="add">
            <AddButton
                v-if="!addTag"
                @click="toggleAddTag"
            />
          </li>

          <li class="tag-add-input">
            <input
                v-if="addTag"
                class="new-tag"
                type="text"
                placeholder="Тег"
                ref="tagInput"
                v-model="newTag"
                @blur="toggleAddTag"
                @keyup.enter="submitTag"
            >
          </li>
        </ul>
      </div>

      <div class="attachment">
        <h4>Вложения</h4>

        <ul
            class="attachments"
        >
          <li class="add">
            <AddButton
                v-if="!addAttachment"
                @click="toggleAddAttachment"
            />
          </li>

          <li class="attachment-add-input">
            <input
                v-if="addAttachment"
                class="new-attachment"
                type="file"
                ref="attachmentInput"
                @blur="toggleAddAttachment"
                @change="submitAttachment"
            >
          </li>

          <li
              class="attachment-item"
              v-for="attachment in scenario.attachments"
              :key="attachment.id"
          >
            <CloseButton
                @click="deleteAttachment(attachment.id)"
            />

            <a :href="`http://localhost:8080${attachment.path}`" download>
              <span>{{ attachment.title }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import {convertDate} from "@/utils/dateConverter.js";
import AddIcon from "@/components/UI/Icons/AddIcon.vue";
import CloseButton from "@/components/UI/Btn/CloseButton.vue";
import {ScenarioMethods} from "@/api/scenarioMethods.js";
import AddButton from "@/components/UI/Btn/AddButton.vue";

export default {
  inject: ["showAlert"],
  components: {AddButton, CloseButton, AddIcon},
  data() {
    return {
      localScenario: {},
      scenarioMethods: new ScenarioMethods(),
      newTag: '',
      addTag: false,
      addAttachment: false,
    }
  },
  props: {
    scenario: Object
  },
  methods: {
    convertDate,
    toggleAddTag() {
      this.addTag = !this.addTag;
      this.addTag ? this.$nextTick(() => {
        this.$refs.tagInput.focus();
      }) : '';
    },
    async submitTag() {
      const tag = this.newTag;

      if (!tag.trim()) {
        this.showAlert("Тег не может быть пустым.");
        return;
      }

      if (tag.trim().length > 15) {
        this.showAlert("Тег не может превышать 15 символов.");
        return;
      }

      try {
        const currentTags = [...this.scenario.tags];

        currentTags.push({
          title: tag
        });

        const body = {
          tags: currentTags
        };

        await this.scenarioMethods.updateScenario(this.scenario.id, body);

        this.newTag = '';
        this.addTag = false;

        this.$emit('scenario-updated', this.scenario.id);
      } catch (error) {
        console.error("Ошибка при добавлении тега:", error);
        this.showAlert("Не удалось сохранить тег");
      }
    },
    async deleteTag(id) {
      try {
        await this.scenarioMethods.deleteTag(id);

        this.$emit('scenario-updated', this.scenario.id);
      } catch (error) {
        console.error("Ошибка при удалении тега:" + error);
        this.showAlert("Не удалось удалить тег");
      }
    },
    toggleAddAttachment() {
      this.addAttachment = !this.addAttachment;
      this.addAttachment ? this.$nextTick(() => {
        this.$refs.attachmentInput.focus();
      }) : '';
    },
    async submitAttachment(event) {
      try {
        const file = event.target.files[0];

        if (!file) {
          this.showAlert('Файл не выбран');
          return;
        }

        // // Максимальный размер файла - 10MB
        // const MAX_FILE_SIZE = 10 * 1024 * 1024;
        // if (file.size > MAX_FILE_SIZE) {
        //   this.showAlert('Файл слишком большой. Максимальный размер - 10MB');
        //   return;
        // }

        const formData = new FormData();
        formData.append('file', file);

        await this.scenarioMethods.uploadAttachment(this.scenario.id, formData);

        this.$emit('scenario-updated', this.scenario.id);
      } catch (error) {
        this.showAlert('Ошибка при загрузке файла');
        console.error('Attachment upload error:', error);
      } finally {
        this.addAttachment = false;
      }
    },
    async deleteAttachment(id) {
      try {
        await this.scenarioMethods.deleteAttachment(id);
        this.$emit('scenario-updated', this.scenario.id);
      } catch (error) {
        this.showAlert('При попытке удалить вложение что-то пошло не так...');
        console.error(`Error while deleting attachment: ${error}`);
      }
    }
  },
  watch: {
    scenario: {
      immediate: true,
      deep: true,
      handler(newScenario) {
        this.localScenario = newScenario;
      }
    }
  }
}
</script>

<style scoped>
.scenario-viewer-sidebar {
  margin-top: 25px;
  margin-bottom: 10px;
  float: right;
  width: 26%;
  height: 80vh;
  font-family: var(--font-primary);
}

.fields {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

span {
  font-size: 14px;
}

h4 {
  margin-bottom: 8px;
}

.fields {
  padding-left: 25px;
}

.field {
  padding-bottom: 25px;
}

.tags {
  list-style: none;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
}

.tags li {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.add {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  min-width: 24px;
  min-height: 24px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 2px solid var(--border-color);
  cursor: pointer;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
}

.add:hover {
  background-color: #f9f9f9;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}



.tags .tag-item {
  font-family: var(--font-primary);
  font-size: 12px;
  padding: 4px;
  border-radius: 5px;
  border: 2px solid var(--border-color);
  position: relative;
}

.tags .tag-item:hover button {
  opacity: 1;
  pointer-events: auto;
}

.tags .tag-item button {
  position: absolute;
  top: -6px;
  right: -6px;
  background-color: #fff;
  border: 1px solid var(--border-color);
  border-radius: 50%;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
}

.tags .tag-add-input .new-tag {
  font-family: var(--font-primary);
  width: 50px;
  padding: 3px;
  outline: none;
  border: 1px solid var(--border-color);
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.attachments {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0;
  margin: 0;
}

.attachment-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  border-radius: 5px;
  border: 2px solid var(--border-color);
  font-family: var(--font-primary);
  font-size: 12px;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  transition: background-color 0.2s ease;
}

.attachment-item:hover {
  background-color: #f9f9f9;
}

.attachment-item:hover button {
  opacity: 1;
  pointer-events: auto;
}

.attachment-item button {
  position: absolute;
  top: -6px;
  right: -6px;
  background-color: #fff;
  border: 1px solid var(--border-color);
  border-radius: 50%;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
}

.attachment-item a {
  text-decoration: none;
  color: inherit;
  word-break: break-word;
}

.attachments .add {
  align-self: flex-start;
}

.attachment-add-input .new-attachment {
  font-family: var(--font-primary);
  font-size: 12px;
  padding: 6px;
  border: 1px solid var(--border-color);
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 220px;
  cursor: pointer;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.attachment-add-input .new-attachment:hover {
  border-color: var(--border-color, #888);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.attachments li:first-child {
  margin-top: 0;
}

.attachment-add-input {
  margin-top: -15px;
}
</style>