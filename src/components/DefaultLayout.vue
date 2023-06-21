<template>
  <Navbar />
  <SideBar />
  <main class="mt-16">
    <div class="flex">
      <div :class="showSidebarClass">
        <router-view />
      </div>
    </div>

  </main>
</template>

<script setup>
import store from "../store";
import SideBar from "./SideBarApp.vue";
import Navbar from "./Navbar.vue";

import { computed } from "vue";

  const showSidebarClass = computed(()=>store.state.sideBar.show?"mx-auto flex-1 transition-all ml-[250px] p-5":"mx-auto flex-1 transition-all ml-0 p-5")
</script>
