<template>
  <div
      class="context-menu"
      v-if="testPlan"
  >
    <div
        class="dropdown-wrapper"
        ref="dropdown"
        tabindex="0"
        @blur="closeMenu"
        @keyup.esc="closeMenu"
    >
      <div class="close-btn">
        <CloseButton @click="closeMenu"/>
      </div>

      <ul class="dropdown">
        <li
            class="dropdown-item"
            v-for="option in options"
            :key="option.id"
            @click="sendEmitByAlias(option.alias)"
            :class="{ 'delete' : option.alias === 'delete' }"
        >
          <span>{{ option.title }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ScenarioContextMenuButton from "@/components/UI/Btn/ScenarioContextMenuButton.vue";
import CloseButton from "@/components/UI/Btn/CloseButton.vue";
import {FolderContextOptionMethods} from "@/api/folderContextOptionMethods.js";
import {TestPlanContextOptionMethods} from "@/api/testPlanContextOptionMethods.js";

export default {
  components: {CloseButton, ScenarioContextMenuButton},
  data() {
    return {
      optionMethods: new TestPlanContextOptionMethods(),
      options: [],
      showDropdown: false,
    };
  },
  props: {
    testPlan: Object,
  },
  methods: {
    async getOptions() {
      try {
        const response = await this.optionMethods.getOptions();
        this.options = response.data;
      } catch (error) {
        console.error("Fetch options error:", error);
      }
    },
    closeMenu() {
      this.$emit('close');
    },
    async sendEmitByAlias(alias) {
      this.$emit(`${alias}-test-plan`, this.testPlan);
      this.closeMenu();
    }
  },
  mounted() {
    this.getOptions();

    this.$nextTick(() => {
      this.$refs.dropdown.focus();
    });
  }
}
</script>

<style scoped>
.context-menu {
  position: absolute;
  z-index: 9999;
}

.dropdown-wrapper {
  background-color: #FFFFFF;
  position: absolute;
  max-height: 300px;
  padding: 8px 0;
  font-family: var(--font-primary);
  font-size: 13px;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
  transition: all 0.2s ease;
  min-width: 160px;
  z-index: 9999;
}

.dropdown-wrapper:focus {
  outline: none;
}

.dropdown .dropdown-item.delete:hover {
  background-color: var(--delete-color);
  color: #FFFFFF;
}

.dropdown {
  list-style: none;
  margin: 0;
  padding: 0;
}

.dropdown-wrapper .close-btn {
  display: flex;
  justify-content: flex-end;
  padding: 0 8px 4px 8px;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 4px;
}

.dropdown .dropdown-item {
  padding: 6px 12px;
  cursor: pointer;
  transition: background-color 0.15s ease;
  display: flex;
  align-items: center;
  color: #333;
}

.dropdown .dropdown-item.delete:hover {
  background-color: var(--delete-color);
  color: #FFFFFF;
}

.dropdown .dropdown-item:hover {
  background-color: var(--hover-bg);
  color: #000;
}

.dropdown .dropdown-item span {
  white-space: nowrap;
}

.context-menu button.hidden {
  opacity: 0;
  pointer-events: none;
}
</style>