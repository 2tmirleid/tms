<template>
  <div class="editable-field">
    <div class="field-header">
      <h4>{{ label }}</h4>

      <EditButton
          v-if="!edit"
          @click="startEditing"
      />
    </div>

    <div v-if="!edit" class="field-content">
      <p>{{ value || '-' }}</p>
    </div>

    <div v-else class="field-editor">
      <textarea
          v-model="localValue"
          :name="name"
          ref="editor"
          class="editor-input"
          @keyup.esc="cancelEditing"
      ></textarea>

      <div class="editor-actions">
        <button
            class="save-btn"
            @click="updateField"
        >
          Сохранить
        </button>
        <button
            class="cancel-btn"
            @click="cancelEditing"
        >
          Отмена
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {ScenarioMethods} from "@/api/scenarioMethods.js";
import EditButton from "@/components/UI/Btn/EditButton.vue";

export default {
  components: {EditButton},
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: String
    },
    name: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      scenarioMethods: new ScenarioMethods(),
      edit: false,
      localValue: this.value
    }
  },
  methods: {
    focus() {
      this.$nextTick(() => {
        const textarea = this.$refs.editor;
        textarea.focus();
        textarea.selectionStart = textarea.selectionEnd = textarea.value.length;
      });
    },
    startEditing() {
      this.edit = true;
      this.focus();
    },
    cancelEditing() {
      this.edit = false;
      this.localValue = this.value;
    },
    async updateField() {
      const field = this.name;
      const value = this.localValue;

      try {
        const body = {[field]: value};

        await this.scenarioMethods.updateScenario(this.id, body);
        this.cancelEditing();

        this.$emit('scenario-updated', this.id);
      } catch (e) {
        alert("Что-то пошло не так...");
        console.error(`Error while updating field ${field}`, e);
      }
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(newValue) {
        this.localValue = newValue;
      }
    }
  },
}
</script>

<style scoped>
.editable-field {
  --border-color: #e8edf1;
  --hover-bg: #edf1f5;
  --id-color: #6c757d;
  --font-primary: "JetBrains Mono", monospace, sans-serif;

  padding-bottom: 25px;
  padding-top: 25px;
}

.field-header {
  font-family: var(--font-primary);
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 8px;
}

.field-content {
  font-family: var(--font-primary);
}

.field-content p {
  font-size: 14px;
  line-height: 1.5;
  white-space: pre-wrap;
}

.editor-input {
  width: 60%;
  min-height: 100px;
  max-height: 150px;
  padding: 10px;
  font-family: var(--font-primary);
  font-size: 14px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  resize: vertical;
  outline: none;
}

.editor-actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.save-btn, .cancel-btn {
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  font-family: var(--font-primary);
  transition: all 0.2s ease;
}

.save-btn {
  background-color: #4CAF50;
  color: white;
  border: 1px solid #4CAF50;
}

.save-btn:hover {
  background-color: #43a047;
  border-color: #43a047;
}

.cancel-btn {
  background-color: #f8f9fa;
  border: 1px solid #e8edf1;
  color: #6c757d;
}

.cancel-btn:hover {
  background-color: #e8edf1;
  border-color: #dae0e5;
}
</style>