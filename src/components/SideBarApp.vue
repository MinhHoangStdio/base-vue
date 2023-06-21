<template>
  <div :class="showSidebarClass">Sidebar</div>

</template>

<script setup >
  import { computed } from "vue"
  import store from "../store"
  const showSidebarClass = computed(()=>{return store.state.sideBar.show?"bg-slate-500 w-[250px] transition-all translate-x-0":"bg-slate-500 w-[250px] transition-all translate-x-[-100%]"})
</script>