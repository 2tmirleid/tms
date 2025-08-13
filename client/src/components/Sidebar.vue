<template>
  <section
      class="sidebar container"
      :style="{ width: collapsed ? '80px' : '130px' }"
  >
    <div
        class="sidebar-toggle"
        @click="collapsed = !collapsed"
        @mouseover="hoverToggle = true"
        @mouseleave="hoverToggle = false"
    >
      <transition name="fade" mode="out-in">
        <span v-if="hoverToggle" key="toggle-icon">
          <UncollapseButton v-if="collapsed"/>
          <CollapseButton v-else/>
        </span>
      </transition>
    </div>

    <div class="pages-wrapper">
      <transition-group name="slide" tag="ul" class="pages">
        <li
            v-for="page in pages"
            :key="page.id"
            class="page-item"
            :class="{ 'active' : $route.path.includes(page.alias.toLowerCase()) }"
        >
          <router-link :to="page.link">
            <span v-if="collapsed">
              <component :is="buttonComponents[page.alias]"/>
            </span>
            <span v-else>{{ page.title }}</span>
          </router-link>
        </li>
      </transition-group>

      <div class="auth">
        <transition name="fade" mode="out-in">
          <div v-if="isAuth" class="logout" key="logout">
            <router-link to="/logout">
              <LogoutButton v-if="collapsed"/>
              <span v-else>Выйти</span>
            </router-link>
          </div>

          <div v-else class="login" key="login">
            <router-link to="/login">
              <LoginButton v-if="collapsed"/>
              <span v-else>Войти</span>
            </router-link>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<script>
import {PageMethods} from "@/api/pageMethods.js";
import HomeButton from "@/components/UI/Btn/HomeButton.vue";
import ScenarioButton from "@/components/UI/Btn/ScenarioButton.vue";
import LoginButton from "@/components/UI/Btn/LoginButton.vue";
import LogoutButton from "@/components/UI/Btn/LogoutButton.vue";
import UncollapseButton from "@/components/UI/Btn/UncollapseButton.vue";
import CollapseButton from "@/components/UI/Btn/CollapseButton.vue";
import TestPlanButton from "@/components/UI/Btn/TestPlanButton.vue";

export default {
  components: {CollapseButton, UncollapseButton, LogoutButton, LoginButton},
  data() {
    return {
      pageMethods: new PageMethods(),
      pages: [],
      collapsed: true,
      hoverToggle: false,
      buttonComponents: {
        Home: HomeButton,
        Scenario: ScenarioButton,
        TestPlan: TestPlanButton,
      },
      isAuth: true,
    }
  },
  methods: {
    async getPages() {
      const response = await this.pageMethods.getPages();
      this.pages = response.data;
    }
  },
  mounted() {
    this.getPages();
  }
}
</script>

<style scoped>
.sidebar {
  --border-color: #e8edf1;
  --hover-bg: #f0f4f8;
  --active-bg: #e1e8ed;
  --id-color: #6c757d;
  --font-primary: "JetBrains Mono", monospace, sans-serif;
  --text-color: #2c3e50;
  --transition-speed: 0.3s;

  position: relative;
  padding: 15px 10px;
  max-width: 200px;
  height: calc(100vh - 90px);
  background-color: white;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  border: 1px solid #e8edf1;
}

.pages-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.pages-wrapper .auth {
  padding-bottom: 20px;
}

.pages {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.pages .page-item {
  transition: all var(--transition-speed) ease;
  display: flex;
}

.pages .page-item a {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  color: var(--text-color);
  text-decoration: none;
  font-family: var(--font-primary);
  font-size: 14px;
  font-weight: 500;
  border-radius: 6px;
  transition: all var(--transition-speed) ease;
}

.pages .page-item a:hover {
  background-color: var(--hover-bg);
  transform: translateX(2px);
}

.pages .page-item.active a {
  background-color: var(--active-bg);
  font-weight: 600;
}

.pages .page-item.active a:hover {
  background-color: var(--active-bg);
}

.pages .page-item span[data-v-if] {
  display: flex;
  justify-content: center;
  width: 100%;
}

.auth {
  margin: 0 auto;

  a {
    text-decoration: none;
  }
}

.auth span {
  font-family: var(--font-primary);
  color: var(--text-color);
}

.sidebar-toggle {
  position: absolute;
  right: -15px;
  top: 50%;
  transform: translateY(-50%);
  width: 15px;
  height: 50px;
  background-color: white;
  border: 2px solid var(--border-color);
  border-left: none;
  border-radius: 0 8px 8px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-speed) ease;
  z-index: 999;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.05);
}

.sidebar-toggle:hover {
  background-color: var(--hover-bg);
  width: 20px;
  right: -20px;
}

.sidebar-toggle span {
  font-weight: 1000;
  color: var(--text-color);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Анимация slide (для списка страниц) */
.slide-enter-active {
  transition: all 0.3s ease-out;
}

.slide-leave-active {
  transition: all 0.3s ease-in;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(-10px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(10px);
}

.slide-move {
  transition: transform 0.3s ease;
}
</style>