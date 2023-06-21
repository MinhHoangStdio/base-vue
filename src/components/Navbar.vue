<template>
  <header class="bg-white shadow h-16 flex justify-between items-stretch">
    <router-link :to="{ name: 'dashboard' }" class="inline-flex items-center h-full px-5 text-orange-500 font-bold">
      Home
    </router-link>

    <button @click="toggleSidebar">Click me</button>

    <router-link :to="{ name: 'users' }" class="inline-flex items-center px-2 h-full transition-colors hover:bg-orange-500 hover:text-white">
      Users
    </router-link>
  </header>
</template>
<script setup>
  import store from "../store";

  const toggleSidebar = () =>{
    store.commit('toggleSideBar');
  }
</script>  