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
            <span>{{ tag.title }}</span>
          </li>
        </ul>
      </div>

      <div class="attachment">
        <h4>Вложения</h4>

        <ul
            class="attachments"
        >
          <li
              class="attachment-item"
              v-for="attachment in scenario.attachments"
              :key="attachment.id"
          >
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
import AddButton from "@/components/UI/Btn/AddButton.vue";

export default {
  inject: ["showAlert"],
  components: {AddButton, CloseButton, AddIcon},
  data() {
    return {}
  },
  props: {
    scenario: Object
  },
  methods: {
    convertDate,
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

.attachments li:first-child {
  margin-top: 0;
}
</style>