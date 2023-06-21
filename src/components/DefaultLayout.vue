<template>
  <div>
    <Navbar />
    <SideBar />

    <div class="sm:ml-64 sm:mt-14">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import store from "../store";
import SideBar from "./SideBarApp.vue";
import Navbar from "./Navbar.vue";

import { computed } from "vue";

const showSidebarClass = computed(() =>
  store.state.sideBar.show
    ? "mx-auto flex-1 transition-all ml-0 bg-red-400 p-5"
    : "mx-auto flex-1 transition-all ml-[-250px] bg-red-400 p-5"
);
</script>
