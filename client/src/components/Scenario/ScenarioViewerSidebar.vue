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

          <li class="tag-add">
            <AddIcon
                v-if="!add"
                @click="toggleAdd"
            />
          </li>

          <li class="tag-add-input">
            <input
                v-if="add"
                class="new-tag"
                type="text"
                placeholder="Тег"
                ref="tagInput"
                v-model="newTag"
                @blur="toggleAdd"
                @keyup.enter="submitTag"
            >
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

export default {
  components: {CloseButton, AddIcon},
  data() {
    return {
      localScenario: {},
      scenarioMethods: new ScenarioMethods(),
      newTag: '',
      add: false,
    }
  },
  props: {
    scenario: Object
  },
  methods: {
    convertDate,
    toggleAdd() {
      this.add = !this.add;
      this.add ? this.$nextTick(() => {
        this.$refs.tagInput.focus();
      }) : '';
    },
    async submitTag() {
      const tag = this.newTag;

      if (!tag.trim()) {
        alert("Тег не может быть пустым.");
        return;
      }

      if (tag.trim().length > 15) {
        alert("Тег не может превышать 15 символов.");
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
        this.add = false;

        this.$emit('scenario-updated', this.scenario.id);
      } catch (error) {
        console.error("Ошибка при добавлении тега:", error);
        alert("Не удалось сохранить тег");
      }
    },
    async deleteTag(id) {
      try {
        await this.scenarioMethods.deleteTag(id);

        this.$emit('scenario-updated', this.scenario.id);
      } catch(error) {
        console.error("Ошибка при удалении тега:" + error);
        alert("Не удалось удалить тег");
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

ul {
  list-style: none;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
}

li {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.tags .tag-item {
  font-family: var(--font-primary);
  font-size: 12px;
  padding: 4px;
  border-radius: 5px;
  border: 2px solid var(--border-color);
  position: relative;
}

.tags .tag-add svg{
  width: 15px;
  height: 15px;
}

.tags .tag-add {
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  border: 2px solid var(--border-color);
  cursor: pointer;
}

.tags .tag-add:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
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
</style>