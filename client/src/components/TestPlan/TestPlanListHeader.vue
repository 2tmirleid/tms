<template>
  <div class="test-plan-list-header">
    <div class="search-container">
      <div class="search-input-wrapper">
        <input
            type="text"
            placeholder="Поиск"
            v-model="testPlan"
            @keyup.enter="findTestPlan"
            class="search-input"
        >
        <ClearButton
            v-if="testPlan.length > 0"
            class="clear-button"
            @click="clearSearch"
        />
      </div>

      <div class="options">
        <div class="data">
        </div>

        <div class="sort">
          <TestPlanSortContextMenu
              @test-plan-sorted="handleSort"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClearButton from "@/components/UI/Btn/ClearButton.vue";
import {TestPlanMethods} from "@/api/testPlanMethods.js";
import TestPlanSortContextMenu from "@/components/TestPlan/TestPlanSortContextMenu.vue";

export default {
  inject: ['showAlert'],
  components: {TestPlanSortContextMenu, ClearButton},
  data() {
    return {
      testPlanMethods: new TestPlanMethods(),
      testPlan: ''
    }
  },
  methods: {
    async handleSort(type) {
      this.$emit('test-plan-sorted', type);
    },
    async findTestPlan() {
      const query = this.testPlan.trim();

      if (!query) {
        this.$emit("refresh-test-plans-list");
        return;
      }

      try {
        const criteria = {};

        query.split(";").forEach(pair => {
          const [propRaw, valuesRaw] = pair.split("=");
          if (!propRaw || !valuesRaw) return;

          const property = propRaw.trim().toLowerCase();
          const values = valuesRaw
              .split(",")
              .map(val => val.trim())
              .filter(Boolean);

          if (values.length) {
            criteria[property] = values;
          }
        });

        const response = await this.testPlanMethods.searchTestPlan(criteria);

        if (!response || response.length === 0) {
          this.showAlert("Тест-план не был найден");
          this.$emit("refresh-test-plans-list");
          return;
        }

        this.$emit("found-test-plan", response);
      } catch (error) {
        const status = error?.response?.status;

        if (status === 400 || status === 404) {
          this.showAlert("Тест-план не был найден");
          this.$emit("refresh-test-plans-list");
        } else {
          console.error("Ошибка поиска:", error);
          this.showAlert("Ошибка при поиске тест-плана");
        }
      }
    },
    async clearSearch() {
      this.testPlan = '';
      this.$emit("refresh-test-plans-list");
    }
  }
}
</script>

<style scoped>
.options {
  padding: 5px;
  float: right;
  display: flex;
  gap: 10px;
}

.test-plan-list-header {
  height: 150px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
}

.search-container {
  width: 100%;
  max-width: 800px;
  position: relative;
}

.search-input-wrapper {
  width: 100%;
  position: relative;
}

.search-input {
  width: 100%;
  padding: 10px 40px 10px 15px;
  outline: none;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  font-family: var(--font-primary);
  font-size: 15px;
  box-sizing: border-box;
}

.clear-button {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>