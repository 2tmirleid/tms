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
    </div>
  </section>
</template>

<script>
import {convertDate} from "@/utils/dateConverter.js";

export default {
  data() {
    return {
      localScenario: {},
    }
  },
  props: {
    scenario: Object
  },
  methods: {
    convertDate,
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
  border-left: 1px solid var(--border-color);
  width: 26%;
  height: 80vh;
  font-family: var(--font-primary);
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
</style>