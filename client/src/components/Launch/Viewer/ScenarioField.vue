<template>
  <div class="scenario-field">
    <div class="field-header">
      <h4>{{ label }}</h4>
    </div>

    <div class="field-content">
      <p>{{ value || '-' }}</p>
    </div>
  </div>
</template>

<script>
import {ScenarioMethods} from "@/api/scenarioMethods.js";
import EditButton from "@/components/UI/Btn/EditButton.vue";

export default {
  inject: ["showAlert"],
  components: {EditButton},
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: String
    },
  },
  data() {
    return {}
  },
  methods: {},
}
</script>

<style scoped>
.scenario-field {
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
  max-width: 800px;
}

.field-content p {
  font-size: 14px;
  line-height: 1.5;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
}
</style>