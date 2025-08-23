<template>
  <div class="context-menu">
    <div class="sort-btn">
      <SortButton
          @click="showContextMenu"
      />
    </div>

    <div
        class="dropdown-wrapper"
        v-if="showDropdown"
        tabindex="0"
        ref="dropdown"
        @blur="hideContextMenu"
    >
      <div class="close-btn">
        <CloseButton @click.stop="hideContextMenu"/>
      </div>

      <ul class="dropdown">
        <li
            class="dropdown-item"
            v-for="option in options"
            :key="option.id"
            @click="sort(option.alias)"
        >
          <span>{{ option.title }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import SortButton from "@/components/UI/Btn/SortButton.vue";
import CloseButton from "@/components/UI/Btn/CloseButton.vue";
import {TestPlanSortMethods} from "@/api/testPlanSortMethods.js";

export default {
  components: {CloseButton, SortButton},
  data() {
    return {
      sortMethods: new TestPlanSortMethods(),
      options: [],
      showDropdown: false,
    }
  },
  methods: {
    async getSortOptions() {
      const response = await this.sortMethods.getSortOptions();
      this.options = response.data;
    },
    async sort(type) {
      this.$emit('test-plan-sorted', type);
      this.hideContextMenu();
    },
    showContextMenu() {
      this.showDropdown = true;

      this.$nextTick(() => {
        this.$refs.dropdown?.focus();
      });
    },
    hideContextMenu() {
      this.showDropdown = false;
    },
  },
  mounted() {
    this.getSortOptions();
  }
}
</script>

<style scoped>
.context-menu {
  position: relative;
  display: inline-block;
}

.dropdown-wrapper {
  background-color: #FFFFFF;
  position: absolute;
  right: 0%;
  top: 0%;
  padding: 8px 0;
  font-family: var(--font-primary);
  font-size: 13px;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
  transition: all 0.2s ease;
  min-width: 160px;
  z-index: 1000;
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